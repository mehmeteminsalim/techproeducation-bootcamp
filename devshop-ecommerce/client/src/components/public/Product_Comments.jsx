import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Product_Comment from "./Product_Comment";
import axios from "axios";
import Product_CreateComment from "./Product_CreateComment";
import Poruduct_CommentAlert from "./Product_CommentAlert";

const Product_Comments = () => {
  const [yorumlar, setYorumlar] = useState([]);
  const [girisYapildimi, setGirisYapildimi] = useState(0);
  const [uye, setUye] = useState({
    isim: "",
    id: "",
  });

  /*
    0 : yükleniyor
    1 : giriş yapılmış.
    2 : giriş yapılmamış.
  */
  const [istatistiktik, setIstatistik] = useState({
    yorumsayisi: 1,
    toplampuan: 0,
  });

  function girisKontrol() {
    axios
      .get("https://devshop-web.herokuapp.com/api/kullanici/giriskontrol", {
        withCredentials: true,
      })
      .then(function (gelenVeri) {
        console.log("giriş yapıldı mı :", gelenVeri.data.sonuc);
        if (gelenVeri.data.sonuc === true) {
          setUye({
            isim: gelenVeri.data.isim,
            id: gelenVeri.data.id,
          });
          setGirisYapildimi(1);
        } else {
          setGirisYapildimi(2);
        }
      });
  }

  useEffect(girisKontrol, []);

  const parametreler = useParams();

  function yorumlariAl() {
    var adres =
      "https://devshop-web.herokuapp.com/api/yorumlar/" + parametreler.id;
    axios.get(adres).then(function (gelenVeri) {
      setYorumlar(gelenVeri.data);
    });
  }

  function yorumPuan() {
    var adres =
      "https://devshop-web.herokuapp.com/api/yorum/puan/" + parametreler.id;
    axios
      .get(adres)
      .then(function (gelenVeri) {
        console.log(gelenVeri);
        if (gelenVeri.data.yorumsayisi !== undefined) {
          setIstatistik({
            yorumsayisi: gelenVeri.data.yorumsayisi,
            toplampuan: gelenVeri.data.sum,
          });
        }
      })
      .catch(function (error) {});
  }
  useEffect(yorumPuan, []);
  useEffect(yorumlariAl, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <header className="section-heading">
            <h3>Ürün Yorumları </h3>
            <div className="rating-wrap">
              <ul className="rating-stars stars-lg">
                <li
                  style={{
                    width: `${
                      (istatistiktik.toplampuan / istatistiktik.yorumsayisi) *
                      20
                    }%`,
                  }}
                  className="stars-active"
                >
                  <img src="../images/icons/stars-active.svg" alt="" />
                </li>
                <li>
                  <img src="../images/icons/starts-disable.svg" alt="" />
                </li>
              </ul>
              <strong className="label-rating text-lg">
                {(istatistiktik.toplampuan / istatistiktik.yorumsayisi).toFixed(
                  1
                )}
                <span className="text-muted"> | {yorumlar.length} yorum</span>
              </strong>
            </div>
          </header>

          {girisYapildimi === 1 && (
            <Product_CreateComment uyeid={uye.id} uyeisim={uye.isim} />
          )}
          {girisYapildimi === 2 && <Poruduct_CommentAlert />}

          {yorumlar.map(function (yorum) {
            return (
              <Product_Comment
                key={yorum._id}
                id={yorum._id}
                isim={yorum.isim}
                icerik={yorum.icerik}
                kullanici_id={yorum.kullanici_id}
                yildiz={yorum.yildiz}
                like={yorum.like}
                dislike={yorum.dislike}
                tarih={yorum.tarih}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product_Comments;
