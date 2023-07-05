import { mongooseConnect } from "@/lib/mongoose";
import { Producto } from "@/models/Producto";

export default async function handle(req, res) {
  await mongooseConnect();
  const ids = req.body.ids;
  res.json(await Producto.find({ _id: ids }));
}
