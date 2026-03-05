import type { Shoe } from './types'

const API_URL = 'http://localhost:3001'

export async function fetchShoes(province?: string): Promise<Shoe[]> {
  const url =
    province && province !== 'all'
      ? `${API_URL}/shoes?province=${encodeURIComponent(province)}`
      : `${API_URL}/shoes`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch shoes')
  return res.json()
}

export async function createShoe(data: {
  title: string
  size: string
  province: string
}): Promise<Shoe> {
  const res = await fetch(`${API_URL}/shoes`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create shoe')
  return res.json()
}

export async function createContact(data: {
  name: string
  email: string
  message: string
  shoeId: number
  shoeTitle: string
}): Promise<void> {
  const res = await fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to send message')
}
