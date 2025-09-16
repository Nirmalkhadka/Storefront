"use client";
import { useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import FilterPanel from "./FilterPanel";
import SearchInput from "./SearchInput";
import SortSelect from "./SortSelect";

interface Props {
  products: Product[];
}

export default function RelatedProductsSection({ products }: Props) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState(true);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Related Products
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {showFilters && (
          <div className="lg:w-1/4 mb-6 lg:mb-0">
            <FilterPanel products={products} setFilteredProducts={setFilteredProducts} />
          </div>
        )}

        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <SearchInput products={products} setFilteredProducts={setFilteredProducts} />
            <SortSelect products={filteredProducts} setFilteredProducts={setFilteredProducts} />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">No related products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
