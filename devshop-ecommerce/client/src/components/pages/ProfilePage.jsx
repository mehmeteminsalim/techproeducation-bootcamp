import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../public/Footer";
import Header from "../public/Header";
import Profile_ActiveOrder from "../public/Profile_ActiveOrder";
import Profile_ChangePassword from "../public/Profile_ChangePassword";
import Profile_Information from "../public/Profile_Information";
import Profile_Left from "../public/Profile_Left";
import Profile_OrderHistory from "../public/Profile_OrderHistory";

const ProfilePage = () => {
  const [bolum, setBolum] = useState(0);

  function girisKontrol() {
    axios
      .get("https://devshop-web.herokuapp.com/api/kullanici/giriskontrol", {
        withCredentials: true,
      })
      .then(function (gelenVeri) {
        if (gelenVeri.data.sonuc === true) {
          setBolum(1);
        } else {
          window.location.href = "/";
        }
      });
  }

  useEffect(girisKontrol, []);

  /*
    0 : yükleniyor
    1 : profil bilgileri
    2 : aktif sipariş
    3 : sipariş geçmişi
    4 : şifre değiştir
  */

  function profilBilgisi() {
    setBolum(1);
  }
  function aktifSiparis() {
    setBolum(2);
  }
  function siparisGecmisi() {
    setBolum(3);
  }
  function sifreDegistir() {
    setBolum(4);
  }
  return (
    <React.StrictMode>
      <Header />

      <section className="section-content padding-y bg">
        <div className="container">
          <div className="row">
            <Profile_Left
              dort={sifreDegistir}
              uc={siparisGecmisi}
              iki={aktifSiparis}
              bir={profilBilgisi}
              hangisi={bolum}
            />

            {bolum === 1 && <Profile_Information />}
            {bolum === 2 && <Profile_ActiveOrder />}
            {bolum === 3 && <Profile_OrderHistory />}
            {bolum === 4 && <Profile_ChangePassword />}
          </div>
        </div>
      </section>

      <Footer />
    </React.StrictMode>
  );
};

export default ProfilePage;
