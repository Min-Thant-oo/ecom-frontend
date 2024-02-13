// import Image from "next/legacy/image";
// import logo from "../../images/logo.png";
// import {
//   Bars3Icon,
//   MagnifyingGlassIcon,
//   MapPinIcon,
//   ShoppingCartIcon,
// } from "@heroicons/react/24/outline";
// import {
//   RiArrowDropDownFill,
//   RiAccountCircleFill,
//   RiArrowRightSLine,
//   RiArrowDownSLine,
//   RiCloseFill,
// } from "react-icons/ri";
// import { useRouter } from "next/router";
// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaHeart } from "react-icons/fa";
// import axios from "axios";
// import { Toaster } from "sonner";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setUsername,
//   clearUsername,
//   setFavourites,
//   clearFavourite,
//   setCategories,
//   fetchUserFavouritesAsync,
//   fetchUserNameAsync,
//   fetchCategoryAsync,
//   selectFavourites,
//   selectItems,
//   selectUsername,
//   selectCategories,
// } from "@/slices/amazonSlice";
// import favourites from "@/pages/favourites";

// const Header = ({
//   selectedCategory,
//   setSelectedCategory,
//   searchTerm,
//   setSearchTerm,
// }) => {

//   const products = useSelector(selectItems);
//   const fav = useSelector(selectFavourites);
//   const name = useSelector(selectUsername);
//   const dispatch = useDispatch();
//   const ref = useRef();

//   const [showAll, setShowAll] = useState(false);
//   const [sideBar, setSideBar] = useState(false);

//   // const [selectedCategory, setSelectedCategory] = useState(null);
//   // const [searchTerm, setSearchTerm] = useState("");

//   // const [hselectedCategory, sethSelectedCategory] = useState(null);
//   // const [hsearchTerm, sethSearchTerm] = useState("");

//   const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
//   const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

//   const router = useRouter();

//   // const [username, setUsername] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);

//   const user_id = localStorage.getItem("user_id");
//   const api_token = localStorage.getItem("api_token");
//   // const username = localStorage.getItem("user_info");

//   const handleSidebarSearch = (category) => {
//     // setSelectedCategory(selectedCategory ?? null)
//     // setSelectedCategory(category ? category.slug : null);
//     // sethSelectedCategory(category);
//     // setSideBar(false);
//     // setSelectedCategory()
//   };

//   const handleCategoryClick = (category) => {
//     // sethSelectedCategory(category);
//     setShowAll(false);
//   };

//   const handleSearch = () => {
//     const encodedSearchQuery = encodeURI(searchTerm || '')
//     const encodedSearchCategory = encodeURI(selectedCategory?.name || '')
//     router.push(`/search?q=${encodedSearchQuery}&category=${encodedSearchCategory}`);
//     setSearchTerm(searchTerm ?? null);
//     setSelectedCategory(selectedCategory ? selectedCategory : null);
//   };

//   // const handleSearch = () => {
//   //   // Redirect to the home page ("/") with search parameters as state
//   //   router.push('/', undefined, { shallow: true, state: { setSearchTerm: hsearchTerm? hsearchTerm : null, setSelectedCategory: hselectedCategory ? hselectedCategory.slug : null } });
//   // };

//   // sidebar close
//   useEffect(() => {
//     document.body.addEventListener("click", (e) => {
//       if (e.target.contains(ref.current)) {
//         setSideBar(false);
//       }
//     });
//   }, [ref]);

//   // logout function
//   async function logOut() {
//     const confirmLogout = window.confirm("Are you sure you want to log out?");

//     if (confirmLogout) {
//       try {
//         const response = await axios.post(
//           `${baseApiRoute}/signout`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${api_token}`,
//             },
//           }
//         );
//         // if(response) {
//         // console.log(response.data);
//         dispatch(clearUsername());
//         localStorage.clear();
//         router.push("/");
//         window.location.reload();
//         toast.success("Successfully Signed Out");
//         // }
//       } catch (error) {
//         // alert(error.message);

//         console.error("Axios Error:", error);

//         // Alert the error message
//         alert(error.message);
//       }
//     }
//   }

