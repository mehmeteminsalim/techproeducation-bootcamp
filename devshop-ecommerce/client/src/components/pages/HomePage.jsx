import React from "react";
import Header from "../public/Header.jsx";
import Footer from "../public/Footer.jsx";
import HomePage_Top from "../public/HomePage_Top.jsx";
import HomePage_Popular from "../public/HomePage_Popular.jsx";
import HomePage_New from "../public/HomePage_New.jsx";

const HomePage = () => {
  return (
    <React.StrictMode>
      <Header />
      <HomePage_Top />
      <HomePage_Popular />
      <HomePage_New />
      <Footer />
    </React.StrictMode>
  );
};

export default HomePage;
