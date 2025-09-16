"use client"; // client component for interactivity
import { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import RelatedProductsSection from "@/components/RelatedProductsSection";

// API response type
interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  rating: number;
  stock: number;
}

// fetch single product
async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data: ApiProduct = await res.json();
    return {
      id: data.id,
      title: data.title,
      price: data.price,
      category: data.category,
      description: data.description || "No description available",
      image: data.thumbnail || data.images?.[0] || "/placeholder.jpg",
      rating: { rate: data.rating, count: data.stock },
      stock: data.stock,
    };
  } catch {
    return null;
  }
}

// fetch related products
async function getRelatedProducts(category: string, currentId: number): Promise<Product[]> {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=20`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.products || !Array.isArray(data.products)) return [];

    return (data.products as ApiProduct[])
      .filter((p) => p.id !== currentId)
      .map((p): Product => ({
        id: p.id,
        title: p.title,
        price: p.price,
        category: p.category,
        description: p.description || "No description available",
        image: p.thumbnail?.trim() || p.images?.[0]?.trim() || "/placeholder.jpg",
        rating: { rate: p.rating, count: p.stock },
        stock: p.stock,
      }));
  } catch {
    return [];
  }
}

// Props type for page
interface ProductDetailProps {
  params: { id: string };
}

// Main page component
export default function ProductDetail({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Fetch product + related products on first render
  useMemo(() => {
    const fetchData = async () => {
      const prod = await getProduct(params.id);
      if (!prod) return;
      setProduct(prod);

      const related = await getRelatedProducts(prod.category, prod.id);
      setRelatedProducts(related);
      setCurrentPage(1); // reset page
    };
    fetchData();
  }, [params.id]);

  if (!product) {
    return <p className="text-center py-12 text-gray-500">Loading product...</p>;
  }

  // Pagination
  const totalPages = Math.ceil(relatedProducts.length / productsPerPage);
  const paginatedProducts = relatedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
      <section className="max-w-6xl mx-auto animate-slideIn">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
          <div className="md:w-full h-fit sticky top-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h1 className="text-4xl font-extrabold mb-3">{product.title}</h1>
            <p className="text-2xl font-bold text-indigo-600 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-4">{product.category}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <AddToCartButton product={product} />
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 rounded-lg bg-blue-100 text-blue-800 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
