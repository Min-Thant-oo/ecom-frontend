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


  const randomId = Math.floor(Math.random() * 1000000);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "us_bank_account"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "MM", "TR"],
    },
    line_items: modifiedItems,
    mode: "payment",
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
