import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Producto } from "@/models/Producto";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured producto={featuredProduct} />
      <NewProducts productos={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "647f657a4824ada576e00f2f";
  await mongooseConnect();
  const featuredProduct = await Producto.findById(featuredProductId);
  const newProducts = await Producto.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
