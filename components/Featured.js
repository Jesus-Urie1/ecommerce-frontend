import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import Cart from "./Icons/Cart";
import { useContext } from "react";
import { CartContext } from "@/components/CartConext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  aling-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 25px;
`;

export default function Featured({ producto }) {
  const { addProductToCart } = useContext(CartContext);
  function addFeaturedToCart() {
    addProductToCart(producto._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{producto.titulo}</Title>
              <Desc>{producto.descripcion}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/productos/" + producto._id}
                  outline={1}
                  white={1}
                >
                  Read More
                </ButtonLink>
                <Button white onClick={addFeaturedToCart}>
                  <Cart />
                  Add to Cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <div>
            <img src="https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP854/mbp14-silver2.png" />
          </div>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
