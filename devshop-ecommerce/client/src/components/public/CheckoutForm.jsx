import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export default function CheckoutForm() {
  const data = useLocation();
  const state = data.state;
  const urunler = state.urunler;
  var iletisim = {};
  var adres = "";

  if (state.adres2 === "") {
    iletisim = state.iletisim1;
    adres = state.adres1;
  } else {
    iletisim = state.iletisim2;
    adres = state.adres2;
  }

  if (urunler === undefined || urunler.length < 1) {
    window.location.href = "/";
  }

  const [takip, setTakip] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    window
      .fetch("https://devshop-web.herokuapp.com/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: urunler }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.clientSecret);
        setClientSecret(data.clientSecret);
      });
  }, []);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      siparisOlustur();
    }
  };
  function siparisOlustur() {
    axios
      .post(
        "https://devshop-web.herokuapp.com/api/siparis/olustur",
        {
          urunler: urunler,
          odemeid: clientSecret,
          adres: adres,
          iletisim: iletisim,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (gelenVeri) {
        console.log(gelenVeri.data);
        setTakip(gelenVeri.data.takip_no);
      });
  }

  return (
    <section className="section-content padding-y bg-white">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
            <button disabled={processing || disabled || succeeded} id="submit">
              <span id="button-text">
                {processing ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Pay now"
                )}
              </span>
            </button>

            {error && (
              <div className="card-error" role="alert">
                {error}
              </div>
            )}

            <p
              className={
                succeeded && takip !== ""
                  ? "result-message p-2 text-center mt-2"
                  : "result-message hidden"
              }
            >
              <h5>Tebrikler, sipariş oluşturuldu</h5>
              <div>
                Takip No : <b>#{takip}</b>
              </div>
              <div>Lütfen takip numaranızı kaybetmeyiniz.</div>
              <div className="p-2">
                Alışverişe devam etmek için <a href="/">tıklayın !</a>
              </div>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