//   // User's favourite fetching
//   useEffect(() => {
//     if (user_id) {
//       dispatch(fetchUserFavouritesAsync({ api_token }))
//         .unwrap()
//         .then((userFavourites) => {
//           dispatch(setFavourites(userFavourites.map((f) => f.id)));
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching user favourites:", error);
//           setLoading(false);
//         });
//     } else {
//       dispatch(clearFavourite());
//     }
//   }, [user_id, api_token, dispatch]);

//   // user name fetching
//   useEffect(() => {
//     if (api_token) {
//       dispatch(fetchUserNameAsync({ api_token }))
//         .unwrap()
//         .then((name) => {
//           dispatch(setUsername(name));
//           // setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching user name:", error);
//           // setLoading(false);
//         });
//     } else {
//       dispatch(clearUsername());
//     }
//   }, [user_id, api_token, dispatch]);

//   // Categories Fetching
//   useEffect(() => {
//     async function getCategories() {
//       try {
//         const response = await axios.get(`${baseApiRoute}/getcategories`);
//         setCategories(response.data.category);
//         // console.log(response.data.category)
//       } catch (error) {
//         alert(error);
//       }
//     }
//     getCategories();
//   }, []);

//   return (
//     <header>
//       {/* Top nav */}
//       <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
//         <div className="flex items-center mt-2 flex-grow sm:flex-grow-0 ">
//           <Image
//             onClick={() => router.push("/")}
//             src={logo}
//             priority={true}
//             width={150}
//             height={40}
//             objectFit="contain"
//             className="cursor-pointer"
//             alt="logo"
//           />
//         </div>
//         <div className="relative hidden sm:flex mx-5 items-center cursor-pointer text-white text-sm whitespace-pre-wrap ">
//           <MapPinIcon className="absolute h-5 mt-4 -ml-5" />
//           <p className="flex flex-col">
//             Deliver to <span className="font-bold">Turkey</span>
//           </p>
//         </div>

//         {/* Search */}
//         <div className="hidden sm:flex relative items-center h-10 rounded-md flex-grow cursor-pointer ">
//           <span
//             onClick={() => setShowAll(!showAll)}
//             className="flex flex-row items-center justify-center bg-gray-100 h-10 rounded-l-md my-auto pl-2 text-gray-500"
//           >
//             {selectedCategory
//               ? selectedCategory.slice(0, 7) +
//                 (selectedCategory.length > 7 ? "..." : "")
//               : "All"}
//             <span className="text-2xl font-bold">
//               <RiArrowDropDownFill />
//             </span>
//           </span>

//           {showAll && (
//             <div>
//               <ul className="absolute w- h- top-9 left-0.5 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black flex flex-col gap-1 z-50">
//                 <li
//                   onClick={() => {
//                     setShowAll(false);
//                     // Reset selected category to null when "All" is clicked
//                     handleCategoryClick(null);
//                   }}
//                   className={`px-1 cursor-pointer ${
//                     selectedCategory === null
//                       ? "bg-blue-500 text-white"
//                       : "hover:bg-blue-500 hover:text-white"
//                   }`}
//                 >
//                   All
//                 </li>
//                 {categories.map((category) => (
//                   <li
//                     key={category.id}
//                     onClick={() => {
//                       setShowAll(false);
//                       handleCategoryClick(category);
//                     }}
//                     className={`px-1 cursor-pointer ${
//                       selectedCategory === category
//                         ? "bg-blue-500 text-white"
//                         : "hover:bg-blue-500 hover:text-white"
//                     }`}
//                   >
//                     {category.name}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <input
//             onChange={(e) => sethSearchTerm(e.target.value)}
//             type="text"
//             className="p-2 h-full w-6 flex-grow flex-shrink  focus:outline-none"
//           />
//           <MagnifyingGlassIcon
//             onClick={handleSearch}
//             className="h-10 p-2 rounded-r-md bg-yellow-500 hover:bg-yellow-500"
//           />
//         </div>

//         {/* Right */}
//         <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
//           <div
//             onClick={
//               name
//                 ? () => router.push("/userinfo")
//                 : () => router.push("/signin")
//             }
//             className="link hidden sm:block"
//           >
//             <p className="hover:underline">
//               {/* {name != null ? `Hello, ${name}` : "Hello, Sign In"} */}
//               {api_token != null ? `Hello, ${name || 'Loading...'}` : 'Hello, Sign In'}
//             </p>

