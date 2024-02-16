import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Head from "next/head";
import axios from "axios";
import logodark from "../../images/logodark.png";
import Image from "next/legacy/image";
import { Toaster, toast } from "sonner";
import { ScaleLoader } from "react-spinners";

const Contactus = () => {
  const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

  const [isLoading, setIsLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(true)

  // const [isLoading, setIsLoading] = useState(false)

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Error message starts here
  const [errname, setErrname] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errSubject, setErrSubject] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [error, setError] = useState("");

  const handleName = (e) => {
    setname(e.target.value);
    setErrname("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/);
  };

  const handleSubject = (e) => {
    setSubject(e.target.value);
    setErrSubject("");
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
    setErrMessage("");
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setErrname("Enter your name");
    }

    if (!email) {
      setErrEmail("Enter your email");
    } else if (!emailValidation(email)) {
      setErrEmail("Enter a valid email");
    }

    if (!subject) {
      setErrSubject("Enter the subject");
    }

    if (!message) {
      setErrMessage("Enter your message");
    }

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("subject", subject);
    formdata.append("message", message);

    if (name && email && emailValidation(email) && subject && message) {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.post(`${baseApiRoute}/contactus`, formdata);
        console.log(response.data);
        if (response.status === 200) {
          toast.success("Message sent! We will get back to you soon");
          setname("");
          setEmail("");
          setSubject("");
          setMessage("");
          window.scrollTo(0, 0);
        } else {
          setError("Error sending message", error);
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError(error.response.data.error);
        }
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <Head>
        <link rel="icon" href="/frontend/favicon.ico/" />
        <title>Solar Ecom | Contact Us</title>
      </Head>

      <Header />

      <div className="w-full ">
        <div className="w-full pt-7 bg-gray-100">
          <form className="w-[450px] max-w-4xl mx-auto pb-8">
            <div
              onClick={() => router.push("/")}
              className="flex justify-center items-center pb-6 cursor-pointer"
            >
              <Image
                src={logodark}
                width={150}
                height={40}
                objectFit="contain"
                className=""
              />
            </div>

            <div className="flex flex-col space-y-4 border border-gray-200 shadow-sm p-6">
              <p className="font-semibold text-2xl">Contact Form</p>
              <div>
                <p className="font-medium pb-1">Your name</p>
                <input
                  onChange={handleName}
                  type="text"
                  value={name}
                  className="border font-medium rounded-sm  border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md"
                />
                {errname && (
                  <p className="text-red-500 text-sm font-semibold pt-1">
                    <span className="italic mr-1">!</span>
                    {errname}
                  </p>
                )}
              </div>
              <div>
                <p className="font-medium pb-1">Your email</p>
                <input
                  onChange={handleEmail}
                  type="email"
                  value={email}
                  className="border font-medium lowercase rounded-sm  border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md"
                />
                {errEmail && (
                  <p className="text-red-500 text-sm font-semibold pt-1">
                    <span className="italic mr-1">!</span>
                    {errEmail}
                  </p>
                )}
              </div>
              <div>
                <p className="font-medium pb-1">Subject</p>
                <input
                  onChange={handleSubject}
                  type="text"
                  value={subject}
                  className="border font-medium rounded-sm  border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md"
                />
                {errSubject && (
                  <p className="text-red-500 text-sm font-semibold pt-1">
                    <span className="italic mr-1">!</span>
                    {errSubject}
                  </p>
                )}
              </div>
              <div>
                <p className="font-medium pb-1">Message</p>
                <textarea
                  className="outline-none border border-gray-400 w-full font-medium rounded-sm resize-y focus:drop-shadow-md px-2 py-1"
                  onChange={handleMessage}
                  name="message"
                  id=""
                  cols="30"
                  rows="10"
                  value={message}
                >
                  {/* {message} */}
                </textarea>
                {errMessage && (
                  <p className="text-red-500 text-sm font-semibold pt-1">
                    <span className="italic mr-1">!</span>
                    {errMessage}
                  </p>
                )}
              </div>

              <button
                onClick={handleMessageSubmit}
                disabled={isLoading}
                className="button border text-[17px] font-medium"
              >
                Continue
              </button>
              {isLoading && (
                <div className="flex items-center justify-center font-bold">
                  <ScaleLoader
                    color="#F59E0B"
                    size={40}
                    className="text-black"
                  />
                </div>
              )}
              {error && (
                <div>
                  {errname || errEmail || errSubject || errMessage ? null : (
                    <p className="text-red-500 text-sm font-semibold pt-1">
                      <span className="italic mr-1">!</span> {error}
                    </p>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <Toaster richColors closeButton position="top-right" />
    </div>
  );
};

export default Contactus;
