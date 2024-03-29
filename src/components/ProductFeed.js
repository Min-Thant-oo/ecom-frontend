import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Product from "./Product";
import banner from "../../images/banner.jpg";
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "@/slices/amazonSlice";
import { ScaleLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Footer from "./footer/Footer";
import { current } from "@reduxjs/toolkit";

const ProductFeed = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const params = new URLSearchParams(window.location.search);

  const [currentPage, setCurrentPage] = useState(params?.get("page") ?? 1);
  const [totalPages, setTotalPages] = useState(1);

  const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

  useEffect(() => {
    if (router.query?.page ?? 1 != currentPage) {
      setCurrentPage(+(router.query?.page ?? 1));
    }
  }, [router]);

  const handlePageChange = ({ selected }) => {
    const { pathname, query } = router;
    router.push(
      {
        pathname,
        query: { ...query, ...{ page: selected + 1 } },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseApiRoute}?page=${currentPage}`);
        // console.log("Response data:", response.data);
        // console.log("Response data pagination:", response.data.products.per_page);
        if (response.data.products.data) {
          setData(response.data.products.data);
          setTotalPages(response.data.products.last_page);
          setIsLoading(false);
          setError("");
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 200);
        } else {
          setData([]);
          setError("Products Not Found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch products");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const showNextButton = currentPage !== totalPages;
  const showPrevButton = currentPage !== 1;

  return (
    <div className="">
      {isLoading ? (
        <div className="w-full h- flex gap- items-center justify-center text-2xl font-bold lg:-mt-64">
          {/* <p className='text-black bg-red-600'>The product is loading...</p> */}
          <ScaleLoader
            color="#F59E0B"
            size={40}
            className="text-black text-2xl "
          />
        </div>
      ) : error ? (
        <div className="absolute  z-20 -mt-64 text-xl font-bold w-full text-center">
          <p>{error} !</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-flow-row-dense mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 ">
            {data
              ?.slice(0, 4)
              .map(({ id, title, price, description, category, image }) => (
                <Product
                  key={id}
                  id={id}
                  title={title}
                  price={parseFloat(price)}
                  description={description}
                  category={category ? category.name : "Uncategorized"}
                  image={image}
                />
              ))}

            {data.length > 4 && (
              <Image className="md:col-span-full w-full" src={banner} alt="" />
            )}

            <div className="md:col-span-2">
              {data
                .slice(4, 5)
                .map(({ id, title, price, description, category, image }) => (
                  <Product
                    key={id}
                    id={id}
                    title={title}
                    price={parseFloat(price)}
                    description={description}
                    category={category ? category.name : "Uncategorized"}
                    image={image}
                  />
                ))}
            </div>

            {data
              .slice(5, data.length)
              .map(({ id, title, price, description, category, image }) => (
                <Product
                  key={id}
                  id={id}
                  title={title}
                  price={parseFloat(price)}
                  description={description}
                  category={category ? category.name : "Uncategorized"}
                  image={image}
                />
              ))}
          </div>

          <ReactPaginate
            breakLabel={<span className="mr-4">...</span>}
            nextLabel={
              showNextButton && (
                <span className="w-10 h-10 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 rounded-md">
                  <BsChevronRight />
                </span>
              )
            }
            previousLabel={
              showPrevButton && (
                <span className="w-10 h-10 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 rounded-md mr-4">
                  <BsChevronLeft />
                </span>
              )
            }
            pageRangeDisplayed={3}
            pageCount={totalPages}
            forcePage={currentPage - 1}
            containerClassName="flex items-center justify-center mt-8 pb- flex-wrap gap-y-4"
            pageClassName="block border border-solid border-gray-300 cursor-pointer hover:bg-yellow-400   flex items-center justify-center rounded-md mr-4"
            activeClassName="bg-yellow-400"
            pageLinkClassName="w-10 h-10 flex justify-center items-center"
            onPageChange={handlePageChange}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default ProductFeed;
