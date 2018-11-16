import Link from "next/link";
import NavStyles from "./styles/NavStyles";

const Nav = () => (
  <NavStyles>
    <Link href="/items">
      <a>Produse</a>
    </Link>
    <Link href="/sell">
      <a>Vinde</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
    <Link href="/orders">
      <a>Comenzi</a>
    </Link>
    <Link href="/me">
      <a>Cont</a>
    </Link>
  </NavStyles>
);

export default Nav;
