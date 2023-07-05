import Center from "@/components/Center";
import Headers from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Producto } from "@/models/Producto";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function ProductosPage({ products }) {
  console.log(products);
  return (
    <>
      <Headers />
      <Center>
        <Title>Productos</Title>
        <ProductsGrid productos={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Producto.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
