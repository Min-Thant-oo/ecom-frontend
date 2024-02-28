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

  const params = new URLSearchParams(window.location.search);
  const search = params?.get("q");
  const category = params?.get("category");

  return (
    <div className="bg-gray-100">
      <Head>
        <link rel="icon" href="/frontend/favicon.ico/" />
        <title>Solar Ecom | Search</title>
      </Head>

      <Header
        a={search}
        searchCateogry={category}
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
