"use client";
import { useState } from "react";
import { Product } from "@/lib/types";
import FilterPanel from "@/components/FilterPanel";
import SearchInput from "@/components/SearchInput";
import SortSelect from "@/components/SortSelect";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Suspense } from "react";

interface HomeClientProps {
  initialProducts: Product[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 8;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleSetFilteredProducts = (products: Product[]) => {
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-6 sm:p-8 lg:p-10 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
        <div className="w-full sm:w-1/3">
          <SearchInput products={initialProducts} setFilteredProducts={handleSetFilteredProducts} />
        </div>
        <div className="w-full sm:w-1/3 flex justify-center sm:justify-end space-x-4">
          <SortSelect products={filteredProducts} setFilteredProducts={handleSetFilteredProducts} />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <button
            onClick={() => handleSetFilteredProducts(initialProducts)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
          >
            View All
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {showFilters && (
          <div className="lg:w-1/4 mb-6 lg:mb-0">
            <FilterPanel products={initialProducts} setFilteredProducts={handleSetFilteredProducts} />
          </div>
        )}
        <div className="lg:w-3/4 px-4">
          <Suspense fallback={<SkeletonLoader />}>
            {paginatedProducts.length === 0 ? (
              <section className="text-center text-gray-500 dark:text-gray-400 py-8">
                <p className="text-xl">No products available.</p>
              </section>
            ) : (
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {paginatedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} priority={index < 4} />
                ))}
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
