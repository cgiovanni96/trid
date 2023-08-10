import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../globals.css";
import {
  BottomBar,
  LeftSideBar,
  RightSideBar,
  TopBar,
} from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trids",
  description: "A mock social media app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TopBar />

          <main className="flex flew-row">
            <LeftSideBar />
            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            <RightSideBar />
          </main>

          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