//             <p className="font-extrabold md:text-sm">Account & Settings</p>
//           </div>

//           <div
//             onClick={() => router.push("/favourites")}
//             className="relative link items-center  flex "
//           >
//             <span className="absolute -top-2 md:-top-1 -right-3 h-4 w-4 bg-yellow-500 rounded-full text-center text-black font-bold">
//               {fav.length}
//             </span>
//             <p className="font-extrabold md:text-sm md:mt-0">Fav</p>
//           </div>

//           <div
//             onClick={() => router.push("/orders")}
//             className="link items-center justify-center flex "
//           >
//             <p className="font-extrabold md:text-sm">Orders</p>
//           </div>

//           <div
//             onClick={() => router.push("/checkout")}
//             className="relative link flex items-center"
//           >
//             <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-500 rounded-full text-center text-black font-bold">
//               {products.length}
//             </span>
//             <ShoppingCartIcon className="h-10" />
//             <p className="hidden md:block font-extrabold md:text-sm mt-2">
//               Basket
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Bottom nav */}
//       <div className="relative flex items-center space-x-2 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
//         <p
//           onClick={() => setSideBar(!sideBar)}
//           className="link flex items-center"
//         >
//           <Bars3Icon className="h-6 mr-1" />
//           All
//         </p>

//         {categories?.slice(0, 11).map((category, index) => (
//           <p
//             onClick={() => handleSidebarSearch(category)}
//             key={category.id}
//             className={" hidden lg:flex"}
//           >
//             <span className="mr-2 -mt-1">{"."}</span>
//             <span
//               className={`link ${
//                 selectedCategory === category.name
//                   ? "text-yellow-500 underline"
//                   : ""
//               }`}
//             >
//               {category.name}
//             </span>
//           </p>
//         ))}

//         <div>
//           {name && (
//             <p onClick={logOut} className="link text-orange-600">
//               Sign Out
//             </p>
//           )}
//         </div>
//       </div>
//       <AnimatePresence>
//         {sideBar && (
//           <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-80 z-40">
//             <div className="w-full h-full relative">
//               <motion.div
//                 ref={ref}
//                 initial={{ x: -500, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: -500, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="w-[360px] h-full bg-white border border-black overflow-y-scroll overflow-x-hidden"
//               >
//                 <div
//                   onClick={
//                     name
//                       ? () => router.push("/userinfo")
//                       : () => router.push("/signin")
//                   }
//                   className="cursor-pointer"
//                 >
//                   {name ? (
//                     <div className="w-full bg-amazon_blue-light text-white text-xl font-bold py-3 px-8 flex items-center gap-3">
//                       <Image
//                         src="https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/hm2ffv5fk9wz0xcu4gox/create-customized-cute-profile-avatar-of-you.png"
//                         alt="p"
//                         className="rounded-full"
//                         objectFit="contain"
//                         width={40}
//                         height={40}
//                       />
//                       {name}
//                     </div>
//                   ) : (
//                     <div className="w-full bg-amazon_blue-light text-white text-xl font-bold py-3 px-8 flex items-center gap-2 ">
//                       <RiAccountCircleFill className="text-3xl" />
//                       <h3>Hello, Sign In</h3>
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   {/* <h3 className="text-lg font-bold px-8 pt-4 pb-1">
//                     Categories
//                   </h3> */}
//                   <ul className="font-semibold ">
//                     {categories?.map((category) => (
//                       <li
//                         onClick={() => handleSidebarSearch(category)}
//                         className={`group border-b py-5 ${
//                           hselectedCategory?.name === category.name
//                             ? " bg-gray-200"
//                             : ""
//                         }`}
//                         key={category.id}
//                       >
//                         <p>{category.name}</p>
//                         <span>
//                           <RiArrowRightSLine
//                             className={`text-2xl ${
//                               hselectedCategory?.name === category.name
//                                 ? "text-black"
//                                 : "text-gray-400"
//                             } group-hover:text-black`}
//                           />
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <span
//                   onClick={() => setSideBar(!sideBar)}
//                   className="absolute cursor-pointer text-[36px] text-white top-4 left-[365px]"
//                 >
//                   <RiCloseFill />
//                 </span>
//               </motion.div>
//             </div>
//           </div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

