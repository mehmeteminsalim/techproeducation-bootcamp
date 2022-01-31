import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Category_Info = () => {
  const [kategoriIsim, setkategoriIsim] = useState("");
  const [kategoriAciklama, setkategoriAciklama] = useState("");

  const parametreler = useParams();
  function bilgileriAl() {
    axios
      .get(
        "https://devshop-web.herokuapp.com/api/kategori_bireysel/" +
          parametreler.kategori_url
      )
      .then(function (gelenVeri) {
        setkategoriIsim(gelenVeri.data[0].kategori_isim);
        setkategoriAciklama(gelenVeri.data[0].kategori_aciklama);
      });
  }

  useEffect(bilgileriAl, []);

  return (
    <section className="section-pagetop bg">
      <div className="container">
        <nav>
          <ol className="breadcrumb text-white">
            <li className="breadcrumb-item">
              <a href="/">Anasayfa</a>
            </li>
            <li className="breadcrumb-item text-dark">{kategoriIsim}</li>
          </ol>
          <small className="pt-3 text-muted">{kategoriAciklama}</small>
        </nav>
      </div>
    </section>
  );
};

export default Category_Info;
