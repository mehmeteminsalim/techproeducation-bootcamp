import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import CartPage_Product from "../public/CartPage_Product";
import Footer from "../public/Footer";
import Header from "../public/Header";

const CartPage = () => {
  const [cookies, setCookie] = useCookies(["sepet"]);
  const [girisYapildiMi, setGirisYapildiMi] = useState(false);

  function girisKontrol() {
    axios
      .get("https://devshop-web.herokuapp.com/api/kullanici/giriskontrol", {
        withCredentials: true,
      })
      .then(function (gelenVeri) {
        if (gelenVeri.data.sonuc === true) {
          setGirisYapildiMi(true);
        } else {
          setGirisYapildiMi(false);
        }
      });
  }

  useEffect(girisKontrol, []);

  var toplamTutar = 0;

  if (cookies.sepet !== undefined) {
    for (var i = 0; i < cookies.sepet.length; i++) {
      toplamTutar += cookies.sepet[i].fiyat * cookies.sepet[i].miktar;
    }
  }

  return (
    <React.StrictMode>
      <Header />

      <section className="section-content padding-y bg">
        <div className="container">
          <div className="row">
            <aside className="col-lg-9">
              <div className="card">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Ürün</th>
                      <th scope="col" width="120">
                        Adet
                      </th>
                      <th scope="col" width="120">
                        Fiyat
                      </th>
                      <th scope="col" className="text-right" width="200">
                        İşlem
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookies.sepet !== undefined && cookies.sepet.length > 0
                      ? cookies.sepet.map(function (urun) {
                          return (
                            <CartPage_Product
                              key={urun.id}
                              id={urun.id}
                              isim={urun.isim}
                              resim={urun.resim}
                              size={urun.size}
                              miktar={urun.miktar}
                              fiyat={urun.fiyat}
                            />
                          );
                        })
                      : ""}
                  </tbody>
                </table>

                <div className="card-body border-top">
                  <p className="icontext">
                    <i className="icon text-success fa fa-truck"></i> Ücretsiz
                    kargo
                  </p>
                </div>
              </div>
            </aside>
            <aside className="col-lg-3">
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Toplam:</dt>
                    <dd className="text-right text-dark b">
                      <strong>₺{toplamTutar.toFixed(2)}</strong>
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    <img src="/images/misc/payments.png" height="26" alt="" />
                  </p>
                  {girisYapildiMi === true && (
                    <Link
                      to={{
                        pathname: "/kargo-bilgileri",
                        state: cookies.sepet,
                      }}
                      className="btn btn-primary btn-block"
                    >
                      Ödeme Yap
                    </Link>
                  )}

                  {girisYapildiMi === false && (
                    <Link
                      to={{
                        pathname: "/giris",
                        state: { odemeSayfasinaYonlendirilecekMi: true },
                      }}
                      className="btn btn-primary btn-block"
                    >
                      Ödeme Yap
                    </Link>
                  )}
                  <a href="#" className="btn btn-light btn-block">
                    Alışverişe Devam Et
                  </a>
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

export default CartPage;
