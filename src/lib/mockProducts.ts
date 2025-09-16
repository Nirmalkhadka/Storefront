import { Product } from '@/lib/types';

export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    price: 9.99,
    category: 'beauty',
    description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.',
    image: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
    rating: { rate: 2.56, count: 99 },
    stock: 99,
  },
  {
    id: 2,
    title: 'Eyeshadow Palette with Mirror',
    price: 19.99,
    category: 'beauty',
    description: 'The Eyeshadow Palette with Mirror offers a versatile range of shades for stunning eye makeup looks.',
    image: 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg',
    rating: { rate: 4.0, count: 0 },
    stock: 0, // Explicitly out of stock
  },
  {
    id: 3,
    title: 'Sample Product 3',
    price: 49.99,
    category: 'electronics',
    description: 'Another sample electronic product.',
    image: 'https://cdn.dummyjson.com/product-images/3/thumbnail.jpg',
    rating: { rate: 4.2, count: 75 },
    stock: 75,
  },
  {
    id: 4,
    title: 'Sample Electronics 4',
    price: 39.99,
    category: 'electronics',
    description: 'Another electronics product for related products testing.',
    image: 'https://cdn.dummyjson.com/product-images/4/thumbnail.jpg',
    rating: { rate: 4.1, count: 50 },
    stock: 50,
  },
  {
    id: 5,
    title: 'Sample Clothing 5',
    price: 24.99,
    category: 'clothing',
    description: 'Another clothing product for related products testing.',
    image: 'https://cdn.dummyjson.com/product-images/5/thumbnail.jpg',
    rating: { rate: 3.8, count: 25 },
    stock: 25,
  },
];