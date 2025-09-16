"use client";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { Product } from "@/lib/types";

interface SearchInputProps {
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
}

export default function SearchInput({
  products,
  setFilteredProducts,
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = debounce((term: string) => {
    // Log to debug the input products
    console.log("Search Input Products:", products);
    const filtered = products
      .filter(
        (product): product is Product =>
          product !== undefined && product.id !== undefined
      ) // Type guard
      .filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
    setFilteredProducts(filtered);
  }, 300);

  useEffect(() => {
    handleSearch(searchTerm);
    return () => handleSearch.cancel();
  }, [searchTerm, products, handleSearch]);

  return (
    <div className="w-full max-w-xl mx-auto mb-24">
  <input
    id="search"
    type="text"
    placeholder="🔍 Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="
      w-auto border border-gray-300 dark:border-gray-600
      rounded-full px-5 py-3 shadow-sm
      focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
      bg-gray-50 dark:bg-gray-700
      text-gray-900 dark:text-gray-100
      placeholder-gray-400 dark:placeholder-gray-400
      transition
    "
  />
</div>

  );
}
