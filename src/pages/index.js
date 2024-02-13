import Banner from "@/components/Banner.js";
import Header from "../components/Header.js";
import Head from "next/head";
import ProductFeed from "@/components/ProductFeed.js";
// import { Provider } from 'react-redux';
import Footer from "@/components/footer/Footer.js";
import { Toaster } from "sonner";
import { useState } from "react";

export default function Home({}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [hsearchTerm, sethSearchTerm] = useState("");
  const [hselectedCategory, sethSelectedCategory] = useState(null);

  return (
    <div className="bg-gray-100">
      <Head>
        <link rel="icon" href="/frontend/favicon.ico/" />
        <title>Solar Ecom</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto ">
        <Banner />

        <ProductFeed />

        {/* <Footer /> */}

        <Toaster richColors closeButton position="top-right" />
      </main>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const products = await fetch('https://fakestoreapi.com/products')
//   .then((res) => res.json())
//   return {
//     props: {
//       products,
//     }
//   }
// }

// https://fakestoreapi.com/products