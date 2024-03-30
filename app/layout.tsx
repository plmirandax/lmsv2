import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "../providers/providers";
import ToasterProvider from "@/components/ToasterProvider";
import IdleTimeout from '../components/IdleTimeout' // Import the new component
import ModalProvider from "@/providers/modal-provider";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RD Realty Development Corporation",
  description: "RD Realty Property Management System.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ThemeProvider
      attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
       <Providers>
        <ToasterProvider />
        <ModalProvider>
        <IdleTimeout /> {/* Include the new component */}
        {children}
        </ModalProvider>
        </Providers>
        </ThemeProvider>
        </body>
    </html>
  );
}