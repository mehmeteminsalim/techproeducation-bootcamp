import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../public/Footer";
import Header from "../public/Header";

const LoginPage = () => {
  const data = useLocation();
  const sepeteMi = data.state;

  var yonlendirme = false;
  if (sepeteMi !== undefined && sepeteMi !== null) {
    yonlendirme = true;
  }

  const [durum, setDurum] = useState(0);
  /*
    0 : ilk durum
    1 : giriş yapıldı
    2 : hata var
    3 : yükleniyor
  */

  function girisYap(event) {
    setDurum(3); // yükleniyor..
    var email = event.target.email.value;
    var sifre = event.target.sifre.value;

    axios
      .post(
        "https://devshop-web.herokuapp.com/api/kullanici/giris",
        {
          email: email,
          sifre: sifre,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (gelenVeri) {
        if (gelenVeri.data.sonuc === true) {
          setDurum(1);
          if (yonlendirme === true) {
            window.location.href = "/sepetim";
          } else {
            window.location.href = "/";
          }
        } else {
          setDurum(2);
        }
      })
      .catch(function (error) {
        setDurum(2);
      });

    event.preventDefault();
  }

  return (
    <React.StrictMode>
      <Header />
      <section className="section-content padding-y bg">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <aside className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-4">Giriş Yap</h4>
                  <form onSubmit={girisYap}>
                    <a href="#" className="btn btn-facebook btn-block mb-2">
                      <i className="fab fa-facebook-f"></i> &nbsp; Facebook ile
                      giriş yap
                    </a>
                    <a href="#" className="btn btn-google btn-block mb-4">
                      <i className="fab fa-google"></i> &nbsp; Google ile giriş
                      yap
                    </a>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-user"></i>
                          </span>
                        </div>
                        <input
                          autoComplete="off"
                          required
                          name="email"
                          className="form-control"
                          placeholder="Email giriniz"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-lock"></i>
                          </span>
                        </div>
                        <input
                          name="sifre"
                          className="form-control"
                          placeholder="Şifrenizi giriniz"
                          type="password"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className={`btn btn-primary btn-block`}
                        disabled={`${durum === 3 ? "disabled" : ""}`}
                      >
                        {durum === 3 ? (
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "Giriş Yap"
                        )}
                      </button>
                    </div>

                    <div className="form-group text-center">
                      <small>
                        {durum === 1 && "Giriş başarılı, lütfen bekleyin.."}
                        {durum === 2 && "Email ya da şifre hatalı."}
                      </small>
                    </div>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </React.StrictMode>
  );
};

export default LoginPage;
