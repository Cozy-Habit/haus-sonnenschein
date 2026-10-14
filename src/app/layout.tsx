import { Inter } from "next/font/google";
import "../scss/index.scss";
import styles from "./layout.module.scss";
import { Metadata } from "next";
import { Navbar, Footer } from "@/components";
import Provider from "./Provider";
import { fetchSanityContent } from "@/sanity/queries";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Kindertagespflege in Sankt Augustin U3",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sanityContent = await fetchSanityContent();

  return (
    <Provider content={sanityContent}>
      <html lang="de" className={styles.layout}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lilita+One&display=swap"
            rel="stylesheet"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={inter.className}>
          <Navbar />
          <main className={styles["layout__main"]}>{children}</main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
