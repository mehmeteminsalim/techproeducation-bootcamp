import axios from "axios";
import React, { useEffect, useState } from "react";
import Product_Card from "./Product_Card.jsx";

const Product_Similar = (props) => {
  const [urunler, setUrunler] = useState([]);

  function urunleriAl() {
    if (props.kategori_url !== undefined) {
      var adres =
        "https://devshop-web.herokuapp.com/api/urun/benzerurunler/" +
        props.kategori_url +
        "/" +
        props.id;
      axios.get(adres).then(function (gelenVeri) {
        setUrunler(gelenVeri.data);
      });
    }
  }

  useEffect(urunleriAl, [props.kategori_url !== undefined]);

  return (
    <React.StrictMode>
      <div className="container">
        <header className="section-heading">
          <h3>Benzer Ürünler </h3>
        </header>

        <div className="row">
          {urunler.map(function (urun) {
            return (
              <Product_Card
                key={urun._id}
                id={urun._id}
                isim={urun.isim}
                yildizsayisi={urun.yildiz.sayi}
                puan={urun.yildiz.puan}
                ind_fiyat={urun.ind_fiyat}
                normal_fiyat={urun.normal_fiyat}
                resim={urun.resimler.bir}
              />
            );
          })}
        </div>
      </div>
    </React.StrictMode>
  );
};

export default Product_Similar;
