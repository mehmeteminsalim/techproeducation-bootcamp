import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile_ActiveOrder = () => {
  const [bilgiler, setBilgiler] = useState([
    {
      iletisim: [{ isim: "", email: "", soyisim: "", telefon: "" }],
      urunler: [
        {
          resimler: { bir: "" },
        },
      ],
      durum: [],
    },
  ]);
  /*
  durum: []
  kullanici_id: "603abd0cfc207810b8fc2d39"
  odeme_id: "pi_1IRNbfEKIejjwtwZVcNDs0Ug_secret_r1Vpi7UC0BH6yvYf2H9Bwd8Sr"
  sonuc: false
  takip_no: "202134-48978"
  tarih: "2021-03-04T20:17:09.686Z"
  tutar: 199.95
  urunler: (2) [{…}, {…}]
  _id: "6041404574032716486c3196",

  iletisim : [{
    isim : "Hamza Yılmaz",
    telefon : "0539 999 99 99",
    email : "hyilmaz.techproed@gmail.com",
  }],
  adres : "Adres Bilgisi"

  */
  function bilgileriAl() {
    axios
      .get("https://devshop-web.herokuapp.com/api/profil/aktifsiparis", {
        withCredentials: true,
      })
      .then(function (gelenVeri) {
        setBilgiler(gelenVeri.data);
      });
  }

  useEffect(bilgileriAl, []);

  return (
    <div className="col-md-9">
      {bilgiler.map(function (siparis) {
        return (
          <article className="card order-group mb-4">
            <header className="card-header">
              <b className="d-inline-block mr-3">
                Takip No : #{siparis.takip_no}
              </b>
              <span>Tarih: {siparis.tarih}</span>
            </header>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <h6 className="text-muted">Ödeme</h6>

                  <p>
                    <span class="text-success">
                      <i class="fab fa-lg fa-cc-visa"></i>
                      Ödendi
                    </span>
                    <br />
                    <span className="b">Toplam: ₺{siparis.tutar} </span>
                  </p>
                </div>
                <div className="col-md-4">
                  <h6 className="text-muted">İletişim</h6>
                  <p>
                    {siparis.iletisim[0].isim} {siparis.iletisim[0].soyisim}{" "}
                    <br /> {siparis.iletisim[0].telefon} <br />{" "}
                    {siparis.iletisim[0].email}
                  </p>
                </div>
                <div className="col-md-4">
                  <h6 className="text-muted">Adres</h6>
                  <p> {siparis.adres} </p>
                </div>
              </div>
              <hr />

              <div className="tracking-wrap">
                <div className="step active">
                  <span className="icon">
                    <i className="fa fa-check"></i>
                  </span>
                  <span className="text">Sipariş hazırlanıyor</span>
                </div>
                <div className={`step ${siparis.durum.length > 1 && "active"}`}>
                  <span className="icon">
                    <i className="fa fa-user"></i>
                  </span>
                  <span className="text"> Kargoya verildi</span>
                </div>
                <div className={`step ${siparis.durum.length > 2 && "active"}`}>
                  <span className="icon">
                    <i className="fa fa-truck"></i>
                  </span>
                  <span className="text"> Kargo yola çıktı </span>
                </div>
                <div className={`step ${siparis.durum.length > 3 && "active"}`}>
                  <span className="icon">
                    <i className="fa fa-box"></i>
                  </span>
                  <span className="text">Teslimat için hazır</span>
                </div>
              </div>
              <hr />

              <ul className="row">
                {siparis.urunler.map(function (urun) {
                  return (
                    <li className="col-md-4">
                      <figure className="itemside  mb-3">
                        <div className="aside">
                          <img src={urun.resim} className="img-sm border" />
                        </div>
                        <figcaption className="info align-self-center">
                          <p className="title">{urun.isim}</p>
                          <span className="text-muted">
                            ₺{urun.fiyat} x {urun.miktar}{" "}
                          </span>
                        </figcaption>
                      </figure>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Profile_ActiveOrder;
