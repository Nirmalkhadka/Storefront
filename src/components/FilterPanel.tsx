"use client";
import { useState, useMemo, useEffect } from "react";
import { Product } from "@/lib/types";

interface FilterPanelProps {
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
}

export default function FilterPanel({ products, setFilteredProducts }: FilterPanelProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      return matchesCategory && matchesPrice;
    });
  }, [products, selectedCategories, minPrice, maxPrice]);

  useEffect(() => {
    setFilteredProducts(filteredProducts);
  }, [filteredProducts, setFilteredProducts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <aside className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Filters</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Categories</h3>
        {categories.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No categories available</p>
        ) : (
          categories.map((category) => (
            <label key={category} className="block my-2 text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2 accent-blue-600"
              />
              <span className="capitalize">{category}</span>
            </label>
          ))
        )}
      </div>

      <div>
        <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Price Range</h3>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Min"
            value={minPrice || ""}
            onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
            className="border-b-2 border-blue-600 p-2 w-1/2 rounded-none dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-700"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice || ""}
            onChange={(e) => setMaxPrice(Number(e.target.value) || 1000)}
            className="border-b-2 border-blue-600 p-2 w-1/2 rounded-none dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-700"
          />
        </div>
      </div>
    </aside>
  );
}
