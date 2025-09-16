"use client";
import { useState, useMemo } from "react";
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
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 8;

  const memoizedProducts = useMemo(() => allProducts, [allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  console.log("Paginated Products:", paginatedProducts);

  return (
    <div className="container mx-auto p-6 sm:p-8 lg:p-10 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        Storefront
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
        <div className="w-full sm:w-1/3">
          <SearchInput
            products={memoizedProducts}
            setFilteredProducts={setFilteredProducts}
          />
        </div>
        <div className="w-full sm:w-1/3 flex justify-center sm:justify-end space-x-4">
          <SortSelect
            products={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            aria-label={showFilters ? "Hide filters" : "Show filters"}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <button
            onClick={() => setCurrentPage(1)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
            aria-label="View all products"
          >
            View All
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {showFilters && (
          <div className="lg:w-1/4 mb-6 lg:mb-0">
            <FilterPanel
              products={memoizedProducts}
              setFilteredProducts={setFilteredProducts}
            />
          </div>
        )}
        <div className="lg:w-3/4">
          <Suspense fallback={<SkeletonLoader />}>
            {isLoading ? (
              <SkeletonLoader />
            ) : paginatedProducts.length === 0 ? (
              <section
                aria-live="polite"
                className="text-center text-gray-500 dark:text-gray-400 py-8"
              >
                <p className="text-xl">
                  No products available. Please try again later.
                </p>
              </section>
            ) : (
              <>
                <div
                  className="
    grid gap-8
    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
    px-6 md:px-12 py-10
  "
                >
                  {paginatedProducts
                    .filter((p): p is Product => !!p && p.id !== undefined)
                    .map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        priority={index < 4}
                        className="animate-fadeIn"
                      />
                    ))}
                </div>

                <div className="mt-12 flex justify-center space-x-8">
                  {!isLoading && currentPage > 1 && (
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
                      aria-label="Previous page"
                    >
                      Previous
                    </button>
                  )}
                  <span className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg">
                    Page {currentPage} of {totalPages}
                  </span>
                  {!isLoading && currentPage < totalPages && (
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  )}
                </div>
              </>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
