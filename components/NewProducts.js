import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

export default function NewProducts({ productos }) {
  return (
    <Center>
      <ProductsGrid productos={productos} />
    </Center>
  );
}
