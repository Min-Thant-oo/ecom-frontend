// import Image from "next/legacy/image";
// import React, { useEffect, useState } from "react";
// import { StarIcon } from "@heroicons/react/24/solid";
// import Currency from "react-currency-formatter";
// import prime from "../../images/prime.png";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addToCart,
//   updateCartOnSignIn,
//   selectItems,
//   clearCart,
//   addToFavourite,
//   UploadingFavorites,
//   addToFavouriteAsync,
//   removeFromFavouriteAsync,
//   fetchUserFavouritesAsync,
// } from "@/slices/amazonSlice";
// import Link from "next/link";
// import { FaHeart } from "react-icons/fa";
// import { toast } from "sonner";

// const Product = ({ id, title, price, description, category, image, src }) => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const itemsInCart = useSelector(selectItems);

//   const [isFavourite, setIsFavourite] = useState(false);

//   let api_token = localStorage.getItem("api_token");
//   const user_id = localStorage.getItem("user_id");

//   const handleImageClick = () => {
//     // You can pass the details as query parameters
//     router.push({
//       pathname: `/${id}`,
//       query: {
//         title,
//         price,
//         description,
//         category,
//         image,
//         src,
//       },
//     });
//   };

//   const handleAddToFavourite = () => {
//     dispatch(addToFavouriteAsync({ user_id, product_id: id, api_token }))
//       .unwrap()
//       .then(() => {
//         setIsFavourite(true);
//         toast.success("Added to Favourite");
//       })
//       .catch((error) => {
//         console.error("Error adding to favourites:", error);
//         // Handle error, show toast, etc.
//       });
//   };

//   const handleRemoveFromFavourite = () => {
//     dispatch(removeFromFavouriteAsync({ user_id, product_id: id, api_token }))
//       .unwrap()
//       .then(() => {
//         setIsFavourite(false);
//         toast.success("Removed from Favourite");
//       })
//       .catch((error) => {
//         console.error("Error removing from favourites:", error);
//         // Handle error, show toast, etc.
//       });
//   };

//   if (user_id) {
//     useEffect(() => {
//         dispatch(fetchUserFavouritesAsync({ api_token }))
//           .unwrap()
//           .then((favourites) => {
//             setIsFavourite(favourites.some((product) => product.id === id));
//           })
//           .catch((error) => {
//             console.error("Error fetching user favourites:", error);
//             // Handle error, show toast, etc.
//           });
//     }, [dispatch, api_token]);
//   }

//   return (
//     <div className="relative flex flex-col m-5 bg-white z-30 p-10">
//       <FaHeart
//         onClick={() => {
//           if (!api_token) {
//             toast.error("Please sign in");
//           } else {
//             isFavourite ? handleRemoveFromFavourite() : handleAddToFavourite();
//           }
//         }}


//         className={`absolute top-2 left-2 cursor-pointer ${
//           isFavourite ? "text-yellow-500" : "text-gray-600"
//         }`}
//       />

//       <p className="absolute -top-2 right-2 text-xs italic text-gray-400 my-3">
//         {category}
//       </p>

//       <div onClick={handleImageClick} className="cursor-pointer">
//         <img
//           src={src}
//           width={200}
//           height={200}
//           style={{ objectFit: "contain", paddingBottom: "13px" }}
//           alt="img"
//         />
//       </div>

//       <h4>{title}</h4>

//       <p className="text-sm my-2 line-clamp-2">{description}</p>

//       <div className="mb-5">
//         {/* currency is USD by default */}
//         <Currency quantity={price} />
//       </div>

//       <button
//         onClick={() => {
//           dispatch(
//             addToCart({
//               id,
//               title,
//               description,
//               price,
//               category,
//               image: "http://localhost:8000/storage/" + image,
//               src,
//               quantity: 1,
//             })
//           );
//           toast.success("Added to Basket");
//         }}
//         className="mt-auto button"
//       >
//         Add to Basket
//       </button>
//     </div>
//   );
// };

// export default Product;












































// import Header from "@/components/Header";
// import Footer from "@/components/footer/Footer";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import Currency from "react-currency-formatter";
// import { useDispatch } from "react-redux";
// import { addToCart } from "@/slices/amazonSlice";
// import { toast } from "sonner";
// import axios from "axios";
// import { Toaster } from 'sonner';
// import { ScaleLoader } from "react-spinners";

