Nirmal E-commerce Project
1. How to Run the Project
Prerequisites

Node.js >= 18.x

npm >= 9.x (or yarn)

Internet connection for API fetches

Steps

Clone the repository:

git clone <repo-url>
cd nirmal


Install dependencies:

npm install


Run the development server:

npm run dev


Open the app in your browser: http://localhost:3000

Build for production:

npm run build
npm start

2. Architecture Notes
Pages

Home Page (/)

Displays all products

Includes Search, Filter, Sort

Pagination implemented for large product lists

Product Detail Page (/product/[id])

Server component fetches product details

Related products section is a client component for interactivity (filter/search/pagination)

Components

Client Components (interactive, use hooks):

FilterPanel → category & price filtering

SearchInput → search by product title

SortSelect → sort products by price

RelatedProductsClient → shows related products with pagination & filtering

Server Components (data fetching, static render):

ProductDetail page → fetches product by ID

API fetch functions (getProduct, getRelatedProducts)

State & Data Flow

State is lifted from interactive components to their parent (HomeClient or RelatedProductsClient) for synchronized filtering and pagination

Server fetch functions provide initial product data (initialProducts)

Pagination, filtering, and sorting are handled entirely on the client side

3. Trade-offs / Known Issues

Trade-offs

Related products section uses client-side filtering for instant updates → increases initial bundle size

Product detail page fetches products on the server for SEO and performance, while interactive filtering is client-side

Known Issues

Server component cannot handle useState, so adding hooks in ProductDetail will throw errors

Pagination and filtering on RelatedProductsClient may reset when parent re-renders

API is mocked via dummyjson.com → real production API may require authentication or different endpoints

4. Demo (Optional)

A short demo can show:

Filtering products by category/price

Searching products by title

Pagination with Previous/Next buttons

Clicking a product to view related products

Demo Video / GIF
[![Watch the demo](https://youtu.be/5sercvTYOcg)]
