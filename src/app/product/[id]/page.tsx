import { Product } from "@/lib/types";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import { Metadata } from "next";
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
      .map((p) => ({
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

// Metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return { title: "Product Not Found" };
  return { title: product.title, description: product.description };
}

// ✅ Server component page
export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.category, product.id);

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
          <div style={{padding:'12px'}}
           className="md:w-full h-fit sticky top-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h1 className="text-4xl font-extrabold mb-3">{product.title}</h1>
            <p className="text-2xl font-bold text-indigo-600 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-4">{product.category}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <AddToCartButton product={product} />
          </div>
        </div>

        {relatedProducts.length > 0 && <RelatedProductsSection products={relatedProducts} />}
      </section>
    </div>
  );
}