// const DynamicPage = () => {
//   const [product, setProduct] = useState({});
//   const [user_id, setuser_id] = useState("");
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isLoading, setIsLoading] = useState(true)

//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { id } = router.query;

//   let api_token = localStorage.getItem("api_token");
//   useEffect(() => {
//     const storedUser_id = localStorage.getItem("user_id");
//     if (storedUser_id) {
//       setuser_id(storedUser_id);
//     }
//   }, []);

//   setTimeout(() => {
//     setIsLoading(false)
//   }, 1500);

//   // useEffect(() => {
//   //   setProduct(router.query);
//   // }, [router.query]);

//   useEffect(() => {
//     const handleImageClick = async() => {
//       try {
//         if(id) {
//           const response = await axios.get('http://127.0.0.1:8000/api/${id}', {
//             headers: {
//                 Authorization: `Bearer ${api_token}`,
//             },
//           });
//         }
//         setProduct(response.data.product)
//       } catch (error) {
//           console.error(error);
//       }

//     };
//     handleImageClick()
//   }, [id])
  


//   useEffect(() => {
//     async function handleGetUserFavouriteProduct() {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/api/getfavourite",
//           {
//             headers: {
//               Authorization: `Bearer ${api_token}`,
//               Accept: "application/json",
//             },
//           }
//         );
//         // console.log(response.data.userfavourites);
//         const userFavourites = response.data.favourites;
//         // Check if the current product is in the user's favourites
//         setIsFavorite(
//           userFavourites.some((favProduct) => favProduct.id == product.id)
//         );
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     handleGetUserFavouriteProduct();
//   }, [product.id]);

//   async function handleAddToFavourite(productId) {
//     const formData = new FormData();
//     formData.append("user_id", user_id);
//     formData.append("product_id", productId);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/favourite",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${api_token}`,
//           },
//         }
//       );
//       // console.log(response.data.message);
//       setIsFavorite(true);
//       toast.success("Added to Favourite");
//     } catch (error) {
//       console.error("Error adding to favourites:", error.response.data);
//     }
//   }

//   async function handleRemoveFromFavourite(productId) {
//     const formData = new FormData();
//     formData.append("user_id", user_id);
//     formData.append("product_id", productId);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/removefromfavourite",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${api_token}`,
//           },
//         }
//       );
//       // console.log(response.data.message);
//       setIsFavorite(false);
//       toast.success("Removed from Favourite");
//     } catch (error) {
//       console.error("Error adding to favourites:", error.response.data);
//     }
//   }

//   return (
//     <div className="bg-gray-100">
//       <Header />

//       {/* <div className='max-w-screen-xl mx-auto px-4  py-4 md:py-10'>
//             <div className='w-full grid md:grid-cols-3 gap-3 bg-white rounded-lg'>
//                     <div className='relative py-5  flex items-center justify-center  rounded-lg'>
//                         <img src={product.src} alt="Product Image" width={250} height={250} />
//                             <div className='absolute top-7 left-7 cursor-pointer text-2xl'>
//                             <FaHeart />
//                             </div>
//                     </div>
//                     <div className=' mx-5'>
//                         <p className='font-medium'>{product.title}</p>
                        
//                         <p className='text-sm my-2 line-clamp-3 text-justify'>{product.description}</p>
                        
//                         <div className='flex justify-between'>
//                             <p>Unit price : <span className='font-semibold'><Currency quantity={parseFloat(product.price)}/></span></p>
//                         </div>

//                         <div className='flex space-x-16 mt-3'>
//                             <div className='flex flex-col space-y-2 my-auto '>
                                
//                                 <button
//                                     onClick={() => dispatch(removeFromCart(item.id))} 
//                                     className='bg-red-500 text-white flex justify-center items-center gap-3 px-2 py-2 mb-2 hover:bg-red-700 active:bg-red-900 drop-shadow-lg rounded-md'>Delete item</button>
//                             </div>
//                         </div>
                        
//                     </div>
//             </div>
//         </div> */}

