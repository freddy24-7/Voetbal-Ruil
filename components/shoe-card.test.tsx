import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import { ShoeCard } from "@/components/shoe-card"
import * as ownedShoes from "@/lib/owned-shoes"
import { renderWithProviders } from "@/src/test/helpers/render"

const mockShoe = {
  id: 1,
  title: "Nike Jr. Mercurial - Maat 33",
  size: "33",
  province: "Noord-Holland",
}

afterEach(() => vi.restoreAllMocks())

describe("ShoeCard — content", () => {
  it("renders the title, size, and province", () => {
    vi.spyOn(ownedShoes, "isOwnedShoe").mockReturnValue(false)
    renderWithProviders(
      <ShoeCard
        shoe={mockShoe}
        onContactClick={vi.fn()}
        onEditClick={vi.fn()}
        onDeleteClick={vi.fn()}
      />
    )
    expect(screen.getByText("Nike Jr. Mercurial - Maat 33")).toBeInTheDocument()
    // Size badge renders "Maat 33" — use getAllByText since the title also contains "33"
    expect(screen.getAllByText(/33/).length).toBeGreaterThan(0)
    expect(screen.getByText(/Noord-Holland/)).toBeInTheDocument()
  })
})

describe("ShoeCard — ownership", () => {
  it("does not show edit/delete buttons when not owned", () => {
    vi.spyOn(ownedShoes, "isOwnedShoe").mockReturnValue(false)
    renderWithProviders(
      <ShoeCard
        shoe={mockShoe}
        onContactClick={vi.fn()}
        onEditClick={vi.fn()}
        onDeleteClick={vi.fn()}
      />
    )
    expect(screen.queryByLabelText(/bewerken/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/verwijderen/i)).not.toBeInTheDocument()
  })

  it("shows edit and delete buttons when owned", () => {
    vi.spyOn(ownedShoes, "isOwnedShoe").mockReturnValue(true)
    renderWithProviders(
      <ShoeCard
        shoe={mockShoe}
        onContactClick={vi.fn()}
        onEditClick={vi.fn()}
        onDeleteClick={vi.fn()}
      />
    )
    expect(screen.getByLabelText(/bewerken/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/verwijderen/i)).toBeInTheDocument()
  })
})

describe("ShoeCard — interactions", () => {
  it("calls onContactClick when the contact button is clicked", async () => {
    vi.spyOn(ownedShoes, "isOwnedShoe").mockReturnValue(false)
    const onContactClick = vi.fn()
    renderWithProviders(
      <ShoeCard
        shoe={mockShoe}
        onContactClick={onContactClick}
        onEditClick={vi.fn()}
        onDeleteClick={vi.fn()}
      />
    )
    await userEvent.click(screen.getByRole("button", { name: /contact/i }))
    expect(onContactClick).toHaveBeenCalledOnce()
  })

  it("calls onEditClick when the edit button is clicked", async () => {
    vi.spyOn(ownedShoes, "isOwnedShoe").mockReturnValue(true)
    const onEditClick = vi.fn()
    renderWithProviders(
      <ShoeCard
        shoe={mockShoe}
        onContactClick={vi.fn()}
        onEditClick={onEditClick}
        onDeleteClick={vi.fn()}
      />
    )
    await userEvent.click(screen.getByLabelText(/bewerken/i))
    expect(onEditClick).toHaveBeenCalledOnce()
  })
})
