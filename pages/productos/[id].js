import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Producto } from "@/models/Producto";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import Cart from "@/components/Icons/Cart";
import { useContext } from "react";
import { CartContext } from "@/components/CartConext";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.4fr;
  gap: 40px;
  margin-top: 40px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  alaign-items: center;
`;

const Price = styled.div`
  font-size: 1.4rem;
`;

export default function ProductoPage({ product }) {
  const { addProductToCart } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.imagenes} />
          </WhiteBox>

          <div>
            <Title>{product.titulo}</Title>
            <p>{product.descripcion}</p>
            <PriceRow>
              <div>
                <Price>${product.precio}</Price>
              </div>
              <div>
                <Button primary onClick={() => addProductToCart(product._id)}>
                  <Cart /> Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect;
  const { id } = context.query;
  const product = await Producto.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
