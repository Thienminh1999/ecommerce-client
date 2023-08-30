import React from "react";
import styles from "./ProductDetailsItem.module.css";
import { USDollar } from "../../../Utils/Utils";
import { BASE_URL } from "../../../stores/variables";

function ProductDetailsItem(props) {
  const { product } = props;
  const price = USDollar.format(Number(product.productId.price)) + " VND";
  return (
    <tr className={styles.container}>
      <td>{product.productId._id}</td>
      <td className={styles.wrapper}>
        <img
          alt={product.productId.name}
          src={`${BASE_URL}${product.productId.img1}`}
        />
      </td>
      <td>
        <h4>{product.productId.name}</h4>
      </td>
      <td>{price}</td>
      <td>{product.quantity}</td>
    </tr>
  );
}

export default ProductDetailsItem;
