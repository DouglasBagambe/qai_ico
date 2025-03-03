import { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "QSE",
  description: "QAI ICO Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="App">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
