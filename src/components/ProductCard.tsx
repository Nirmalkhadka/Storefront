'use client';
import { Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  priority = false,
  className = '',
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null; // safeguard

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }
    addItem(product);
    toast.success('Added to cart!');
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className={`border rounded-lg p-4 bg-white dark:bg-gray-800 
                  shadow-md hover:shadow-lg transition-all duration-300 
                  transform hover:scale-105 ${className}`}
    >
      <div className="flex flex-col items-center">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          priority={priority}
          className="object-contain h-40 mb-4"
        />

        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
          {product.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between w-full mt-auto">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-lg font-medium 
                       ${
                         product.stock === 0
                           ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                           : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                       }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
