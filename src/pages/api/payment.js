import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectItems, selectTotal } from "@/slices/amazonSlice";
import { useRouter } from "next/router";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
  const frontend = process.env.NEXT_PUBLIC_FRONTEND;

  const { item, email } = req.body;
  const modifiedItems = item.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        // images: [`${imageRoute}/${item.image}`]
        images: [item.image
            ? `${imageRoute}/${item.image}`
            : `https://source.unsplash.com/random/?${item.category}`
        ],
      },
    },
  }));

  // async function order() {
  //     const orderData = {
  //         user_id: user_id,
  //         products: products.map((product) => ({
  //             product_id: product.id,
  //             quantity: product.quantity,
  //         })),
  //         total_amount: total,
  //     };

  //     try {
  //         const response = await axios.post('http://127.0.0.1:8000/api/order', orderData, {
  //             headers: {
  //               Authorization: `Bearer ${api_token}`,
  //           }})
  //         router.push('/')
  //         dispatch(clearCart())

  //     } catch (error) {
  //         console.error(error)
  //     }
  // }

  const randomId = Math.floor(Math.random() * 1000000);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "us_bank_account"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "MM", "TR"],
    },
    line_items: modifiedItems,
    mode: "payment",
    // success_url: `${process.env.NEXTAUTH_URL}/success`,
    // cancel_url: `${process.env.NEXTAUTH_URL}/payment`,
    // success_url: 'http://localhost:3000/success',
    success_url: `${frontend}/success?payment_status=${randomId}`,
    cancel_url: `${frontend}/payment`,
    metadata: {
      email,
      images: JSON.stringify(item.map((item) => item.src)),
    },
  });
  res.status(200).json({
    id: session.id,
    randomId: randomId,
  });
}
