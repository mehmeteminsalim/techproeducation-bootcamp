import React from "react";
import Footer from "../public/Footer.jsx";
import Header from "../public/Header.jsx";
import Product_Comments from "../public/Product_Comments.jsx";
import Product_Detail from "../public/Product_Detail.jsx";
const ProductPage = () => {
  return (
    <React.StrictMode>
      <Header />
      <Product_Detail />
      <Product_Comments />
      <Footer />
    </React.StrictMode>
  );
};

export default ProductPage;