//       <div className="flex flex-col p-5 space-y-10 bg-white m-5 shadow-sm">
//         { isLoading 
//             ?   <div className="w-full flex flex-col gap-6 items-center justify-center py-20 text-xl font-bold">
//                     <p>The product is loading...</p>
//                     <ScaleLoader color="#F59E0B" size={40} />
//                 </div>
//             : <div className="flex gap-5  border place-items-center pt-5 pb-10 mb- pl-16">
//                 <div className="">
//                 <img src={product.src} alt="shit" height={200} width={200} className="pt-5 object-contain relative" />
//                 {/* <FaHeart
//                     onClick={() => {
//                     if (!api_token) {
//                         toast.error("Please sign in");
//                     } else {
//                         isFavorite
//                         ? handleRemoveFromFavourite(product.id)
//                         : handleAddToFavourite(product.id);
//                     }
//                     }}
//                     className={`absolute top-2 left-2 text-2xl cursor-pointer ${
//                     isFavorite ? "text-yellow-500" : "text-gray-600"
//                     }`}
//                 /> */}
//                 </div>
//                 {/* Middle */}
//                 <div className="col-span-4 mx-5 flex flex-col gap-4">
//                 <p className="font-medium">{product.title}</p>
    
//                 <p className="text-sm my-2 line-clamp-3 text-justify">
//                     {product.description}
//                 </p>
    
//                 {/* <div className='flex justify-between'> */}
//                 <p>
//                     Unit price :{" "}
//                     <span className="font-semibold">
//                     <Currency quantity={parseFloat(product.price)} />
//                     </span>
//                 </p>
//                 {/* </div> */}
//                 <div>
//                     <button
//                     onClick={() => {
//                         if(!api_token) {
//                             toast.error('Please sign in')
//                         } else {
//                             isFavorite
//                                 ? handleRemoveFromFavourite(product.id)
//                                 : handleAddToFavourite(product.id);
//                         }
//                     }}
//                     className="bg-green-500 w-48 text-white flex justify-center items-center gap-3 px-2 py-2 mb-2 hover:bg-green-700 active:bg-green-900 drop-shadow-lg rounded-md"
//                     >
//                     {isFavorite ? 'Remove from Favourite' : 'Add to Favourite'}
//                     </button>
//                     <button
//                     onClick={() => {
//                         dispatch(
//                         addToCart({
//                             id: product.id,
//                             title: product.title,
//                             description: product.description,
//                             price: product.price,
//                             category: product.category,
//                             image: product.src,
//                             quantity: 1,
//                         })
//                         );
//                         toast.success("Successfully Added to Basket");
//                     }}
//                     className="bg-yellow-500 w-48 text-white flex justify-center items-center gap-3 px-2 py-2 mb-2 hover:bg-yellow-700 active:bg-yellow-900 drop-shadow-lg rounded-md"
//                     >
//                     Add to Basket
//                     </button>
//                 </div>
//                 </div>
//           </div>
//         }
//       </div>

//       <Footer />
//       <Toaster richColors closeButton position='top-right' />
//     </div>
//   );
// };

// export default DynamicPage;



// import Header from "@/components/Header";
// import Footer from "@/components/footer/Footer";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import Currency from "react-currency-formatter";
// import { useDispatch } from "react-redux";
// import { addToCart } from "@/slices/amazonSlice";
// import { toast } from "sonner";
// import axios from "axios";
// import { Toaster } from 'sonner';
// import { ScaleLoader } from "react-spinners";

// const DynamicPage = () => {
//   const [product, setProduct] = useState({});
//   const [user_id, setuser_id] = useState("");
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isLoading, setIsLoading] = useState(true)

//   const router = useRouter();
//   const dispatch = useDispatch();

//   let api_token = localStorage.getItem("api_token");
//   useEffect(() => {
//     const storedUser_id = localStorage.getItem("user_id");
//     if (storedUser_id) {
//       setuser_id(storedUser_id);
//     }
//   }, []);

//   setTimeout(() => {
//     setIsLoading(false)
//   }, 1500);

//   useEffect(() => {
//     setProduct(router.query);
//   }, [router.query]);

