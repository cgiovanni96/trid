import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";

import "../globals.css";

export const metadata = {
  title: "Trid",
  description: "A mock social media app",
};

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider>
      <html>
        <body className={`${inter.className} bg-dark-1`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
