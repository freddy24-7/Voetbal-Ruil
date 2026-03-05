import { screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { ShoeGrid } from "@/components/shoe-grid"
import type { Shoe } from "@/lib/types"
import { renderWithProviders } from "@/src/test/helpers/render"

const mockShoes: Shoe[] = [
  { id: 1, title: "Nike Jr. Mercurial - Maat 33", size: "33", province: "Noord-Holland" },
  { id: 2, title: "Adidas X Speedflow - Maat 35", size: "35", province: "Zuid-Holland" },
]

const defaultProps = {
  loading: false,
  error: null,
  selectedProvince: "all",
  onContactClick: vi.fn(),
  onEditClick: vi.fn(),
  onDeleteClick: vi.fn(),
}

describe("ShoeGrid — loading state", () => {
  it("renders without any shoe titles while loading", () => {
    renderWithProviders(<ShoeGrid {...defaultProps} shoes={[]} loading={true} />)
    expect(screen.queryByText("Nike Jr. Mercurial - Maat 33")).not.toBeInTheDocument()
  })
})

describe("ShoeGrid — error state", () => {
  it("displays the error message", () => {
    renderWithProviders(<ShoeGrid {...defaultProps} shoes={[]} error="Kon schoenen niet laden" />)
    expect(screen.getByText("Kon schoenen niet laden")).toBeInTheDocument()
  })
})

describe("ShoeGrid — empty state", () => {
  it("shows the no-results message when the list is empty", () => {
    renderWithProviders(<ShoeGrid {...defaultProps} shoes={[]} />)
    expect(screen.getByText(/geen schoenen gevonden/i)).toBeInTheDocument()
  })
})

describe("ShoeGrid — shoes list", () => {
  it("renders a card for each shoe", () => {
    renderWithProviders(<ShoeGrid {...defaultProps} shoes={mockShoes} />)
    expect(screen.getByText("Nike Jr. Mercurial - Maat 33")).toBeInTheDocument()
    expect(screen.getByText("Adidas X Speedflow - Maat 35")).toBeInTheDocument()
  })

  it("shows the province filter label in the heading when a province is selected", () => {
    renderWithProviders(<ShoeGrid {...defaultProps} shoes={mockShoes} selectedProvince="Utrecht" />)
    expect(screen.getByText(/Utrecht/)).toBeInTheDocument()
  })
})
