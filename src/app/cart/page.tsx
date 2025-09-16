"use client";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const total = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white animate-slideIn">
        Shopping Cart
      </h1>
      {items.length === 0 ? (
        <section
          aria-live="polite"
          className="text-center text-gray-500 dark:text-gray-400 animate-fadeIn"
        >
          <p className="text-xl">Your cart is empty.</p>
          <Link
            href="/"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            Continue shopping
          </Link>
        </section>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex items-center justify-between p-5 bg-white dark:bg-gray-800
             rounded-xl shadow-md border border-gray-200 dark:border-gray-700
             hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={90}
                      height={90}
                      className="rounded-lg object-cover shadow-sm"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        ${item.price.toFixed(2)}
                      </p>
                      {/* qty controls */}
                    </div>
                  </div>
                  <p className="font-bold text-indigo-600 dark:text-indigo-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </article>
              ))}
            </div>
            <button
              onClick={() => {
                clearCart();
                toast.success("Cart cleared");
              }}
              className="mt-6 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
              aria-label="Clear entire cart"
            >
              Clear Cart
            </button>
          </div>
          <div className="lg:w-1/3 sticky top-6 animate-slideUp">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Order Summary
              </h2>
              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Total Items: {items.length}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                  Total: ${total}
                </p>
              </div>
              <button
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
                aria-label="Proceed to checkout"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