//   useEffect(() => {
//     async function handleGetUserFavouriteProduct() {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/api/getfavourite",
//           {
//             headers: {
//               Authorization: `Bearer ${api_token}`,
//               Accept: "application/json",
//             },
//           }
//         );
//         // console.log(response.data.userfavourites);
//         const userFavourites = response.data.favourites;
//         // Check if the current product is in the user's favourites
//         setIsFavorite(
//           userFavourites.some((favProduct) => favProduct.id == product.id)
//         );
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     handleGetUserFavouriteProduct();
//   }, [product.id]);

//   async function handleAddToFavourite(productId) {
//     const formData = new FormData();
//     formData.append("user_id", user_id);
//     formData.append("product_id", productId);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/favourite",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${api_token}`,
//           },
//         }
//       );
//       // console.log(response.data.message);
//       setIsFavorite(true);
//       toast.success("Added to Favourite");
//     } catch (error) {
//       console.error("Error adding to favourites:", error.response.data);
//     }
//   }

//   async function handleRemoveFromFavourite(productId) {
//     const formData = new FormData();
//     formData.append("user_id", user_id);
//     formData.append("product_id", productId);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/removefromfavourite",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${api_token}`,
//           },
//         }
//       );
//       setIsFavorite(false);
//       toast.success("Removed from Favourite");
//     } catch (error) {
//       console.error("Error adding to favourites:", error.response.data);
//     }
//   }

//   return (
//     <div className="bg-gray-100">
//       <Header />

//       <div className="flex flex-col p-5 space-y-10 bg-white m-5 shadow-sm">
//         { isLoading 
//             ?   <div className="w-full flex flex-col gap-6 items-center justify-center py-20 text-xl font-bold">
//                     <p>The product is loading...</p>
//                     <ScaleLoader color="#F59E0B" size={40} />
//                 </div>
//             : <div className="flex gap-5  border place-items-center pt-5 pb-10 mb- pl-16">
//                 <div className="">
//                 <img src={product.src} alt="shit" height={200} width={200} className="pt-5 object-contain relative" />
                
//                 </div>
//                 {/* Middle */}
//                 <div className="col-span-4 mx-5 flex flex-col gap-4">
//                 <p className="font-medium">{product.title}</p>
    
//                 <p className="text-sm my-2 line-clamp-3 text-justify">
//                     {product.description}
//                 </p>
    
//                 <p>
//                     Unit price :{" "}
//                     <span className="font-semibold">
//                     <Currency quantity={parseFloat(product.price)} />
//                     </span>
//                 </p>
//                 <div>
//                     <button
//                     onClick={() => {
//                         if(!api_token) {
//                             toast.error('Please sign in')
//                         } else {
//                             isFavorite
//                                 ? handleRemoveFromFavourite(product.id)
//                                 : handleAddToFavourite(product.id);
//                         }
//                     }}
//                     className="bg-green-500 w-48 text-white flex justify-center items-center gap-3 px-2 py-2 mb-2 hover:bg-green-700 active:bg-green-900 drop-shadow-lg rounded-md"
//                     >
//                     {isFavorite ? 'Remove from Favourite' : 'Add to Favourite'}
//                     </button>
//                     <button
//                     onClick={() => {
//                         dispatch(
//                         addToCart({
//                             id: product.id,
//                             title: product.title,
//                             description: product.description,
//                             price: product.price,
//                             category: product.category,
//                             image: product.src,
//                             quantity: 1,
//                         })
//                         );
//                         toast.success("Successfully Added to Basket");
//                     }}
//                     className="bg-yellow-500 w-48 text-white flex justify-center items-center gap-3 px-2 py-2 mb-2 hover:bg-yellow-700 active:bg-yellow-900 drop-shadow-lg rounded-md"
//                     >
//                     Add to Basket
//                     </button>
//                 </div>
//                 </div>
//           </div>
//         }
//       </div>

//       <Footer />
//       <Toaster richColors closeButton position='top-right' />
//     </div>
//   );
// };

// export default DynamicPage;





// Route::get('/{id}', [ProductController::class, 'eachproduct']);
























































// addproduct.js
// import React, { useState, useEffect } from 'react'
// import logodark from '../../images/logodark.png'
// import Image from 'next/legacy/image'
// import { MdArrowRight } from 'react-icons/md';
// import { useRouter } from 'next/router'
// import Header from '@/components/Header';
// import axios from 'axios';

// const addproduct = () => {
 
