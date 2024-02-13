import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  addToFavourite,
  removeFromFavourite,
  selectFavourites,
} from "@/slices/amazonSlice";

import { toast } from "sonner";
import axios from "axios";
import { Toaster } from "sonner";
import { ScaleLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/legacy/image";
import emptyCart from "../../../images/emptyCart.png";

const Viewproduct = () => {
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
  const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

  const favouriteItems = useSelector(selectFavourites);

  const api_token = localStorage.getItem("api_token");
  const user_id = localStorage.getItem("user_id");


  if (user_id) {
    useEffect(() => {
      setIsFavorite(favouriteItems.filter((item) => item.id == id).length !== 0);
    }, [favouriteItems, isFavorite]);
  }  

  useEffect(() => {
    const handleImageClick = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${baseApiRoute}/products/${id}/viewproduct`,
            {
              headers: {
                Authorization: `Bearer ${api_token}`,
              },
            }
          );
          setProduct(response.data.product);
          setIsLoading(false);
          // console.log(response.data.product)
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Product not found
          setNotFound(true);
          setIsLoading(false);
        } else {
          console.error(error);
        }
      }
    };
    handleImageClick();
  }, [id]);

  // useEffect(() => {
  //   async function handleGetUserFavouriteProduct() {
  //     try {
  //       const response = await axios.get(`${baseApiRoute}/getfavourite`, {
  //         headers: {
  //           Authorization: `Bearer ${api_token}`,
  //         },
  //       });
  //       // console.log(response.data.userfavourites);
  //       const userFavourites = response.data.favourites;
  //       // Check if the current product is in the user's favourites
  //       setIsFavorite(userFavourites.some((favProduct) => 
  //         favProduct.id == product.id
  //       ));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   if (product?.id) {
  //     handleGetUserFavouriteProduct();
  //   }
  // }, [product?.id]);

  async function handleAddToFavourite(productId) {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("product_id", productId);

    try {

      dispatch(
        addToFavourite({
          // id: productId,
          id: product?.id,
          title: product?.title,
          description: product?.description,
          price: product?.price,
          category: product?.category,
          image: `${imageRoute}/${product?.image}`,
          // quantity: 1,
        })
      );
      toast.success("Added to Favourite");

      const response = await axios.post(`${baseApiRoute}/favourite`, formData, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      });
      // console.log(response.data.message);
      // dispatch(
      //   addToFavourite({
      //     // id: productId,
      //     id: product?.id,
      //     title: product?.title,
      //     description: product?.description,
      //     price: product?.price,
      //     category: product?.category,
      //     image: `${imageRoute}/${product?.image}`,
      //     // quantity: 1,
      //   })
      // );
      setIsFavorite(true);
      // toast.success("Added to Favourite");
    } catch (error) {
      console.error("Error adding to favourites:", error.response.data);
    }
  }

  async function handleRemoveFromFavourite(productId) {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("product_id", productId);

    try {

      dispatch(
        removeFromFavourite({
          // id: productId,
          id: product?.id,
          title: product?.title,
          description: product?.description,
          price: product?.price,
          category: product?.category,
          image: `${imageRoute}/${product?.image}`,
          // quantity: 1,
        })
      );
      toast.success("Removed from Favourite");

      const response = await axios.post(`${baseApiRoute}/removefromfavourite`, formData, {
          headers: {
            Authorization: `Bearer ${api_token}`,
          },
        }
      );
      // console.log(response.data.message);
      // dispatch(
      //   removeFromFavourite({
      //     // id: productId,
      //     id: product?.id,
      //     title: product?.title,
      //     description: product?.description,
      //     price: product?.price,
      //     category: product?.category,
      //     image: `${imageRoute}/${product?.image}`,
      //     // quantity: 1,
      //   })
      // );
      setIsFavorite(false);
      // toast.success("Removed from Favourite");
    } catch (error) {
      console.error("Error adding to favourites:", error.response.data);
    }
  }

  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <div className="flex flex-col p-5 space-y-10 bg-white m-5 shadow-sm">
        {isLoading ? (
          <div className="w-full flex flex-col gap-6 items-center justify-center py-20 text-xl font-bold">
            <p>The product is loading...</p>
            <ScaleLoader color="#F59E0B" size={40} />
          </div>
        ) : notFound ? (
          <AnimatePresence>
            <h1>
              <motion.div
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center  justify-center space-x-10 p-20 text-3xl border-b"
              >
                <div>
                  <Image src={emptyCart} />
                </div>
                <div className="w-96 p-4 bg-white flex flex-col items-center justify-center rounded-md shadow-lg">
                  <p className="font-bold">No Products Found.</p>
                  <p className="text-sm text-center pt-2">
                    We have a variety of products to choose from.
                  </p>
                  <button
                    onClick={() => router.push("/")}
                    className="mt-6 text-lg font-semibold button"
                  >
                    Go back
                  </button>
                </div>
              </motion.div>
            </h1>
          </AnimatePresence>
        ) : (
          <div className="grid grid-cols-5 gap-3 py-10">
            <img
              src={
                product.image
                  ? `${imageRoute}/${product.image}`
                  : `https://source.unsplash.com/random/?${product.id}`
              }
              alt=""
              height={300}
              width={300}
              className="pt-5 object-contain relative"
            />

            <div className="col-span-4 mx-5 flex flex-col gap-4">
              <p className="font-medium">{product?.title}</p>

              <p className="text-sm my-2 line-clamp-3 text-justify">
                {product?.description}
              </p>

              <p>
                Unit price :{" "}
                <span className="font-semibold">
                  <Currency quantity={parseFloat(product?.price)} />
                </span>
              </p>
              <div>
                <button
                  onClick={() => {
                    if (!api_token) {
                      toast.error("Please sign in");
                    } else {
                      isFavorite
                        ? handleRemoveFromFavourite(product?.id)
                        : handleAddToFavourite(product?.id);
                    }
                  }}
                  className="bg-green-500 w-48 text-white flex justify-center items-center gap-3 px-2 py-2 mb-2 hover:bg-green-700 active:bg-green-900 drop-shadow-lg rounded-md"
                >
                  {isFavorite ? "Remove from Favourite" : "Add to Favourite"}
                </button>
                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: product?.id,
                        title: product?.title,
                        description: product?.description,
                        price: product?.price,
                        category: product?.category,
                        // image: `${imageRoute}/${product?.image}`,
                        image: product?.image,
                        quantity: 1,
                      })
                    );
                    toast.success("Successfully Added to Basket");
                  }}
                  className="bg-yellow-500 w-48 text-white flex justify-center items-center gap-3 px-2 py-2 mb-2 hover:bg-yellow-700 active:bg-yellow-900 drop-shadow-lg rounded-md"
                >
                  Add to Basket
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <Footer />  */}
      <Toaster richColors closeButton position="top-right" />
    </div>
  );
};

export default Viewproduct;
