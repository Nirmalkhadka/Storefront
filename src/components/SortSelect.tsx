'use client';
import { Product } from '@/lib/types';

interface SortSelectProps {
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
}

export default function SortSelect({ products, setFilteredProducts }: SortSelectProps) {
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = e.target.value;
    let sorted = [...products];
    if (sortType === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="mb-4">
      <label htmlFor="sort" className="mr-2 font-semibold text-gray-700 dark:text-gray-300">
        Sort by:
      </label>
      <select
        id="sort"
        onChange={handleSort}
        className="border p-2 rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        aria-label="Sort products by price"
      >
        <option value="">Select</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}