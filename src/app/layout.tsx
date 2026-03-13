import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Task Portal | Admin & User",
  description: "Interconnected Task Management Portals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <nav className="nav">
            <Link href="/" className="logo">TASKFLOW</Link>
            <div className="nav-links">
              <Link href="/admin" className="nav-link">Admin Portal</Link>
              <Link href="/user" className="nav-link">User Portal</Link>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
