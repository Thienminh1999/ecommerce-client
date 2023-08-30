import React, { useEffect } from "react";
import styles from "./ShoppingCart.module.css";
import { useSelector } from "react-redux";
import ListCartItem from "../ListCartItem/ListCartItem";
import CartTotal from "../CartTotal/CartTotal";
import { saveCartByUser } from "../../../stores/userStorage";

function ShoppingCart(props) {
  const { cartList } = useSelector((state) => state.cart);
  console.log(cartList);
  // const { currentUser } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (currentUser) {
  //     saveCartByUser(currentUser.email, cartList);
  //   }
  // }, [cartList]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shopping cart</h2>
      <div className={styles.cart}>
        <ListCartItem cart={cartList} />
        <CartTotal />
      </div>
    </div>
  );
}

export default ShoppingCart;
