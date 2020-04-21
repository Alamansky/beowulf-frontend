import { Mutation } from "react-apollo";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import { TOGGLE_CART_MUTATION } from "./Cart";
import CartCount from "./CartCount";

const Nav = () => (
  <User>
    {(user) => {
      const me = user.data ? user.data.me : null;
      const menuItems = ["Shop", "Blog"];
      return (
        <NavStyles>
          {me && me.permissions.includes("ADMIN") && (
            <Link href="/orders">
              <a>Orders</a>
            </Link>
          )}
          <Link href="/#about">
            <a>About</a>
          </Link>
          <Link href="/#contact">
            <a>Contact</a>
          </Link>
          {menuItems.map((item) => (
            <Link href={`/${item.toLowerCase()}`} key={item}>
              <a>{item}</a>
            </Link>
          ))}
          {me && (
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {(toggleCart) => (
                <button onClick={toggleCart}>
                  My Cart
                  <CartCount
                    count={me.cart.reduce(
                      (tally, cartItem) => tally + cartItem.quantity,
                      0
                    )}
                  />
                </button>
              )}
            </Mutation>
          )}
        </NavStyles>
      );
    }}
  </User>
);

export default Nav;
