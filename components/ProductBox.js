import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartConext";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

export default function ProductBox({
  _id,
  titulo,
  descripcion,
  precio,
  imagenes,
}) {
  const uri = "/productos/" + _id;
  const { addProductToCart } = useContext(CartContext);
  return (
    <ProductWrapper>
      <WhiteBox href={uri}>
        <div>
          <img src={imagenes[0]} alt={titulo} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={uri}>{titulo}</Title>
        <PriceRow>
          <Price>${precio}</Price>
          <Button primary outline onClick={() => addProductToCart(_id)}>
            Add to Cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
