import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import SignOut from "./SignOut";

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Magazin</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Vinde</a>
            </Link>
            <Link href="/orders">
              <a>Comenzi</a>
            </Link>
            <Link href="/me">
              <a>Cont</a>
            </Link>
            <SignOut />
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Logare User</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
