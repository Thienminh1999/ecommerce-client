import React, { useState } from "react";
import styles from "./Products.module.css";
import { json, useLoaderData } from "react-router-dom";
import ProductItem from "../ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import ModalProductContainer from "../../Modal/ProductDetailModal";
import { PopupActions } from "../../../stores/popup-detail";
import axiosInstance from "../../../apis/config/AxiosConfig";
import { ProductAPI } from "../../../apis/productAPIs";

function Products(props) {
  const data = useLoaderData();
  const dispatch = useDispatch();
  const { isDisplay } = useSelector((state) => state.popup);

  const handleClickProduct = (data) => {
    dispatch(PopupActions.showPopup());
    dispatch(PopupActions.setCurrentProduct(data));
  };

  return (
    <div className={styles.container}>
      <p>Made the hard way</p>
      <h3>Top trending products</h3>
      <ul className={styles.products}>
        {data.map((product, index) => (
          <ProductItem
            onSelectProduct={handleClickProduct}
            key={index}
            data={product}
          />
        ))}
      </ul>
      {isDisplay && <ModalProductContainer />}
    </div>
  );
}

export default Products;

export const loader = async () => {
  const response = await ProductAPI.trending();
  if (response?.status !== 200) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }
  return response?.data || [];
};
