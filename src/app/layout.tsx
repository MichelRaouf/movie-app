import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/navbar";

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
        <Navbar />
        <main className="max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
