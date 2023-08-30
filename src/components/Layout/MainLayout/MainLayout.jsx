import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import styles from "./MainLayout.module.css";
import WrapperScrollOnTop from "../../../UI/ScrollToTop/WrapperScrollOnTop";

function MainLayout(props) {
  return (
    <WrapperScrollOnTop>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.main}>
          <Outlet />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </WrapperScrollOnTop>
  );
}

export default MainLayout;
