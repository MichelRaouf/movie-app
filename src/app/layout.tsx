// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movie Search App",
  description: "Search and manage your favorite movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Navigation Bar */}
        <nav className="bg-gray-100 p-4 shadow-md flex gap-6">
          <a href="/" className="font-semibold hover:underline">
            Home
          </a>
          <a href="/favorites" className="font-semibold hover:underline">
            Favorites
          </a>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
