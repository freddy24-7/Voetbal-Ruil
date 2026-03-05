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
  image?: string
}): Promise<Shoe> {
  const res = await fetch(`${API_URL}/shoes`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create shoe')
  return res.json()
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${API_URL}/upload`, {method: 'POST', body: form})
  if (!res.ok) throw new Error('Failed to upload image')
  const data = await res.json()
  return data.url
}

export async function updateShoe(id: number, data: {
  title: string
  size: string
  province: string
  image?: string
}): Promise<void> {
  const res = await fetch(`${API_URL}/shoes/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update shoe')
}

export async function deleteShoe(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/shoes/${id}`, {method: 'DELETE'})
  if (!res.ok) throw new Error('Failed to delete shoe')
}

export async function sendGeneralContact(data: {
  name: string
  email: string
  message: string
}): Promise<void> {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to send message')
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