//     const [api_token, setapi_token] = useState('');
//     useEffect(() => {
//         const storedapi_token = localStorage.getItem('api_token');
//         if (storedapi_token) {
//             setapi_token(storedapi_token);
//         }
//     }, []);


//     const router = useRouter()

//     const [title, setTitle] = useState('') // clientname to title
//     const [description, setDescription] = useState('') // email to description
//     const [price, setPrice] = useState('') //password to price
//     const [category, setCategory] = useState('') // cpassword to category
//     const [file, setFile] = useState('')

//     // Error message starts here
//     const [errTitle, setErrTitle] = useState('')
//     const [errDescription, setErrDescription] = useState('')
//     const [errPrice, setErrPrice] = useState('')
//     const [errCategory, setErrCategory] = useState('')
//     const [errFile, setErrFile] = useState('')
    

//     // Handle function starts here
//     const handleTitle = (e) => {
//         setTitle(e.target.value)
//         setErrTitle('')
//     }
    
//     const handleDescription = (e) => {
//         setDescription(e.target.value)
//         setErrDescription('')
//     }

//     const handlePrice = (e) => {
//         setPrice(e.target.value)
//         setErrPrice('')
//     }

//     const handleCategory = (e) => {
//         setCategory(e.target.value)
//         setErrCategory('')
//     }

//     const handleImage = (e) => {
//         setFile(e.target.files[0])
//         setErrFile('')
//     }


//     // Submit button 
//     async function handleaddproduct (e) {
//         e.preventDefault()
//         if(!title) {
//             setErrTitle('Enter product title')
//         }

//         if(!description) {
//             setErrDescription('Enter product description')
//         }

//         if(!price) {
//             setErrPrice('Enter product price')
//         }

//         if(!category) {
//             setErrCategory('Enter product category')
//         } 

//         if(!file) {
//             setErrFile('Upload product picture')
//         }

//         if (title && description && price && category && file) {
//             const formData = new FormData();
//             formData.append('title', title);
//             formData.append('description', description);
//             formData.append('price', price);
//             formData.append('category', category);
//             formData.append('image', file);
    
//             try {
//                 const response = await axios.post('http://127.0.0.1:8000/api/addproduct', formData, {
//                     headers: {
//                         Authorization: `Bearer ${api_token}`
//                     }
//                 });
    
//                 if (response.status === 201) {
//                     alert('Data has been saved');
//                     router.push('/')
//                 } else {
//                     alert('An error occurred while saving data');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 // alert(error.response.error);
//             }
//         }

//     }



//   return (
//     <div className='w-full'>

//         <Header />

//         <div className='w-full bg-gray-100 pb-10'>
//             <form className='w-[700px] mx-auto flex flex-col items-center'>
//                 {/* <div onClick={() => router.push('/')} className='my-5 cursor-pointer'>
//                     <Image 
//                         src={logodark}
//                         width={150}
//                         height={40}
//                         objectFit='contain'
//                     />    
//                 </div> */}
                
