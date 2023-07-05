import Link from "next/link";
import { styled } from "styled-components";
import { ButtonStyles } from "./Button";

const StyledLink = styled(Link)`
  ${ButtonStyles}
`;

export default function ButtonLink(props) {
  return <StyledLink {...props} />;
}
