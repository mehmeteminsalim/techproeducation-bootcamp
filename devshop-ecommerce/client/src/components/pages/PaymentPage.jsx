import React from "react";
import CheckoutForm from "../public/CheckoutForm";
import Footer from "../public/Footer";
import Header from "../public/Header";

const PaymentPage = () => {
  return (
    <React.StrictMode>
      <Header />

      <section className="section-content padding-y bg">
        <div className="container">
          <CheckoutForm />
        </div>
      </section>

      <Footer />
    </React.StrictMode>
  );
};

export default PaymentPage;