//                 <div className='w-full border border-zinc-200 my-5 px-9 py-6'>
//                     <h2 className='font-medium text-center text-3xl mb-8'>Add Product</h2>
//                     <div className='flex flex-col gap-5'>
//                         <div className=''>
//                             <p className='font-medium pb-1'>Title</p>
//                             <input 
//                                 onChange={handleTitle} 
//                                 value={title}
//                                 type="text" 
//                                 className='border font-medium rounded-sm placeholder:font-normal placeholder:normal-case border-gray-400 px-3 py-2 w-full outline-none focus:drop-shadow-md'
//                             />
//                             {errTitle && (
//                                 <p className='text-red-500 text-sm font-semibold pt-1'>
//                                     <span className='italic mr-1'>!</span> 
//                                     {errTitle}
//                                 </p>
//                             )}
//                         </div>
//                         <div>
//                             <p className='font-medium pb-1'>Description</p>
//                             {/* <input 
//                                 onChange={handleEmail}
//                                 value={email}
//                                 type="email" 
//                                 className='border font-medium lowercase rounded-sm border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md'
//                             /> */}
//                             <textarea onChange={handleDescription} value={description} className='font-medium rounded-sm border-gray-400 focus:drop-shadow-md border px-3 py-2 resize-none outline-none w-full h-28' name="" id="" cols="30" rows="10"></textarea>
//                             {errDescription && (
//                                 <p className='text-red-500 text-sm font-semibold pt-1'>
//                                     <span className='italic mr-1'>!</span> 
//                                     {errDescription}
//                                 </p>
//                             )}
//                         </div>
//                         <div>
//                             <p className='font-medium pb-1'>Price</p>
//                             <input
//                                 onChange={handlePrice}
//                                 value={price}
//                                 type="text"
//                                 className='border font-medium rounded-sm placeholder:normal-case border-gray-400 px-3 py-2 w-full outline-none focus:drop-shadow-md'
//                                 // style={{ fontVariant: 'normal', fontFeatureSettings: "'cpsp', 'ss01'", letterSpacing: '0.25em' }}  
//                             />
//                             {errPrice && (
//                                 <p className='text-red-500 text-sm font-semibold pt-1'>
//                                     <span className='italic mr-1'>!</span> 
//                                     {errPrice}
//                                 </p>
//                             )}
//                         </div>
//                         <div>
//                             <p className='font-medium pb-1'>Category</p>
//                             <input
//                                 onChange={handleCategory}
//                                 value={category}
//                                 type="text"
//                                 className='border font-medium rounded-sm border-gray-400 px-3 py-2 w-full outline-none focus:drop-shadow-md'
//                                 // style={{ fontVariant: 'normal', fontFeatureSettings: "'cpsp', 'ss01'", letterSpacing: '0.25em' }}  
//                             />
//                             {errCategory && (
//                                 <p className='text-red-500 text-sm font-semibold pt-1'>
//                                     <span className='italic mr-1'>!</span> 
//                                     {errCategory}
//                                 </p>
//                             )}
//                         </div>
//                         <div>
//                             <p className='font-medium pb-1'>Image</p>
//                             <input
//                                 onChange={handleImage}
//                                 type="file"
//                                 className='border rounded-sm border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md'
//                                 // style={{ fontVariant: 'normal', fontFeatureSettings: "'cpsp', 'ss01'", letterSpacing: '0.25em' }}  
//                             />
//                             {errFile && (
//                                 <p className='text-red-500 text-sm font-semibold pt-1'>
//                                     <span className='italic mr-1'>!</span> 
//                                     {errFile}
//                                 </p>
//                             )}

//                             {/* {file && (
//                                 <img className='w-[150px] h-16' src={URL.createObjectURL(file)} alt="" />
//                             )} */}
//                         </div>
//                     </div>
//                     {/* <p className=' mt-2 mb-4'>Passwords must be at least 6 characters.</p> */}
//                     <div className='flex flex-col items-center'>
//                         <button
//                             onClick={handleaddproduct}
//                             className='button border text-[17px] font-medium w-full mt-9 mb-7'>Add Product
//                         </button>
//                     </div>
//                     <div className='text-xs mt-2'>
//                         <p 
//                             className='mb-4'>By Continuing, you agree to Amazozn's 
//                             <span className='text-blue-600 cursor-pointer hover:underline'> Conditions of Use</span> and 
//                             <span className='text-blue-600 cursor-pointer hover:underline'> Privacy Notice</span>.
//                         </p>
//                         <p 
//                             className='flex flex-row'>Already have an account? 
//                             <span onClick={() => router.push('/signin')} className='flex items-center justify-center pl-1 cursor-pointer text-blue-600 hover:underline hover:text-red-600'>Sign in 
//                                 <span className='pt-0.5'><MdArrowRight /></span>
//                             </span>
//                         </p>
//                         <p 
//                             className='flex flex-row'>Buying for work? 
//                             <span className='flex items-center justify-center pl-1 cursor-pointer text-blue-600 hover:underline hover:text-red-600'>Create a few business account 
//                                 <span className='pt-0.5'><MdArrowRight /></span>
//                             </span>
//                         </p>
//                     </div>

