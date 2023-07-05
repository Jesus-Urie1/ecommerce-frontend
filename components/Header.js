import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "@/components/CartConext";

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  margin-left: 20px;
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    color: #fff;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/">SegundoRound Hola bb</Logo>
          <StyledNav>
            <NavLink href={"/"}>Inicio</NavLink>
            <NavLink href={"/productos"}>Productos</NavLink>
            <NavLink href={"/categorias"}>Categorias</NavLink>
            <NavLink href={"/cuenta"}>Cuenta</NavLink>
            <NavLink href={"/carrito"}>Carrito ({cartProducts.length})</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
