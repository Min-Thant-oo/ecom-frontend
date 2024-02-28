import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectItems, selectTotal } from "@/slices/amazonSlice";
import { useRouter } from "next/router";
import axios from "axios";
import { ScaleLoader } from "react-spinners";

const Success = () => {
  let user_id = localStorage.getItem("user_id");
  let api_token = localStorage.getItem("api_token");

  const [isLoading, setIsLoading] = useState(false);

  const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
  const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

  const router = useRouter();
  const dispatch = useDispatch();
  const total = useSelector(selectTotal);
  const products = useSelector(selectItems);

  const { payment_status } = router.query;
  // console.log('randomId:', payment_status);

  const order = async () => {
    setIsLoading(true);
    const orderData = {
      user_id: user_id,
      products: products.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
      })),
      total_amount: total,
    };

    try {
      const response = await axios.post(`${baseApiRoute}/order`, orderData, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      });
      setIsLoading(true);
      dispatch(clearCart());
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (payment_status) {
    return (
      <div>
        {/* <Header /> */}
        <div className="flex flex-col gap-2 items-center justify-center py-20 h-screen">
          <h1 className="text-2xl font-semibold text-center">
            Thank you for shopping at Solar Ecom
          </h1>
          <button
            onClick={() => order()}
            className="mt-6 text-lg font-semibold button"
          >
            Continue Shopping
          </button>
          {isLoading && (
            <div className="flex items-center justify-center font-bold">
              <ScaleLoader color="#F59E0B" size={40} className="text-black" />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>No Data here.</p>
      </div>
    );
  }
};

export default Success;
