'use client';
import { Product } from '@/lib/types';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'react-hot-toast';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  console.log('Product in AddToCartButton:', product); // Debug

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }
    addItem(product);
    toast.success('Added to cart!');
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={product.stock === 0}
      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
      aria-label={product.stock === 0 ? 'Out of stock' : 'Add to cart'}
    >
      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
    </button>
  );
}