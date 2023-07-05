import { mongooseConnect } from "@/lib/mongoose";
import { buffer } from "micro";
import { Orden, Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

const endpointSecret =
  "whsec_3da0e80c27e0bf7e9b64b67a48d1c643664319d13cb787e0d69702f6235ede1e";

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";

      if (orderId && paid) {
        await Orden.findByIdAndUpdate(orderId, { paid: true });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};

//acumen-useful-soothe-smart
//acct_1NLEpNAExtzeOj4v
