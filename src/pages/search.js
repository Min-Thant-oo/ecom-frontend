import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
// import Product from '@/components/Product';
import ProductFeed from "@/components/ProductFeed";
import Banner from "@/components/Banner.js";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import Head from "next/head";
import { Toaster } from "sonner";
import SearchFeed from "@/components/SearchFeed";

const Search = () => {
  const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
  const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");

  const [hsearchTerm, sethSearchTerm] = useState("");
  const [hselectedCategory, sethSelectedCategory] = useState(null);

  // useEffect(() => {
  //     sethSearchTerm(searchParams?.get('q'));
  //     sethSelectedCategory(searchParams?.get('category'));
  // }, [searchParams]);

  const params = new URLSearchParams(window.location.search);
  const search = params?.get("q");
  const category = params?.get("category");

  //      useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         setIsLoading(true);

  //         let response;

  //         if (selectedCategory && !searchTerm) {
  //           response = await axios.get(`${baseApiRoute}/categories/${selectedCategory}`);
  //         } else if(selectedCategory || searchTerm) {
  //           response = await axios.get(`${baseApiRoute}/search/${searchTerm || ''}/${selectedCategory || ''}`);
  //           // response = await axios.get(`${baseApiRoute}/search${searchTerm ? `/${searchTerm}` : ''}/${selectedCategory || ''}`);
  //         }

  //         else {
  //           response = await axios.get(baseApiRoute);
  //         }

  //         if (response.data.products) {
  //           setData(response.data.products);
  //           setIsLoading(false)
  //           setError('');
  //         } else {
  //           setData([]);
  //           setError('Products Not Found');
  //         }

  //         setIsLoading(false);
  //       } catch (error) {
  //         setIsLoading(false);
  //         setData([]);
  //         setError('Products not found');
  //         console.error(error);
  //       }
  //     };

  //     fetchData();
  //   }, [selectedCategory, searchTerm]);

  return (
    <div className="bg-gray-100">
      <Head>
        <link rel="icon" href="/frontend/favicon.ico/" />
        <title>Solar Ecom | Search</title>
      </Head>

      <Header
        a={search}
        searchCateogry={category}
        // setSelectedCategory={setSelectedCategory}
        // selectedCategory={selectedCategory}
        // setSearchTerm={setSearchTerm}
        // searchTerm={searchTerm}

        // hsearchTerm = {hsearchTerm}
        // sethSearchTerm = {sethSearchTerm}
        // hselectedCategory = {hselectedCategory}
        // sethSelectedCategory = {sethSelectedCategory}
      />

      <main className="max-w-screen-2xl mx-auto">
        {/* <Banner /> */}

        <SearchFeed searchTerm={search} selectedCategory={category} />

        <Toaster richColors closeButton position="top-right" />
      </main>
    </div>
  );
};

export default Search;
