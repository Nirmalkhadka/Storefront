import { Metadata } from 'next';
import { getProducts } from '@/lib/fetchProducts';
import { Product } from '@/lib/types';
import HomeClient from './page.client';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Browse our product catalog with filtering and sorting options.',
};

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <main className="min-h-screen transition-colors duration-300">
      <HomeClient initialProducts={products} />
    </main>
  );
}



  //  <main className="flex min-h-screen items-center justify-center flex-col gap-4">
  //     <div className="bg-white dark:bg-black text-black dark:text-white p-4 rounded">
  //       If you see this switch colors, dark mode is working!
  //     </div>

  //     {/* test toggle */}
  //     <ThemeToggle />
  //   </main>