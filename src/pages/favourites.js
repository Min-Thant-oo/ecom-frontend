import { StarIcon } from "@heroicons/react/24/solid";
import Header from "@/components/Header";
import Head from "next/head";
import Image from "next/legacy/image";
import React, { useRef, useState, useEffect } from "react";
import prime from "../../images/prime.png";
import emptyCart from "../../images/emptyCart.png";
import checkoutbanner from "../../images/checkoutbanner.webp";
import { useSelector } from "react-redux";
import {
  addToCart,
  clearFavourite,
  removeFromFavorite,
  removeFromFavourite,
  selectFavourites,
  selectTotal,
} from "@/slices/amazonSlice";
import Currency from "react-currency-formatter";
import Footer from "@/components/footer/Footer.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillCheckCircle } from "react-icons/ai";
import axios from "axios";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { ScaleLoader } from "react-spinners";

const Favourites = () => {
  // const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const api_token = localStorage.getItem("api_token");
  const user_id = localStorage.getItem("user_id");

  const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
  const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

  const favourites = useSelector(selectFavourites);
  const dispatch = useDispatch();

  const router = useRouter();

  async function handleRemoveFromFavourite(itemId) {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("product_id", itemId.id);

    try {
      const response = await axios.post(
        `${baseApiRoute}/removefromfavourite`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${api_token}`,
          },
        }
      );
      dispatch(
        removeFromFavourite({
          id: itemId?.id,
          title: itemId?.title,
          description: itemId?.description,
          price: itemId?.price,
          category: itemId?.category,
          image: `${imageRoute}/${itemId?.image}`,
        })
      );
      toast.success("Removed from Favourite");
    } catch (error) {
      console.error("Error");
    }
  }

  async function handleMoveFromFavouriteToCart(itemId) {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("product_id", itemId.id);

    try {
      const response = await axios.post(
        `${baseApiRoute}/removefromfavourite`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${api_token}`,
          },
        }
      );
      dispatch(
        addToCart({
          id: itemId.id,
          title: itemId.title,
          description: itemId.description,
          price: itemId.price,
          category: itemId.category,
          image: itemId.image,
          quantity: 1,
        })
      );

      dispatch(
        removeFromFavourite({
          id: itemId?.id,
          title: itemId?.title,
          description: itemId?.description,
          price: itemId?.price,
          category: itemId?.category,
          image: `${imageRoute}/${itemId?.image}`,
        })
      );
      toast.success("This product has been moved to Basket");
    } catch (error) {
      console.error("Error");
    }
  }

  // done
  async function handleMoveAllToCart() {
    const formData = new FormData();
    formData.append("user_id", user_id);

    try {
      const response = await axios.post(
        `${baseApiRoute}/removeallfromfavourite`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${api_token}`,
          },
        }
      );
      favourites.forEach(async (item) => {
        dispatch(
          addToCart({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            category: item.category,
            image: item.image,
            quantity: 1,
          })
        );
      });

      dispatch(clearFavourite());

      toast.success("Successfully moved all items to baskets");
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.error("Error");
    }
  }

  // done
  async function handleRemoveAllFromFavourite() {
    const formData = new FormData();
    formData.append("user_id", user_id);

    try {
      const response = await axios.post(
        `${baseApiRoute}/removeallfromfavourite`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${api_token}`,
          },
        }
      );
      dispatch(clearFavourite());
      toast.success("Successfully Removed all items from Favourite");
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.error("Error");
    }
  }

  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <link rel="icon" href="/frontend/favicon.ico/" />
        <title>Solar Ecom | favourite</title>
      </Head>

      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto ">
        {api_token ? (
          <div className="flex-grow">
            {isLoading ? (
              <div className="w-full h- flex flex-col gap-6 items-center justify-center py-20 text-xl font-bold">
                <p>The product is loading...</p>
                <ScaleLoader color="#F59E0B" size={40} />
              </div>
            ) : (
              <>
                {favourites?.length === 0 ? (
                  <AnimatePresence>
                    <h1>
                      <motion.div
                        initial={{ y: 70, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex items-center bg-gray-100 justify-center space-x-10 p-20 text-3xl border-b"
                      >
                        <div>
                          <Image src={emptyCart} />
                        </div>
                        <div className="w-96 p-4 bg-white flex flex-col items-center justify-center rounded-md shadow-lg">
                          <p className="font-bold text-xl">
                            Your Favourite Cart feels lonely.
                          </p>
                          <p className="text-sm text-center pt-2">
                            Your Favourite cart lives to serve. Give it purpose
                            - fill it with books, electronics, videos, etc. and
                            make it happy.
                          </p>
                          <button
                            onClick={() => router.push("/")}
                            className="mt-6 text-lg font-semibold button"
                          >
                            Continue Shopping
                          </button>
                        </div>
                      </motion.div>
                    </h1>
                  </AnimatePresence>
                ) : (
                  <div className="flex flex-col p-5 space-y-10 bg-white m-5 shadow-sm">
                    <div className="flex justify-between text-3xl border-b p-5 pb-4 bg-white">
                      <p>Favourite Basket</p>
                    </div>

                    {favourites?.map((item, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-5 border-b-[1px] border-b-gray-200 pb-10 mb-10"
                      >
                        <img
                          src={
                            item.image
                              ? `${imageRoute}/${item.image}`
                              : `https://source.unsplash.com/random/?${item.id}`
                          }
                          alt=""
                          className="object-contain"
                        />

                        {/* Middle */}
                        <div className="col-span-4 mx-5">
                          <p className="font-medium">{item?.title}</p>

                          <p className="text-sm my-2 line-clamp-3 text-justify">
                            {item.description}
                          </p>

                          <div className="flex mt-5 justify-between">
                            <p>
                              Unit price :{" "}
                              <span className="font-semibold">
                                <Currency quantity={parseFloat(item.price)} />
                              </span>
                            </p>
                          </div>

                          <div className="flex">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                              <button
                                onClick={() =>
                                  handleMoveFromFavouriteToCart(item)
                                }
                                className=" bg-yellow-500 text-black flex justify-center items-center gap-3 px-10 py-2 mt-5 mb- hover:bg-yellow-700 active:bg-yellow-900 drop-shadow-lg rounded-md"
                              >
                                Move to Basket
                              </button>
                              <button
                                onClick={() => handleRemoveFromFavourite(item)}
                                className=" bg-red-500 text-white flex justify-center items-center gap-3 px-10 py-2 mt-5 mb- hover:bg-red-700 active:bg-red-900 drop-shadow-lg rounded-md"
                              >
                                Remove item
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {favourites?.length > 0 && (
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleMoveAllToCart()}
                          className="bg-yellow-500 w-48 font-semibold text-lg text-black flex justify-center items-center gap-3 px-2 py-2 mb-2 hover:bg-yellow-700 active:bg-yellow-900 drop-shadow-lg rounded-md"
                        >
                          Move to Basket
                        </button>
                        <button
                          onClick={() => handleRemoveAllFromFavourite()}
                          className="bg-red-500 w-48 font-semibold text-lg text-white flex justify-center items-center gap-3 px-2 py-2 mb-2 hover:bg-red-700 active:bg-red-900 drop-shadow-lg rounded-md"
                        >
                          Clear Favourite
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <h1 className="mx-auto text-xl font-semibold pt-7 my-auto">
            {" "}
            Please{" "}
            <span
              className="text-yellow-500 underline cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              sign in
            </span>{" "}
            to see your favourites.
          </h1>
        )}
      </main>

      {/* <Footer /> */}
      <Toaster richColors closeButton position="top-right" />
    </div>
  );
};

export default Favourites;
