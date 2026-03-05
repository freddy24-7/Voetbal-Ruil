import { http, HttpResponse } from "msw"

import type { Shoe } from "@/lib/types"

const BASE = "http://localhost:3001"

export const mockShoes: Shoe[] = [
  { id: 1, title: "Nike Jr. Mercurial - Maat 33", size: "33", province: "Noord-Holland" },
  { id: 2, title: "Adidas X Speedflow - Maat 35", size: "35", province: "Zuid-Holland" },
]

export const handlers = [
  http.get(`${BASE}/shoes`, ({ request }) => {
    const province = new URL(request.url).searchParams.get("province")
    const result = province ? mockShoes.filter((s) => s.province === province) : mockShoes
    return HttpResponse.json(result)
  }),

  http.post(`${BASE}/shoes`, async ({ request }) => {
    const body = (await request.json()) as Omit<Shoe, "id">
    return HttpResponse.json({ id: 99, ...body }, { status: 201 })
  }),

  http.put(`${BASE}/shoes/:id`, () => new HttpResponse(null, { status: 204 })),

  http.delete(`${BASE}/shoes/:id`, () => new HttpResponse(null, { status: 204 })),

  http.post(`${BASE}/contacts`, () => new HttpResponse(null, { status: 204 })),

  http.post(`${BASE}/contact`, () => new HttpResponse(null, { status: 204 })),
]
