const KEY = 'voetbalruil_owned_shoes'

function load(): number[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function addOwnedShoe(id: number): void {
  const ids = load()
  if (!ids.includes(id)) {
    localStorage.setItem(KEY, JSON.stringify([...ids, id]))
  }
}

export function removeOwnedShoe(id: number): void {
  localStorage.setItem(KEY, JSON.stringify(load().filter((i) => i !== id)))
}

export function isOwnedShoe(id: number): boolean {
  return load().includes(id)
}

export function getOwnedShoes(): number[] {
  return load()
}
