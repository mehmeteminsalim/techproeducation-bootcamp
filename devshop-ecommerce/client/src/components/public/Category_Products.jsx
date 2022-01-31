import React, { useEffect, useState } from "react";
import Product_Card from "./Product_Card";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const Category_Products = () => {
  const parametreler = useParams();
  const query = new URLSearchParams(useLocation().search);
  const marka = query.get("marka") === null ? [] : query.get("marka");
  const min = query.get("min") === null ? 0 : query.get("min");
  const max = query.get("max") === null ? 0 : query.get("max");

  const [urunSayisi, setUrunSayisi] = useState(0);
  const [urunler, setUrunler] = useState([]);

  const bulunduguSayfa =
    query.get("sayfa") === null ? 1 : parseInt(query.get("sayfa"));

  const secim = query.get("secim") === null ? "1" : query.get("secim");

  var yaziliSecim = "Yeni ürünler";

  if (secim === "2") {
    yaziliSecim = "Çok satanlar";
  } else if (secim === "3") {
    yaziliSecim = "En düşük fiyat";
  }

  function urunSayisiniAl() {
    var adres =
      "https://devshop-web.herokuapp.com/api/urunsayisi/" +
      parametreler.kategori_url +
      "?marka=" +
      marka +
      "&min=" +
      min +
      "&max=" +
      max;
    axios.get(adres).then(function (gelenVeri) {
      console.log("toplam", gelenVeri.data.toplam);
      setUrunSayisi(gelenVeri.data.toplam);
    });
  }

  function urunleriAl() {
    var adres =
      "https://devshop-web.herokuapp.com/api/kategori/" +
      parametreler.kategori_url +
      "/" +
      query.get("sayfa") +
      "?secim=" +
      secim +
      "&marka=" +
      marka +
      "&min=" +
      min +
      "&max=" +
      max;

    axios.get(adres).then(function (gelenVeri) {
      setUrunler(gelenVeri.data);
    });
  }

  useEffect(urunleriAl, []);
  useEffect(urunSayisiniAl, []);

  function siralamaSecildi(event) {
    var adres = "";
    if (event.target.value === "Yeni ürünler") {
      adres =
        "http://localhost:3000/kategori/" +
        parametreler.kategori_url +
        "?sayfa=1" +
        "&secim=1" +
        "&marka=" +
        marka +
        "&min=" +
        min +
        "&max=" +
        max;
    } else if (event.target.value === "Çok satanlar") {
      adres =
        "http://localhost:3000/kategori/" +
        parametreler.kategori_url +
        "?sayfa=1" +
        "&secim=2" +
        "&marka=" +
        marka +
        "&min=" +
        min +
        "&max=" +
        max;
    } else if (event.target.value === "En düşük fiyat") {
      adres =
        "http://localhost:3000/kategori/" +
        parametreler.kategori_url +
        "?sayfa=1" +
        "&secim=3" +
        "&marka=" +
        marka +
        "&min=" +
        min +
        "&max=" +
        max;
    }

    window.location.href = adres;
  }

  return (
    <main className="col-md-9">
      <header className="border-bottom mb-4 pb-3">
        <div className="form-inline">
          <span className="mr-md-auto">{urunSayisi} tane ürün bulundu.</span>
          <select
            defaultValue={yaziliSecim}
            onChange={siralamaSecildi}
            className="mr-2 form-control"
          >
            <option>Yeni ürünler</option>
            <option>Çok satanlar</option>
            <option>En düşük fiyat</option>
          </select>
          <div className="btn-group">
            <a
              href="#"
              className="btn btn-outline-secondary"
              data-toggle="tooltip"
              title=""
              data-original-title="List view"
            >
              <i className="fa fa-bars"></i>
            </a>
            <a
              href="#"
              className="btn  btn-outline-secondary active"
              data-toggle="tooltip"
              title=""
              data-original-title="Grid view"
            >
              <i className="fa fa-th"></i>
            </a>
          </div>
        </div>
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

      <nav className="mt-4" aria-label="Page navigation sample">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href={`?sayfa=1&secim=${secim}&marka=${marka}&min=${min}&max=${max}`}
            >
              İlk Sayfa
            </a>
          </li>

          {bulunduguSayfa === 1 && (
            <React.StrictMode>
              <li className="page-item active">
                <a
                  className="page-link"
                  href={`?sayfa=${bulunduguSayfa}&secim=${secim}&marka=${marka}&min=${min}&max=${max}`}
                >
                  1
                </a>
              </li>
              {urunSayisi / 6 > 1 && (
                <li className="page-item">
                  <a
                    className="page-link"
                    href={`?sayfa=2&secim=${secim}&marka=${marka}&min=${min}&max=${max}`}
                  >
                    2
                  </a>
                </li>
              )}
              {urunSayisi / 6 > 2 && (
                <li className="page-item">
                  <a
                    className="page-link"
                    href={`?sayfa=3&secim=${secim}&marka=${marka}&min=${min}&max=${max}`}
                  >
                    3
                  </a>
                </li>
              )}
            </React.StrictMode>
          )}

          {bulunduguSayfa !== 1 && (
            <React.StrictMode>
              <li className="page-item ">
                <a
                  className="page-link"
                  href={`?sayfa=${
                    bulunduguSayfa - 1
                  }&secim=${secim}&marka=${marka}&min=${min}&max=${max}`}
                >
                  {bulunduguSayfa - 1}
                </a>
              </li>

              <li className="page-item active">
                <a
                  className="page-link"
                  href={`?sayfa=${bulunduguSayfa}&secim=${secim}&marka=${marka}&min=${min}&max=${max}`}
                >
                  {bulunduguSayfa}
                </a>
              </li>

              {parseInt(urunSayisi / 6) > bulunduguSayfa - 1 && (
                <li className="page-item">
                  <a
                    className="page-link"
                    href={`?sayfa=${
                      bulunduguSayfa + 1
                    }&secim=${secim}&marka=${marka}&min=${min}&max=${max}`}
                  >
                    {bulunduguSayfa + 1}
                  </a>
                </li>
              )}
            </React.StrictMode>
          )}

          <li className="page-item">
            <a
              className="page-link"
              href={`?sayfa=${
                parseInt(urunSayisi / 6) + 1
              }&secim=${secim}&marka=${marka}&min=${min}&max=${max}`}
            >
              Son Sayfa
            </a>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default Category_Products;
