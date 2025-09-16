"use client";

import { useState, useMemo, useEffect } from "react";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import FilterPanel from "@/components/FilterPanel";
import SearchInput from "@/components/SearchInput";
import SortSelect from "@/components/SortSelect";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Suspense } from "react";

interface HomeClientProps {
  initialProducts: Product[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
  // 🔹 States
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);

  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // 🔹 Slice products for current page
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    const end = currentPage * productsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  // 🔹 Reset page to 1 whenever filters/search change
  const handleSetFilteredProducts = (products: Product[]) => {
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-6 sm:p-8 lg:p-10 min-h-screen">
      {/* Search + Sort + Filter toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
        <div className="w-full sm:w-1/3">
          <SearchInput
            products={initialProducts}
            setFilteredProducts={handleSetFilteredProducts}
          />
        </div>
        <div className="w-full sm:w-2/3 flex justify-end items-center space-x-4">
          <SortSelect
            products={filteredProducts}
            setFilteredProducts={handleSetFilteredProducts}
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <button
            onClick={() => handleSetFilteredProducts(initialProducts)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            View All
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter panel */}
        {showFilters && (
          <div className="lg:w-1/4 mb-6 lg:mb-0">
            <FilterPanel
              products={initialProducts}
              setFilteredProducts={handleSetFilteredProducts}
            />
          </div>
        )}

        {/* Product grid + pagination */}
        <div className="lg:w-3/4">
          <Suspense fallback={<SkeletonLoader />}>
            {paginatedProducts.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300 text-center py-8">
                No products found.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center gap-4">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>

                    <span className="px-4 py-2 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-medium rounded-lg">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
