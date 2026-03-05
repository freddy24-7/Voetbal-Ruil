import * as dotenv from 'dotenv'
import * as path from 'path'
import {post, requestBody, response, HttpErrors} from '@loopback/rest'
import {Resend} from 'resend'

dotenv.config({path: path.resolve(__dirname, '../../../.env')})

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactRequest {
  name: string
  email: string
  message: string
  shoeId: number
  shoeTitle: string
}

export class ContactController {
  @post('/contacts')
  @response(200, {description: 'Contact message sent'})
  async create(@requestBody() body: ContactRequest): Promise<{ok: boolean}> {
    const {name, email, message, shoeId, shoeTitle} = body

    // Notify the site owner
    const {error: ownerError} = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [process.env.CONTACT_EMAIL!],
      replyTo: email,
      subject: `Interesse in je voetbalschoenen: ${shoeTitle}`,
      text: `${name} (${email}) heeft een bericht gestuurd over "${shoeTitle}" (ID: ${shoeId}):\n\n${message}`,
    })

    if (ownerError) {
      console.error('Resend error (owner):', ownerError)
      throw new HttpErrors.InternalServerError('Failed to send email')
    }

    // Send confirmation to the buyer
    const {error: buyerError} = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: `Bevestiging: jouw interesse in "${shoeTitle}"`,
      text: `Hallo ${name},\n\nWe hebben jouw bericht ontvangen over "${shoeTitle}" en nemen zo snel mogelijk contact met je op.\n\nJouw bericht:\n${message}\n\nVoetbalRuil`,
    })

    if (buyerError) {
      console.error('Resend error (buyer):', buyerError)
      // Non-fatal: owner was already notified
    }

    return {ok: true}
  }
}
