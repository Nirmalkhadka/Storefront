import { Product } from "@/lib/types";
import { mockProducts } from "@/lib/mockProducts";

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=100", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    if (!data.products || !Array.isArray(data.products)) {
      throw new Error("Invalid API response: Expected an array of products");
    }
    interface APIProduct {
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

    return data.products.map((item: APIProduct) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description || "No description available",
      image: item.thumbnail || item.images?.[0] || "/placeholder.jpg",
      rating: { rate: item.rating, count: item.stock },
      stock: item.stock,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return mockProducts;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    console.log("Available mockProducts:", mockProducts); // Debug mock data
    // Explicitly force mock data for ID 2
    if (id === "2") {
      const mockProduct = mockProducts.find((p) => p.id === 2);
      if (mockProduct) {
        console.log(`Forced mock product for ID 2:`, mockProduct);
        return mockProduct;
      }
      console.error("Mock product for ID 2 not found in mockProducts");
      throw new Error("Mock product for ID 2 not found");
    }

    // Try mock data for other IDs (1, 3, 4, 5)
    const mockProduct = mockProducts.find((p) => p.id === Number(id));
    if (mockProduct) {
      console.log(`Mock product used for ID ${id}:`, mockProduct);
      return mockProduct;
    }

    // Fallback to API for other IDs
    console.log(`Fetching API for ID ${id}`);
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log(`API product for ID ${id}:`, data);
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
  } catch (error) {
    console.error(`Error fetching product for ID ${id}:`, error);
    return null;
  }
}
