import * as path from "path"

import { inject } from "@loopback/core"
import { post, requestBody, response, Request, RestBindings, HttpErrors } from "@loopback/rest"
import { v2 as cloudinary } from "cloudinary"
import * as dotenv from "dotenv"
import multer from "multer"

dotenv.config({ path: path.resolve(__dirname, "../../../.env") })

cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL })

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

function parseUpload(req: Request): Promise<Express.Multer.File> {
  return new Promise((resolve, reject) => {
    upload.single("file")(req as any, {} as any, (err: unknown) => {
      if (err) return reject(err)
      const file = (req as any).file as Express.Multer.File | undefined
      if (!file) return reject(new Error("No file received"))
      resolve(file)
    })
  })
}

function uploadToCloudinary(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: process.env.CLOUDINARY_FOLDER ?? "voetbalruil", resource_type: "image" },
      (err, result) => {
        if (err || !result) return reject(err ?? new Error("Cloudinary upload failed"))
        resolve(result.secure_url)
      }
    )
    stream.end(buffer)
  })
}

export class UploadController {
  @post("/upload")
  @response(200, { description: "Uploaded image URL" })
  async uploadImage(
    @inject(RestBindings.Http.REQUEST) req: Request,
    @requestBody({
      required: true,
      content: {
        "multipart/form-data": {
          "x-parser": "stream",
          schema: { type: "object", properties: { file: { type: "string", format: "binary" } } },
        },
      },
    })
    _body: unknown
  ): Promise<{ url: string }> {
    let file: Express.Multer.File
    try {
      file = await parseUpload(req)
    } catch {
      throw new HttpErrors.BadRequest("File upload failed or no file provided")
    }

    try {
      const url = await uploadToCloudinary(file.buffer)
      return { url }
    } catch {
      throw new HttpErrors.InternalServerError("Failed to upload image to Cloudinary")
    }
  }
}