//                 </div>
//             </form>
//         </div>
//         <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200'>
//             <div className='w-[350px] mx-auto py-9 text-xs text-center'>
//                 <div className='flex items-center justify-center space-x-9 pb-1'>
//                     <p className='text-blue-600 cursor-pointer hover:underline hover:text-red-600'>Conditions of Use</p>
//                     <p className='text-blue-600 cursor-pointer hover:underline hover:text-red-600'>Privacy Notice</p>
//                     <p className='text-blue-600 cursor-pointer hover:underline hover:text-red-600'>Privacy Policy</p>
//                 </div>
//                 <p className=''>© 1996-2023, ReactBd.com, Inc. or its affiliates</p>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default addproduct
























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
//   setFavourites,
//   clearFavourite,
//   fetchUserFavouritesAsync,
//   selectFavourites,
//   selectItems,
//   selectUsername,
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
//   const [hsearchTerm, sethSearchTerm] = useState("");
//   const [hselectedCategory, sethSelectedCategory] = useState(null);

//   const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
//   const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

//   const router = useRouter();

//   const [username, setUsername] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);

//   const user_id = localStorage.getItem("user_id");
//   const api_token = localStorage.getItem("api_token");
//   // const username = localStorage.getItem("user_info");

//   useEffect(() => {
//     // console.log(hsearchTerm);
//   }, [hsearchTerm]);

//   // Username Fetching
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         if (api_token) {
//           const response = await axios.get(`${baseApiRoute}/userinfo`, {
//             headers: {
//               Authorization: `Bearer ${api_token}`,
//             },
//           });
//           // dispatch(setUsername({
//           //   name: response.data.user.name,
//           // }))
//           setUsername(response.data.user.name);
//           // setUsername(name)
//         } else {
//           // Handle the case when there is no api_token (user is not logged in)
//           setUsername(""); // Set username to an empty string or any default value
//         }
//       } catch (error) {
//         // console.error('Error fetching user info:', error);
//         setUsername("");
//       }
//     }

//     fetchData();
//   }, [api_token]);

//   const handleSidebarSearch = (category) => {
//     setSelectedCategory(category ? category.slug : null);
//     sethSelectedCategory(category);
//     setSideBar(false);
//     // setSelectedCategory()
//   };

//   const handleCategoryClick = (category) => {
//     sethSelectedCategory(category);
//     setShowAll(false);
//   };

//   const handleSearch = () => {
//     router.push("/");
//     setSearchTerm(hsearchTerm ?? null);
//     // console.log(searchTerm)
//     setSelectedCategory(hselectedCategory ? hselectedCategory.slug : null);
//     // console.log(selectedCategory)
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
//             {hselectedCategory
//               ? hselectedCategory.name.slice(0, 7) +
//                 (hselectedCategory.name.length > 7 ? "..." : "")
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
//                     hselectedCategory === null
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
//                       hselectedCategory === category
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
//               username
//                 ? () => router.push("/userinfo")
//                 : () => router.push("/signin")
//             }
//             className="link hidden sm:block"
//           >
//             <p className="hover:underline">
//               {/* {username ? `Hello, ${username}` : "Hello, Sign In"} */}
//               {username !== null
//                 ? `Hello, ${username || "Sign In"}`
//                 : "Loading..."}
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
//                 hselectedCategory?.name === category.name
//                   ? "text-yellow-500 underline"
//                   : ""
//               }`}
//             >
//               {category.name}
//             </span>
//           </p>
//         ))}

//         <div>
//           {username && (
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
//                     username
//                       ? () => router.push("/userinfo")
//                       : () => router.push("/signin")
//                   }
//                   className="cursor-pointer"
//                 >
//                   {username ? (
//                     <div className="w-full bg-amazon_blue-light text-white text-xl font-bold py-3 px-8 flex items-center gap-3">
//                       <Image
//                         src="https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/hm2ffv5fk9wz0xcu4gox/create-customized-cute-profile-avatar-of-you.png"
//                         alt="p"
//                         className="rounded-full"
//                         objectFit="contain"
//                         width={40}
//                         height={40}
//                       />
//                       {username}
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











{/* this bootstrap pagination works */}
                {/* <ReactPaginate
                  activePage={currentPage}
                  itemsCountPerPage={productsPerPage}
                  totalItemsCount={totalPages * productsPerPage}
                  pageRangeDisplayed={5}
                  onChange={(pageNumber) => {
                    setCurrentPage(pageNumber);
                    fetchData(pageNumber);
                  }}
                /> */}