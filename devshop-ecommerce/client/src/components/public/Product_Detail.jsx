import React, { useEffect, useState } from "react";
import Product_Images from "./Product_Images.jsx";
import Product_Info from "./Product_Info.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Product_Similar from "./Product_Similar.jsx";
import { Cookies, useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product_Detail = () => {
  const [detay, setDetay] = useState({
    resimler: {
      bir: "",
      iki: "",
      uc: "",
      dort: "",
    },
    stok: {
      s: 0,
      m: 0,
      l: 0,
      xl: 0,
    },
    yildiz: {
      sayi: 0,
      puan: "0",
    },
    parametreler: {
      taksit: "",
      garanti: "",
      kargo: "",
    },
  });

  const [cookies, setCookie] = useCookies(["sepet"]);
  const [miktar, setMiktar] = useState(1);
  const [size, setSize] = useState("S");
  const [stokDurumu, setStokDurumu] = useState(true);

  const parametreler = useParams();

  function verileriAl() {
    axios
      .get(
        "https://devshop-web.herokuapp.com/api/urun/detay/" + parametreler.id
      )
      .then(function (gelenVeriler) {
        console.log(gelenVeriler.data[0]);
        setDetay(gelenVeriler.data[0]);
      });
  }

  useEffect(verileriAl, []);

  function sepeteEkle(event) {
    var bosArray = new Cookies().get("sepet");
    if (bosArray === undefined) {
      bosArray = [];
    }

    var varMi = false;

    bosArray.forEach((element) => {
      if (element.id === detay._id && element.size === size) {
        varMi = true;

        element.miktar += miktar;
      }
    });

    if (!varMi) {
      bosArray.push({
        id: detay._id,
        isim: detay.isim,
        marka: detay.marka,
        fiyat: detay.ind_fiyat,
        resim: detay.resimler.bir,
        miktar: miktar,
        size: size,
      });
    }
    toast.success("Sepete eklendi.");
    setCookie("sepet", bosArray, { path: "/" });

    console.log("cookie", bosArray);
  }

  function artir() {
    if (miktar < 15) {
      setMiktar(miktar + 1);
      stokKontrol(miktar + 1);
    }
  }

  function azalt() {
    if (miktar > 1) {
      setMiktar(miktar - 1);
      stokKontrol(miktar - 1);
    }
  }

  function sizeSecildi(event) {
    setSize(event.target.value);
    stokKontrol(miktar);
  }

  function stokKontrol(sayi) {
    if (size === "S") {
      if (sayi > detay.stok.s) setStokDurumu(false);
      else setStokDurumu(true);
    } else if (size === "M") {
      if (sayi > detay.stok.m) setStokDurumu(false);
      else setStokDurumu(true);
    } else if (size === "L") {
      if (sayi > detay.stok.l) setStokDurumu(false);
      else setStokDurumu(true);
    } else if (size === "XL") {
      if (sayi > detay.stok.xl) setStokDurumu(false);
      else setStokDurumu(true);
    }
  }

  return (
    <React.StrictMode>
      <ToastContainer />
      <Product_Info
        isim={detay.isim}
        kategori_isim={detay.kategori}
        kategori_url={detay.kategori_url}
      />
      <section className="section-content padding-y">
        <div className="container">
          <div className="card">
            <div className="row no-gutters">
              <aside className="col-md-6">
                <Product_Images resimler={detay.resimler} />
              </aside>
              <main className="col-md-6 border-left">
                <article className="content-body">
                  <h2 className="title">{detay.isim}</h2>

                  <div className="rating-wrap my-3">
                    <ul className="rating-stars">
                      <li
                        style={{ width: `${detay.yildiz.puan * 20}%` }}
                        className="stars-active"
                      >
                        <img src="/images/icons/stars-active.svg" alt="" />
                      </li>
                      <li>
                        <img src="/images/icons/starts-disable.svg" alt="" />
                      </li>
                    </ul>
                    <small className="label-rating text-muted">
                      {detay.yildiz.sayi}
                    </small>
                  </div>

                  <div className="mb-3">
                    <var className="price h4">₺{detay.ind_fiyat}</var>
                    <del className="text-muted">₺{detay.normal_fiyat}</del>
                  </div>

                  <p>{detay.aciklama}</p>

                  <dl className="row">
                    <dt className="col-sm-3">Marka</dt>
                    <dd className="col-sm-9">{detay.marka}</dd>

                    <dt className="col-sm-3">Renk</dt>
                    <dd className="col-sm-9">{detay.renk}</dd>

                    <dt className="col-sm-3">Cinsiyet</dt>
                    <dd className="col-sm-9">{detay.cinsiyet}</dd>
                  </dl>

                  <hr />
                  <div className="row">
                    <div className="form-group col-md flex-grow-0">
                      <label>Miktar</label>
                      <div className="input-group mb-3 input-spinner">
                        <div className="input-group-prepend">
                          <button
                            onClick={artir}
                            className="btn btn-light"
                            type="button"
                            id="button-plus"
                          >
                            +
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          value={miktar}
                        />
                        <div className="input-group-append">
                          <button
                            onClick={azalt}
                            className="btn btn-light"
                            type="button"
                            id="button-minus"
                          >
                            −
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md">
                      <label>Beden Seçin</label>
                      <div className="mt-2">
                        <label className="custom-control custom-radio custom-control-inline">
                          <input
                            defaultChecked="true"
                            onChange={sizeSecildi}
                            value="S"
                            type="radio"
                            name="select_size"
                            className="custom-control-input"
                          />
                          <div className="custom-control-label">S</div>
                        </label>

                        <label className="custom-control custom-radio custom-control-inline">
                          <input
                            onChange={sizeSecildi}
                            value="M"
                            type="radio"
                            name="select_size"
                            className="custom-control-input"
                          />
                          <div className="custom-control-label">M</div>
                        </label>

                        <label className="custom-control custom-radio custom-control-inline">
                          <input
                            onChange={sizeSecildi}
                            value="L"
                            type="radio"
                            name="select_size"
                            className="custom-control-input"
                          />
                          <div className="custom-control-label">L</div>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                          <input
                            onChange={sizeSecildi}
                            value="XL"
                            type="radio"
                            name="select_size"
                            className="custom-control-input"
                          />
                          <div className="custom-control-label">XL</div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`btn  btn-primary ${
                      stokDurumu === false && "disabled"
                    }`}
                  >
                    Hemen Satın Al
                  </button>
                  <button
                    onClick={sepeteEkle}
                    className={`btn btn-outline-primary ml-2 ${
                      stokDurumu === false && "disabled"
                    }`}
                  >
                    <span className="text">Sepete Ekle</span>
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                </article>
              </main>
            </div>
          </div>
        </div>
      </section>

      <Product_Similar kategori_url={detay.kategori_url} id={parametreler.id} />
    </React.StrictMode>
  );
};

export default Product_Detail;
