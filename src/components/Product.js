import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import prime from "../../images/prime.png";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartOnSignIn,
  selectItems,
  selectFavourites,
  clearCart,
  addToFavourite,
  removeFromFavourite,
  UploadingFavorites,
  addToFavouriteAsync,
  removeFromFavouriteAsync,
  fetchUserFavouritesAsync,
} from "@/slices/amazonSlice";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";

const Product = ({ id, title, price, description, category, image, src }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const itemsInCart = useSelector(selectItems);
  const favouriteItems = useSelector(selectFavourites);

  const [isFavourite, setIsFavourite] = useState(false);

  let api_token = localStorage.getItem("api_token");
  const user_id = localStorage.getItem("user_id");

  const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
  const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

  const handleAddToFavourite = () => {
    dispatch(addToFavouriteAsync({ user_id, product_id: id, api_token }))
      .unwrap()
      .then(() => {
        dispatch(
          addToFavourite({
            // product_id: id,
            id,
            title,
            description,
            price,
            category,
            image,
          })
        );
        setIsFavourite(true);
        toast.success("Added to Favourite");
      })
      .catch((error) => {
        console.error("Error adding to favourites:", error);
      });
  };

  const handleRemoveFromFavourite = () => {
    dispatch(removeFromFavouriteAsync({ user_id, product_id: id, api_token }))
      .unwrap()
      .then(() => {
        dispatch(
          removeFromFavourite({
            // product_id: id,
            id,
            title,
            description,
            price,
            category,
            image,
          })
        );
        setIsFavourite(false);
        toast.success("Removed from Favourite");
      })
      .catch((error) => {
        console.error("Error removing from favourites:", error);
      });
  };

  if (user_id) {
    
    // useEffect(() => {
    //   setIsFavourite(favouriteItems.some((item) => 
    //     item.id == id
    //   ));
    // }, [favouriteItems]);
 
    useEffect(() => {
      setIsFavourite(favouriteItems.filter((item) => item.id == id).length !== 0);
    }, [favouriteItems, isFavourite]);
  }

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <FaHeart
        onClick={() => {
          if (!api_token) {
            toast.error("Please sign in");
          } else {
            isFavourite ? handleRemoveFromFavourite() : handleAddToFavourite();
          }
        }}
        className={`absolute top-2 left-2 cursor-pointer ${
          isFavourite ? "text-yellow-500" : "text-gray-600"
        }`}
      />

      <p className="absolute -top-2 right-2 text-xs italic text-gray-400 my-3">
        {category}
      </p>

      <Link href={`/${id}/viewproduct`} target="_blank" passHref>
        <div className="cursor-pointer">
          <img
            // src={image ? `${imageRoute}/${image}` : 'https://picsum.photos/520/450?random='+ Math.random()}
            src={
              image
                ? `${imageRoute}/${image}`
                : `https://source.unsplash.com/random/${id}`
            }
            // width={200}
            // height={200}
            style={{ objectFit: "contain", paddingBottom: "13px" }}
            alt=""
            className="w-200 h-200"
          />
        </div>
      </Link>

      <h4>{title}</h4>

      <p className="text-sm my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        {/* currency is USD by default */}
        <Currency quantity={price} />
      </div>

      <button
        onClick={() => {
          dispatch(
            addToCart({
              id,
              title,
              description,
              price,
              category,
              image: image,
              quantity: 1,
            })
          );
          toast.success("Added to Basket");
        }}
        className="mt-auto button"
      >
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
