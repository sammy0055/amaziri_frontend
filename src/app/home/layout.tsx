import type { Metadata } from "next";
import { Sidebar } from "../component/modules/sidebar";
import styles from "./home.module.scss";
import { Header } from "../component/modules/header";
export const metadata: Metadata = {
  title: "Home",
  description: "Amaziri home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className={styles["LayoutWrapper"]}>
          <Sidebar />
          <section className={styles["MainBody"]}>
            <Header />
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
