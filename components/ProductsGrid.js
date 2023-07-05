import styled from "styled-components";
import ProductBox from "./ProductBox";
const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 30px;
`;

export default function ProductsGrid({ productos }) {
  return (
    <StyledProductsGrid>
      {productos?.length > 0 &&
        productos.map((producto, index) => (
          <ProductBox {...producto} key={index} />
        ))}
    </StyledProductsGrid>
  );
}
