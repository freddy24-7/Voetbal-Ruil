import { afterEach, beforeEach, describe, expect, it } from "vitest"

import {
  addOwnedShoe,
  getOwnedShoes,
  isOwnedShoe,
  removeOwnedShoe,
} from "@/lib/owned-shoes"

describe("owned-shoes", () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => localStorage.clear())

  describe("addOwnedShoe", () => {
    it("stores the id so isOwnedShoe returns true", () => {
      addOwnedShoe(1)
      expect(isOwnedShoe(1)).toBe(true)
    })

    it("does not duplicate ids", () => {
      addOwnedShoe(1)
      addOwnedShoe(1)
      expect(getOwnedShoes()).toEqual([1])
    })

    it("stores multiple distinct ids", () => {
      addOwnedShoe(1)
      addOwnedShoe(2)
      expect(getOwnedShoes()).toEqual([1, 2])
    })
  })

  describe("removeOwnedShoe", () => {
    it("removes the id so isOwnedShoe returns false", () => {
      addOwnedShoe(1)
      removeOwnedShoe(1)
      expect(isOwnedShoe(1)).toBe(false)
    })

    it("leaves other ids untouched", () => {
      addOwnedShoe(1)
      addOwnedShoe(2)
      removeOwnedShoe(1)
      expect(getOwnedShoes()).toEqual([2])
    })

    it("is a no-op for an id that was never added", () => {
      addOwnedShoe(1)
      removeOwnedShoe(999)
      expect(getOwnedShoes()).toEqual([1])
    })
  })

  describe("isOwnedShoe", () => {
    it("returns false when the id is not stored", () => {
      expect(isOwnedShoe(42)).toBe(false)
    })
  })

  describe("getOwnedShoes", () => {
    it("returns empty array when nothing is stored", () => {
      expect(getOwnedShoes()).toEqual([])
    })
  })

  describe("resilience", () => {
    it("returns empty array when localStorage contains invalid JSON", () => {
      localStorage.setItem("voetbalruil_owned_shoes", "not-valid-json")
      expect(getOwnedShoes()).toEqual([])
    })
  })
})
