"use client";
import { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import FilterPanel from "@/components/FilterPanel";
import SearchInput from "@/components/SearchInput";
import SortSelect from "@/components/SortSelect";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Suspense } from "react";

// Fetch products at build time (SSG)
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=100", {
      cache: "force-cache", // fetch once at build time
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.products.map(
      (item: {
        id: number;
        title: string;
        price: number;
        category: string;
        description?: string;
        thumbnail?: string;
        images?: string[];
        rating?: number;
        stock: number;
      }): Product => ({
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.category,
        description: item.description || "No description available",
        image: item.thumbnail || item.images?.[0] || "/placeholder.jpg",
        rating: { rate: item.rating ?? 0, count: item.stock },
        stock: item.stock,
      })
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

interface HomeClientProps {
  initialProducts: Product[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 8;

  const memoizedProducts = useMemo(() => initialProducts, [initialProducts]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="container mx-auto p-6 sm:p-8 lg:p-10 min-h-screen">
      {/* <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        Storefront
      </h1> */}

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
        <div style={{padding: '13px'}}
         className="lg:w-3/4">
          <Suspense fallback={<SkeletonLoader />}>
            {paginatedProducts.length === 0 ? (
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
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-6 md:px-12 py-10">
                  {paginatedProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      priority={index < 4}
                      className="animate-fadeIn"
                    />
                  ))}
                </div>

                <div style={{margin: '9px'}}
                className="mt-16 flex justify-center items-center gap-4">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>

                  <span className="px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
