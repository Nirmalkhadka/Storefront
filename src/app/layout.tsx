// layout.tsx
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components//ThemeToggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Dark Mode",
  description: "Dark mode setup",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
              <Link href="/" className="text-2xl font-bold tracking-wide hover:opacity-90 transition">
                🛍 Storefront
              </Link>
              <div className="flex items-center space-x-6">
                <Link href="/cart" className="hover:text-yellow-300 transition-colors font-medium">
                  Cart
                </Link>
                <ThemeToggle /> {/* ⬅️ Sun/Moon button here */}
              </div>
            </div>
          </nav>

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
