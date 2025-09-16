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


Open the app in your browser:

http://localhost:3000


Build for production:

npm run build
npm start

2. Architecture Notes
Pages

Home Page (/)

Displays all products.

Includes Search, Filter, and Sort functionality.

Pagination implemented for large product lists.

Product Detail Page (/product/[id])

Server component fetches product details.

Related products section is a client component for interactivity (filter/search/pagination).

Components

Client Components (interactive, use hooks)

FilterPanel → handles category & price filter.

SearchInput → search by title.

SortSelect → sort by price.

RelatedProductsClient → shows related products with pagination/filtering.

Server Components (data fetching, static render)

ProductDetail page → fetches product by ID.

API fetch functions (getProduct, getRelatedProducts) live here.

State & Data Flow

State is lifted from interactive components to their parent (HomeClient or RelatedProductsClient) for synchronized filtering and pagination.

Server fetch functions provide initial product data (initialProducts).

Pagination, filtering, and sorting are handled entirely on the client side.

3. Trade-offs / Known Issues

Trade-offs

Related products section uses client-side filtering to allow instant updates, at the cost of initial bundle size.

Product detail page fetches products on the server for SEO and performance but interactive filtering is client-side.

Known Issues

Server component cannot handle client-side state, so any useState in ProductDetail will throw errors.

Pagination and filtering on RelatedProductsClient may reset when parent re-renders.

API is mocked via dummyjson.com → real production API may require authentication or different endpoints.

4. Optional Demo

A short Loom or GIF can show:

Filtering products by category/price.

Searching products.

Pagination with Previous/Next buttons.

Clicking a product and viewing related products.

## Demo

[![Watch the demo](## Demo

[![Watch the demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)])]