import Image from "next/legacy/image";
import logo from "../../images/logo.png";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import {
  RiArrowDropDownFill,
  RiAccountCircleFill,
  RiArrowRightSLine,
  RiArrowDownSLine,
  RiCloseFill,
} from "react-icons/ri";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  clearUsername,
  setFavourites,
  clearFavourite,
  fetchUserFavouritesAsync,
  fetchUserNameAsync,
  selectFavourites,
  selectItems,
  selectUsername,
  selectUserImage,
} from "@/slices/amazonSlice";
import favourites from "@/pages/favourites";
import Link from "next/link";

const Header = ({ a, searchCateogry }) => {
  const products = useSelector(selectItems);
  const fav = useSelector(selectFavourites);
  const name = useSelector(selectUsername);
  const profilePicture = useSelector(selectUserImage);
  const dispatch = useDispatch();
  const ref = useRef();

  const [showAll, setShowAll] = useState(false);
  const [sideBar, setSideBar] = useState(false);

  const [hsearchTerm, sethSearchTerm] = useState("");
  const [hselectedCategory, sethSelectedCategory] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("");

  const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
  const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

  const router = useRouter();

  // const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const user_id = localStorage.getItem("user_id");
  const api_token = localStorage.getItem("api_token");
  // const username = localStorage.getItem("user_info");

  useEffect(() => {
    sethSearchTerm(a ?? "");
  }, [a, name]);

  useEffect(() => {
    // console.log(hsearchTerm);
  }, [hsearchTerm]);

  // Username Fetching
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       if (api_token) {
  //         const response = await axios.get(`${baseApiRoute}/userinfo`, {
  //           headers: {
  //             Authorization: `Bearer ${api_token}`,
  //           },
  //         });
  //         // dispatch(setUsername({
  //         //   name: response.data.user.name,
  //         // }))
  //         setUsername(response.data.user.name);
  //         // setUsername(name)
  //       } else {
  //         // Handle the case when there is no api_token (user is not logged in)
  //         setUsername(""); // Set username to an empty string or any default value
  //       }
  //     } catch (error) {
  //       // console.error('Error fetching user info:', error);
  //       setUsername("");
  //     }
  //   }

  //   fetchData();
  // }, [api_token]);

  const handleSidebarSearch = (category) => {
    // setSelectedCategory(category ? category.slug : null);
    sethSelectedCategory(category);
    setSelectedCategory(category);
    setSideBar(false);
  };

  // new, category click search
  useEffect(() => {
    if (selectedCategory) {
      const encodedSearchQuery = encodeURI(hsearchTerm ?? "");
      const encodedSearchCategory = encodeURI(selectedCategory?.slug ?? "");
      console.log({ encodedSearchCategory });
      router.push(
        `/search?q=${encodedSearchQuery}&category=${encodedSearchCategory}`
      );
    }
  }, [selectedCategory]);

  // new, category click search

  const handleCategoryClick = (category) => {
    sethSelectedCategory(category);
    setShowAll(false);
  };

  const handleSearch = () => {
    // setSearchTerm(hsearchTerm ?? null)
    // setSelectedCategory(hselectedCategory ? hselectedCategory.name : null);
    const encodedSearchQuery = encodeURI(hsearchTerm ?? "");
    const encodedSearchCategory = encodeURI(hselectedCategory?.slug ?? "");
    router.push(
      `/search?q=${encodedSearchQuery}&category=${encodedSearchCategory}`
    );

    // sethSelectedCategory(selectedCategory ? selectedCategory : null);
    // sethSearchTerm(searchTerm ?? null);
  };

  // const handleSearch = () => {
  //   setSearchTerm(hsearchTerm ?? null);
  //   // console.log(searchTerm)
  //   setSelectedCategory(hselectedCategory ? hselectedCategory.slug : null);
  //   // console.log(selectedCategory)
  // };

  // sidebar close
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSideBar(false);
      }
    });
  }, [ref]);

  // logout function
  async function logOut() {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      try {
        const response = await axios.post(
          `${baseApiRoute}/signout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${api_token}`,
            },
          }
        );
        // if(response) {
        // console.log(response.data);
        localStorage.clear();
        router.push("/");
        window.location.reload();
        toast.success("Successfully Signed Out");
        // }
      } catch (error) {
        // alert(error.message);

        console.error("Axios Error:", error);

        // Alert the error message
        alert(error.message);
      }
    }
  }

  // User's favourite fetching
  useEffect(() => {
    if (user_id) {
      dispatch(fetchUserFavouritesAsync({ api_token }))
        .unwrap()
        .then((userFavourites) => {
          // console.log({ userFavourites });
          dispatch(setFavourites(userFavourites));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user favourites:", error);
          setLoading(false);
        });
    } else {
      dispatch(clearFavourite());
    }
  }, [user_id, api_token, dispatch]);

  //   // user name fetching
  useEffect(() => {
    if (api_token) {
      dispatch(fetchUserNameAsync({ api_token }))
        .unwrap()
        .then((name) => {
          dispatch(setUsername(name.name));
          // setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user name:", error);
          // setLoading(false);
        });
    } else {
      dispatch(clearUsername());
    }
  }, [user_id, api_token, dispatch, name, setUsername, selectUsername]);

  // Categories Fetching
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(`${baseApiRoute}/getcategories`);
        setCategories(response.data.category);
      } catch (error) {
        alert(error);
      }
    }
    getCategories();
  }, []);

  useEffect(() => {
    if (searchCateogry) {
      categories.map((cat) => {
        if (cat.slug == searchCateogry) {
          handleCategoryClick(cat);
        }
      });
    } else {
      handleCategoryClick(null);
    }
  }, [searchCateogry, categories]);

  return (
    <header>
      {/* Top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <Link href={"/"}>
          <div className="flex items-center mt-2 flex-grow sm:flex-grow-0 ">
            <Image
              // onClick={() => router.push("/")}
              src={logo}
              priority={true}
              width={150}
              height={40}
              objectFit="contain"
              className="cursor-pointer"
              alt="logo"
            />
          </div>
        </Link>
        <div className="relative hidden sm:flex mx-5 items-center cursor-pointer text-white text-sm whitespace-pre-wrap ">
          <MapPinIcon className="absolute h-5 mt-4 -ml-5" />
          <p className="flex flex-col">
            Deliver to <span className="font-bold">Turkey</span>
          </p>
        </div>

        {/* Search */}
        <div className="hidden sm:flex relative items-center h-10 rounded-md flex-grow cursor-pointer ">
          <span
            onClick={() => setShowAll(!showAll)}
            className="flex flex-row items-center justify-center bg-gray-100 h-10 rounded-l-md my-auto pl-2 text-gray-500"
          >
            {hselectedCategory
              ? hselectedCategory?.name.slice(0, 7) +
                (hselectedCategory?.name.length > 7 ? "..." : "")
              : "All"}

            {/* {hselectedCategory
              ? hselectedCategory?.name.slice(0, 7) +
                (hselectedCategory?.name.length > 7 ? "..." : "")
              : b
                ? b
                : "All"
            } */}
            <span className="text-2xl font-bold">
              <RiArrowDropDownFill />
            </span>
          </span>

          {showAll && (
            <div>
              <ul className="absolute w- h- top-9 left-0.5 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black flex flex-col gap-1 z-50">
                <li
                  onClick={() => {
                    setShowAll(false);
                    // Reset selected category to null when "All" is clicked
                    handleCategoryClick(null);
                  }}
                  // className={`px-1 cursor-pointer ${
                  //   hselectedCategory === null
                  //     ? "bg-blue-500 text-white"
                  //     : "hover:bg-blue-500 hover:text-white"
                  // }`}
                >
                  All
                </li>
                {categories.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => {
                      setShowAll(false);
                      handleCategoryClick(category);
                    }}
                    className={`px-1 cursor-pointer ${
                      hselectedCategory === category
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <input
            onChange={(e) => sethSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSearch();
              }
            }}
            value={hsearchTerm}
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink  focus:outline-none"
          />
          <MagnifyingGlassIcon
            onClick={handleSearch}
            className="h-10 p-2 rounded-r-md bg-yellow-500 hover:bg-yellow-500"
          />
        </div>

        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <Link href={name ? "/userinfo" : "/signin"}>
            <div
              // onClick={
              //   name
              //     ? () => router.push("/userinfo")
              //     : () => router.push("/signin")
              // }
              className="link hidden sm:block"
            >
              <p className="hover:underline">
                {/* {username ? `Hello, ${username}` : "Hello, Sign In"} */}
                {/* {username !== null
                ? `Hello, ${username || "Sign In"}`
                : "Loading..."} */}
                {name != null
                  ? `Hello, ${name || "Loading..."}`
                  : "Hello, Sign In"}
              </p>

              <p className="font-extrabold md:text-sm">Account & Settings</p>
            </div>
          </Link>

          <Link href={"/favourites"}>
            <div
              // onClick={() => router.push("/favourites")}
              className="relative link items-center  flex "
            >
              <span className="absolute -top-2 md:-top-1 -right-3 h-4 w-4 bg-yellow-500 rounded-full text-center text-black font-bold">
                {fav.length}
              </span>
              <p className="font-extrabold md:text-sm md:mt-0">Fav</p>
            </div>
          </Link>

          <Link href={"/orders"}>
            <div
              // onClick={() => router.push("/orders")}
              className="link items-center justify-center flex "
            >
              <p className="font-extrabold md:text-sm">Orders</p>
            </div>
          </Link>

          <Link href={"/checkout"}>
            <div
              // onClick={() => router.push("/checkout")}
              className="relative link flex items-center"
            >
              <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-500 rounded-full text-center text-black font-bold">
                {products.length}
              </span>
              <ShoppingCartIcon className="h-10" />
              <p className="hidden md:block font-extrabold md:text-sm mt-2">
                Basket
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="relative flex items-center space-x-2 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p
          onClick={() => setSideBar(!sideBar)}
          className="link flex items-center"
        >
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>

        {categories?.slice(0, 11).map((category, index) => (
          <p
            onClick={() => handleSidebarSearch(category)}
            key={category.id}
            className={" hidden lg:flex"}
          >
            <span className="mr-2 -mt-1">{"."}</span>
            <span
              className={`link ${
                hselectedCategory?.name === category.name
                  ? "text-yellow-500 underline"
                  : ""
              }`}
            >
              {category.name}
            </span>
          </p>
        ))}

        <div>
          {name && (
            <p onClick={logOut} className="link text-orange-600">
              Sign Out
            </p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {sideBar && (
          <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-80 z-40">
            <div className="w-full h-full relative">
              <motion.div
                ref={ref}
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -500, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-[360px] h-full bg-white border border-black overflow-y-scroll overflow-x-hidden"
              >
                <div
                  onClick={
                    name
                      ? () => router.push("/userinfo")
                      : () => router.push("/signin")
                  }
                  className="cursor-pointer"
                >
                  {name ? (
                    <div className="w-full bg-amazon_blue-light text-white text-xl font-bold py-3 px-8 flex items-center gap-3">
                      <Image
                        src={
                          profilePicture
                            ? `${imageRoute}/${profilePicture}`
                            : "https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/hm2ffv5fk9wz0xcu4gox/create-customized-cute-profile-avatar-of-you.png"
                        }
                        alt="p"
                        className="rounded-full"
                        objectFit="cover"
                        width={40}
                        height={40}
                      />
                      {name}
                    </div>
                  ) : (
                    <div className="w-full bg-amazon_blue-light text-white text-xl font-bold py-3 px-8 flex items-center gap-2 ">
                      <RiAccountCircleFill className="text-3xl" />
                      <h3>Hello, Sign In</h3>
                    </div>
                  )}
                </div>

                <div>
                  {/* <h3 className="text-lg font-bold px-8 pt-4 pb-1">
                    Categories
                  </h3> */}
                  <ul className="font-semibold ">
                    {categories?.map((category) => (
                      <li
                        onClick={() => handleSidebarSearch(category)}
                        className={`group border-b py-5 ${
                          hselectedCategory?.name === category.name
                            ? " bg-gray-200"
                            : ""
                        }`}
                        key={category.id}
                      >
                        <p>{category.name}</p>
                        <span>
                          <RiArrowRightSLine
                            className={`text-2xl ${
                              hselectedCategory?.name === category.name
                                ? "text-black"
                                : "text-gray-400"
                            } group-hover:text-black`}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <span
                  onClick={() => setSideBar(!sideBar)}
                  className="absolute cursor-pointer text-[36px] text-white top-4 left-[365px]"
                >
                  <RiCloseFill />
                </span>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
