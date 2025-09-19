import { Quicksand } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "@/src/app/context/ProductContext";
const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "RKR | Fireworks | Crackers",
  description: "We provide a wide range of fireworks and crackers for all occasions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${quicksand.className}`}>
        <ProductProvider>
          {children}
        </ProductProvider>
      </body>
    </html>
  );
}
