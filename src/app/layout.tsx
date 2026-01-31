import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/provider/authprovider";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import CartContextProvider from "@/provider/cartprovider";
import { WishlistProvider } from "@/provider/wishlistprovider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShopMart",
  description: "Your Premium E-Commerce Experience",
  icons: {
    icon: '/favicon.png', 
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <CartContextProvider>
            <WishlistProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Toaster richColors />
              <Footer />
              </WishlistProvider>
          </CartContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
