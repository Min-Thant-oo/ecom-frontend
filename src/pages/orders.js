import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import emptyCart from "../../images/emptyCart.png";
import Image from "next/legacy/image";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  let api_token = localStorage.getItem("api_token");
  let user_id = localStorage.getItem("user_id");

  const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
  const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

  useEffect(() => {
    if (user_id) {
      async function handleGetUserOrder() {
        try {
          const response = await axios.get(`${baseApiRoute}/getuserorder`, {
            headers: {
              Authorization: `Bearer ${api_token}`,
            },
          });
          setOrders(response.data.orders);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
      handleGetUserOrder();
    }
  }, [user_id]);

  const handleReceiptDownload = async (transactionId, event) => {
    if (event) {
      event.preventDefault(); 
    }
    try {
      // setIsLoading(true);
      const downloadUrl = await axios.get(
        `${baseApiRoute}/order/receipt/${transactionId}/download`,
        {
          // responseType: 'blob',
          headers: {
            Authorization: `Bearer ${api_token}`,
          },
        }
      );
      // Create a blob from the binary data
      // const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a download link
      // const downloadLink = document.createElement('a');
      // downloadLink.href = window.URL.createObjectURL(blob);
      // downloadLink.download = `receipt-${transactionId}.pdf`;

      // Append the link to the body and trigger the download
      // document.body.appendChild(downloadLink);
      // downloadLink.click();

      // Remove the link from the DOM
      // document.body.removeChild(downloadLink);
      // setIsLoading(false);

      //   if (response.status === 200) {
      //     setIsLoading(false);
      // } else {
      //     console.error("Error downloading receipt. Status:", response.status);
      // }
    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
  };

  return (
    <div className="bg-white">
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="max-w-screen-lg mx-auto p-10">
        {api_token ? (
          <>
            {isLoading ? (
              <div className="w-full flex flex-col gap-6 items-center justify-center py-20 text-xl font-bold">
                <p>Your orders are loading...</p>
                <ScaleLoader color="#F59E0B" size={40} />
              </div>
            ) : (
              <>
                {orders.length == 0 ? (
                  <AnimatePresence>
                    <h1>
                      <motion.div
                        initial={{ y: 70, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex items-center bg-gray-100 justify-center space-x-10 p-20 text-3xl border-b"
                      >
                        <div>
                          <Image priority={true} src={emptyCart} />
                        </div>
                        <div className="w-96 p-4 bg-gray-100 flex flex-col items-center justify-center rounded-md shadow-lg">
                          <p className="font-bold text-xl">
                            You haven&apos;t made any orders yet.
                          </p>
                          <p className="text-sm text-center pt-2">
                            Your Shopping cart lives to serve. Give it purpose -
                            fill it with books, electronics, videos, etc. and
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
                  <>
                    <h1 className="text-3xl border-b mb-2 pb-1 border-gray-200">
                      Your Orders
                    </h1>
                    <h2 className="text-xl">{orders.length} Orders</h2>
                    <div className="mt-5 space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="relative border rounded-md"
                        >
                          <div className="flex md:items-center md:space-x-10 p-3 sm:p-5 bg-gray-200 text-sm ">
                            <div className="hidden md:block">
                              <p className=" font-bold text-xs">ORDER PLACED</p>
                              <p>
                                {moment(order.created_at).format("DD MMM YYYY")}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs font-bold">TOTAL</p>
                              <p>
                                <Currency
                                  quantity={parseFloat(order.total_amount)}
                                />
                              </p>
                            </div>

                            <div className="flex-1 md:mt-1 flex flex-col md:flex-row justify-end gap-2 md:gap-5">
                              <p className="hidden md:block text-sm whitespace-nowrap sm:text-xl self-end text-right text-blue-500">
                                {order.products.length} items
                              </p>
                              <p className="text-sm whitespace-nowrap sm:text-lg self-end text-right text-blue-500">
                                <Link
                                  href={`/receipt/${order.transaction_id}/view`}
                                  target="_blank"
                                  passHref
                                >
                                  <span className="hover:text-blue-700 hover:underline">
                                    View Receipt
                                  </span>
                                </Link>
                              </p>
                              <p className="text-sm whitespace-nowrap sm:text-lg self-end text-right text-blue-500">
                                <a
                                  onClick={(e) =>
                                    handleReceiptDownload(
                                      order.transaction_id,
                                      e
                                    )
                                  }
                                  href="#"
                                  className="hover:text-blue-700 hover:underline"
                                >
                                  Download Receipt
                                </a>
                              </p>
                            </div>
                            <p className="hidden md:block absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
                              <span className="font-bold">ORDER #</span>{" "}
                              {order.transaction_id}
                            </p>
                          </div>

                          <div className="p-5 sm:p-10 bg-white">
                            <div className="flex space-x-6 overflow-x-auto">
                              {order.products.map((product) => (
                                <img
                                  key={product.id}
                                  // src={`${imageRoute}/${product.image}`}
                                  src={
                                    product.image
                                      ? `${imageRoute}/${product.image}`
                                      : `https://source.unsplash.com/random/?${product.id}`
                                  }
                                  alt=""
                                  className="h-20 object-contain sm:h-32"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <h1 className="mx-auto flex justify-center items-ce text-xl font-semibold -mb-20 -pb-8">
            {" "}
            Please{" "}
            <span
              className="text-yellow-500 underline cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              sign in
            </span>{" "}
            to see your orders.
          </h1>
        )}
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Orders;
