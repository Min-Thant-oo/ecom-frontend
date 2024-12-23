import React, { useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import us from "../../../images/us.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

// const [api_token, setApi_token] = useState("");

// useEffect(() => {
//   setApi_token(localStorage.getItem("api_token"));
// }, []);

// const [api_token, setapi_token] = useState('');
// useEffect(() => {
//     const storedapi_token = localStorage.getItem('api_token');
//     if (storedapi_token) {
//         setapi_token(storedapi_token);
//     }
// }, []);

const FooterMiddle = () => {
  const router = useRouter();
  // const [api_token, setApi_token] = useState("");
  const api_token = localStorage.getItem("api_token");

  return (
    <div className="w-full bg-amazon_blue-light text-white">
      <div className="w-full border-b border-gray-700 py-10">
        <div className="max-w-5xl mx-auto text-gray-300">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 md:place-items-center md:items-start xl:grid-cols-4">
            <div className="w-full px-10 py-5 ">
              <ul>
                <li className="hover:underline hover:cursor-pointer">
                  <Link href={"/contactus"}>Contact Us</Link>
                </li>
              </ul>
              {/* <h3 className="font-lg text-white text-base font-bold mb-3">
                Get to Know Us
              </h3>
              <ul className="flex flex-col gap-1">
                <li className="hover:underline hover:cursor-pointer">
                  Careers
                </li>
                <li className="hover:underline hover:cursor-pointer">Blog</li>
                <li className="hover:underline hover:cursor-pointer">
                  About Amazon
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  Investor Relations
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  Amazon Devices
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  Amazon Science
                </li>
              </ul> */}
            </div>
            <div className="w-full px-10 py-5">
              <ul>
                <li className="hover:underline hover:cursor-pointer">
                  <Link href={"/userinfo"}>Your Account</Link>
                </li>
              </ul>
              {/* <h3 className="font-lg text-white text-base font-bold mb-3">
                Make Money with Us
              </h3>
              <ul className="flex flex-col gap-1">
                <li className="hover:underline hover:cursor-pointer">
                  Sell products on Amazon
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  Sell on Amazon Business
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  Sell apps on Amazon
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  Becomes an Affiliate
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  Advertise Your Products
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  Self-Publish with Us
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  Host an Amazon Hub
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  See More Make Money with Us
                </li>
              </ul> */}
            </div>
            <div className="w-full px-10 py-5">
              <ul>
                <li className="hover:underline hover:cursor-pointer">
                  <Link href={"/favourites"}>Your Favourites</Link>
                </li>
              </ul>
              {/* <h3 className="font-lg text-white text-base font-bold mb-3">
                Amazon Payment Products
              </h3>
              <ul className="flex flex-col gap-1">
                <li className="hover:underline hover:cursor-pointer">
                  Amazon Business Card
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  Shop with Points
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  Reload Your Balance
                </li>
                <li className="hover:underline hover:cursor-pointer">
                  Amazon Currency Converter
                </li>
              </ul> */}
            </div>
            <div className="w-full px-10 py-5">
              <ul>
                <li className="hover:underline hover:cursor-pointer decoration-none">
                  <Link href={"/orders"}>Your Orders</Link>
                </li>
              </ul>
              {/* <h3 className="font-lg text-white text-base font-bold mb-3">
                Let Us Help You
              </h3>
              <ul className="flex flex-col gap-1">
                <li className="hover:underline cursor-pointer">
                  <span onClick={() => router.push("/userinfo")}>
                    Your Account
                  </span>
                </li>
                <li className="hover:underline cursor-pointer">
                  <span onClick={() => router.push("/favourites")}>
                    Your Favourites
                  </span>
                </li>
                <li className="hover:underline cursor-pointer">
                  <span onClick={() => router.push("/orders")}>Your Order</span>
                </li>
                <li className="hover:underline cursor-pointer">Contact Us</li>
                <li className="hover:underline cursor-pointer">Help</li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-6 items-center justify-center py-6">
        <div className="mt-3">
          <Image
            src={logo}
            width={80}
            height={80}
            style={{ width: "auto", height: "auto" }}
            alt="img"
          />
        </div>
        <div className="flex gap-2">
          <p className="flex gap-1 items-center justify-center border border-gray-500 cursor-pointer px-2 py-1">
            English
          </p>
        </div>
        <div className="flex items-center justify-center gap-x-1 border border-gray-500 px-2 py-1">
          <Image
            src={us}
            width={30}
            height={30}
            style={{ width: "auto", height: "auto" }}
            alt="img"
          />
          <p>US</p>
        </div>
      </div>
    </div>
  );
};

export default FooterMiddle;
