import React from "react";
import Category_Filter from "../public/Category_Filter";
import Category_Info from "../public/Category_Info";
import Category_Products from "../public/Category_Products";
import Footer from "../public/Footer";
import Header from "../public/Header";

const CategoryPage = () => {
  return (
    <React.StrictMode>
      <Header />

      <Category_Info />

      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <Category_Filter />

            <Category_Products />
          </div>
        </div>
      </section>

      <Footer />
    </React.StrictMode>
  );
};

export default CategoryPage;
