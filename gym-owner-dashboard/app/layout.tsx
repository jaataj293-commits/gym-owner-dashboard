import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gym Owner Dashboard",
    description: "Gym owner dashboard setup",
    };

    export default function RootLayout({
      children,
      }: Readonly<{
        children: React.ReactNode;
        }>) {
          return (
              <html lang="en">
                    <body>{children}</body>
                        </html>
                          );
                          }
