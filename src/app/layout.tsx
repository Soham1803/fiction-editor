import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";


export const metadata: Metadata = {
  title: "Narratia",
  description: "A curious tool who's very interested in your story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
