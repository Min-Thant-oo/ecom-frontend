import React, { useEffect, useState } from "react";
import Product from "./Product";
import banner from "../../images/banner.jpg";
import Image from "next/image";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Footer from "./footer/Footer";

const SearchFeed = ({ selectedCategory, searchTerm }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const params = new URLSearchParams(window.location.search);

  const [currentPage, setCurrentPage] = useState(params?.get("page") ?? 1);
  const [totalPages, setTotalPages] = useState(1);

  console.log({ currentPage });

  const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        response = await axios.get(
          `${baseApiRoute}/search/?q=${searchTerm || ""}&category=${
            selectedCategory || ""
          }&page=${currentPage}`
        );

        if (response.data.products) {
          console.log(response.data);
          setData(response.data.products.data);
          setTotalPages(response.data.products.last_page);
          // setIsLoading(false)
          setError("");
        } else {
          setData([]);
          setError("Products Not Found");
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setData([]);
        setError("Products not found");
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, selectedCategory]);

  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;

  return (
    <div className="">
      {isLoading ? (
        <div className="w-full h-screen flex gap- items-center justify-center text-2xl font-bold -mt-20">
          {/* <p className='text-black bg-red-600'>The product is loading...</p> */}
          <ScaleLoader
            color="#F59E0B"
            size={40}
            className="text-black text-2xl "
          />
        </div>
      ) : error ? (
        <div className="absolute w-full h-full flex items-center justify-center -z-10 -mt-20 text-xl font-bold text-center">
          <p>{error} !</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-flow-row-dense mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:mt-5 ">
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
              <Image className="md:col-span-full" src={banner} alt="" />
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
            pageRangeDisplayed={5}
            pageCount={totalPages}
            containerClassName="flex items-center justify-center mt-8 pb-8"
            pageClassName="block border border-solid border-gray-300 cursor-pointer hover:bg-yellow-400 flex items-center justify-center rounded-md mr-4"
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

export default SearchFeed;
