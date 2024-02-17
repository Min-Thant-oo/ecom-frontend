import Header from "@/components/Header";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import logodark from "../../images/logodark.png";
import Image from "next/legacy/image";
import { Toaster, toast } from "sonner";
import { ScaleLoader } from "react-spinners";
import {
  selectUsername,
  setUsername,
  selectUserEmail,
  setUserEmail,
  fetchUserNameAsync,
  setUserImage,
  selectUserImage,
} from "@/slices/amazonSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "@/components/footer/Footer";

const Userinfo = () => {
  const api_token = localStorage.getItem("api_token");
  const user_id = localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
  const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

  const reduxname = useSelector(selectUsername);
  const reduxemail = useSelector(selectUserEmail);
  const reduximage = useSelector(selectUserImage);

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  // Error message starts here
  const [errname, setErrname] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errFile, setErrFile] = useState(null);
  const [errOldPassword, setErrOldPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [infoUpdateError, setInfoUpdateError] = useState("");
  const [profileInputRef, setProfileInputRef] = useState(null);

  const handleName = (e) => {
    setname(e.target.value);
    setErrname("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handleImage = (e) => {
    setFile(e.target.files[0]);
    setErrFile("");
  };

  const handleOldPassword = (e) => {
    setoldPassword(e.target.value);
    setErrOldPassword("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  // Email validation
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/);
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       if (api_token) {
  //         const response = await axios.get(`${baseApiRoute}/userinfo`, {
  //           headers: {
  //             Authorization: `Bearer ${api_token}`,
  //           },
  //         });
  //         setIsLoading(false);
  //         // setname(response.data.user.name);
  //         // setEmail(response.data.user.email);
  //           // setFile(response.data.user.image)
  //       } else {
  //         // Handle the case when there is no api_token (user is not logged in)
  //         // Redirect to the login page or handle it as per your application flow
  //         //   setIsLoading(false);
  //         router.push("/");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user info:", error);
  //       if (error.response && error.response.status === 401) {
  //         setIsLoading(false);
  //         // Redirect to the login page when a 401 status code is received
  //         router.push("/signin");
  //       } else {
  //         // Handle other errors gracefully
  //         // setname("");
  //         // setEmail("");
  //       }
  //     }
  //   }

  //   fetchData();
  // }, [api_token, router]);

  useEffect(() => {
    setname(reduxname);
    setEmail(reduxemail);
    setProfilePicture(reduximage);
  }, [dispatch, api_token, reduxname, reduxemail, reduximage]);

  async function handleUserInfoChange(e) {
    e.preventDefault();

    if (!name) {
      setErrname("Enter your name");
    }

    if (!email) {
      setErrEmail("Enter your email");
    } else if (!emailValidation(email)) {
      setErrEmail("Enter a valid email");
    }

    // Check if oldPassword, password, and cPassword have values
    if (oldPassword || password || cPassword) {
      if (!oldPassword) {
        setErrOldPassword("Enter your old password");
      }

      if (password) {
        if (password.length < 6) {
          setErrPassword("Passwords must be at least 6 characters.");
        }

        if (!cPassword) {
          setErrCPassword("Confirm your new password");
        } else if (cPassword !== password) {
          setErrCPassword("Password not matched");
        }
      }
    }

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("image", file);
    formdata.append("oldpassword", oldPassword);
    formdata.append("password", password);
    formdata.append("user_id", user_id);

    // if(name && email && emailValidation(email)) {
    if (
      name &&
      email &&
      emailValidation(email) &&
      (!oldPassword || !errOldPassword) &&
      (!password || !errPassword) &&
      (!cPassword || !errCPassword) &&
      (!file || !errFile)
    ) {
      try {
        const response = await axios.post(
          `${baseApiRoute}/userinfoupdate`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${api_token}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.message === "successfully updated") {
          toast.success("Successfully updated");
          setoldPassword("");
          setInfoUpdateError("");
          setPassword("");
          setCPassword("");
          setFile("");
          profileInputRef.value = "";

          dispatch(fetchUserNameAsync({ api_token }))
            .unwrap()
            .then((userinfo) => {
              console.log({ userinfo });
              dispatch(setUsername(userinfo.name));
              dispatch(setUserEmail(userinfo.email));
              dispatch(setUserImage(userinfo.image));
              // setname(userinfo.name || "");
              // setEmail(userinfo.email || "");
              setIsLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching user name:", error);
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
          // dispatch(clearUsername());
        }
      } catch (error) {
        console.log(error);
        setInfoUpdateError(error);
        // toast.error("Error updating the information");
      }
    }
  }

  console.log({ profilePicture });

  return (
    <div>
      <Head>
        <link rel="icon" href="/frontend/favicon.ico/" />
        <title>Solar Ecom | User Info</title>
      </Head>

      <Header />

      {isLoading ? (
        <div className="w-full flex flex-col gap-6 items-center justify-center pt-44 py-20 text-xl font-bold">
          <ScaleLoader color="#F59E0B" size={40} />
        </div>
      ) : api_token ? (
        <div className="w-full">
          <div className="w-full bg-gray-100 pb-10">
            <form className="w-[370px] mx-auto flex flex-col items-center">
              <div
                onClick={() => router.push("/")}
                className="my-5 cursor-pointer"
              >
                <Image
                  src={logodark}
                  width={150}
                  height={40}
                  objectFit="contain"
                />
              </div>

              <div className="w-full border border-zinc-200 p-6">
                <h2 className="font-medium text-3xl mb-4">User Information</h2>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="font-medium pb-1">Your name</p>
                    <input
                      onChange={handleName}
                      // onChange={(e) => setname(e.target.value)}
                      value={name}
                      type="text"
                      placeholder="First name and last name"
                      className="border font-medium rounded-sm placeholder:font-normal placeholder:normal-case border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md"
                    />
                    {errname && (
                      <p className="text-red-500 text-sm font-semibold pt-1">
                        <span className="italic mr-1">!</span>
                        {errname}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="font-medium pb-1">Email</p>
                    <input
                      onChange={handleEmail}
                      value={email}
                      type="email"
                      className="border font-medium lowercase rounded-sm border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md"
                    />
                    {errEmail && (
                      <p className="text-red-500 text-sm font-semibold pt-1">
                        <span className="italic mr-1">!</span>
                        {errEmail}
                      </p>
                    )}
                  </div>

                  {profilePicture && (
                    <img
                      src={`${imageRoute}/${profilePicture}`}
                      alt=""
                      className="w-28 mt-5"
                    />
                  )}

                  <div>
                    <p className="font-medium pb-1">Profile Picture</p>
                    <input
                      onChange={handleImage}
                      type="file"
                      ref={(ref) => {
                        setProfileInputRef(ref);
                      }}
                      className="border rounded-sm border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md"
                    />
                  </div>

                  <p className="font-medium text-xl mt-3">
                    Want to change the password?
                  </p>
                  <div>
                    <p className="font-medium pb-1">Old Password</p>
                    <input
                      onChange={handleOldPassword}
                      value={oldPassword}
                      type="password"
                      className="border rounded-sm placeholder:normal-case border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md"
                    />
                    {errOldPassword && (
                      <p className="text-red-500 text-sm font-semibold pt-1">
                        <span className="italic mr-1">!</span>
                        {errOldPassword}
                      </p>
                    )}

                    {infoUpdateError && (
                      <div>
                        {errname ||
                        errEmail ||
                        errPassword ||
                        errCPassword ? null : (
                          <p className="text-red-500 text-sm font-semibold pt-1">
                            <span className="italic mr-1">!</span>{" "}
                            {infoUpdateError.response.data.error}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium pb-1">New Password</p>
                    <input
                      onChange={handlePassword}
                      value={password}
                      type="password"
                      placeholder="At least 6 characters."
                      className="border rounded-sm placeholder:normal-case border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md"
                    />
                    {errPassword && (
                      <p className="text-red-500 text-sm font-semibold pt-1">
                        <span className="italic mr-1">!</span>
                        {errPassword}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="font-medium pb-1">Re-enter New Password</p>
                    <input
                      onChange={handleCPassword}
                      value={cPassword}
                      type="password"
                      className="border rounded-sm border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md"
                    />
                    {errCPassword && (
                      <p className="text-red-500 text-sm font-semibold pt-1">
                        <span className="italic mr-1">!</span>
                        {errCPassword}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 mb-4">
                  Passwords must be at least 6 characters.
                </p>
                <button
                  onClick={handleUserInfoChange}
                  className="button border text-[17px] font-medium w-full mb-2"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="absolute w-full h-screen -z-10 flex items-center justify-center -mt-20 text-xl font-bold text-center">
          <p>
            Please{" "}
            <span
              className="text-yellow-500 underline cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              sign in
            </span>{" "}
            to see your information.
          </p>
        </div>
      )}
      {/* <Footer /> */}
      <Toaster richColors closeButton position="top-right" />
    </div>
  );
};

export default Userinfo;
