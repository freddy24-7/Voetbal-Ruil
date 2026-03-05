import { http, HttpResponse } from "msw"
import { describe, expect, it } from "vitest"

import { createShoe, deleteShoe, fetchShoes, sendGeneralContact, updateShoe } from "@/lib/api"
import { server } from "@/src/test/msw/server"

const BASE = "http://localhost:3001"

describe("fetchShoes", () => {
  it("returns all shoes when no province is given", async () => {
    const shoes = await fetchShoes()
    expect(shoes).toHaveLength(2)
    expect(shoes[0].title).toBe("Nike Jr. Mercurial - Maat 33")
  })

  it("returns all shoes when province is 'all'", async () => {
    const shoes = await fetchShoes("all")
    expect(shoes).toHaveLength(2)
  })

  it("filters by province", async () => {
    const shoes = await fetchShoes("Noord-Holland")
    expect(shoes).toHaveLength(1)
    expect(shoes[0].province).toBe("Noord-Holland")
  })

  it("throws when the API returns an error", async () => {
    server.use(
      http.get(`${BASE}/shoes`, () => HttpResponse.json({ error: "oops" }, { status: 500 }))
    )
    await expect(fetchShoes()).rejects.toThrow("Failed to fetch shoes")
  })
})

describe("createShoe", () => {
  it("returns the created shoe with an id", async () => {
    const shoe = await createShoe({ title: "Test", size: "38", province: "Utrecht" })
    expect(shoe.id).toBe(99)
    expect(shoe.title).toBe("Test")
  })
})

describe("updateShoe", () => {
  it("resolves without throwing on success", async () => {
    await expect(
      updateShoe(1, { title: "Updated", size: "33", province: "Noord-Holland" })
    ).resolves.toBeUndefined()
  })

  it("throws when the API returns an error", async () => {
    server.use(
      http.put(`${BASE}/shoes/:id`, () => HttpResponse.json({}, { status: 500 }))
    )
    await expect(
      updateShoe(1, { title: "Updated", size: "33", province: "Noord-Holland" })
    ).rejects.toThrow("Failed to update shoe")
  })
})

describe("deleteShoe", () => {
  it("resolves without throwing on success", async () => {
    await expect(deleteShoe(1)).resolves.toBeUndefined()
  })

  it("throws when the API returns an error", async () => {
    server.use(
      http.delete(`${BASE}/shoes/:id`, () => HttpResponse.json({}, { status: 500 }))
    )
    await expect(deleteShoe(1)).rejects.toThrow("Failed to delete shoe")
  })
})

describe("sendGeneralContact", () => {
  it("resolves without throwing on success", async () => {
    await expect(
      sendGeneralContact({ name: "Jan", email: "jan@example.com", message: "Hallo" })
    ).resolves.toBeUndefined()
  })

  it("throws when the API returns an error", async () => {
    server.use(
      http.post(`${BASE}/contact`, () => HttpResponse.json({}, { status: 500 }))
    )
    await expect(
      sendGeneralContact({ name: "Jan", email: "jan@example.com", message: "Hallo" })
    ).rejects.toThrow("Failed to send message")
  })
})
