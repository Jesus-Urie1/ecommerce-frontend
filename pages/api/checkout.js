import { mongooseConnect } from "@/lib/mongoose";
import { Orden } from "@/models/Order";
import { Producto } from "@/models/Producto";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.json("should be a post request");
    return;
  }
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;

  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Producto.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;

    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "MXN",
          product_data: { name: productInfo.titulo },
          unit_amount: productInfo.precio * 100,
        },
      });
    }
  }

  const orderDoc = await Orden.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${process.env.PUBLIC_URL}/carrito?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/carrito?canceled=1`,
    metadata: { orderId: orderDoc._id.toString(), test: "ok" },
  });

  res.json({ url: session.url });
}
