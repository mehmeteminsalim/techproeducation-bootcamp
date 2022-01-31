import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const Category_Filter = () => {
  const query = new URLSearchParams(useLocation().search);

  const secim = query.get("secim") === null ? "1" : query.get("secim");
  const marka = query.get("marka") === null ? [] : query.get("marka");
  const min = query.get("min") === null ? 0 : query.get("min");
  const max = query.get("max") === null ? 0 : query.get("max");

  const [minFiyat, setMinFiyat] = useState(min);
  const [maxFiyat, setMaxFiyat] = useState(max);

  //&marka=Polo,Altınyıldız,Süvari
  var defaultArray = [];
  if (marka !== [] && marka.length > 0) {
    defaultArray = marka.split(",");
  }

  const [seciliMarkalar, setSeciliMarkalar] = useState(defaultArray);

  function markadaDegisiklik(event) {
    const secenekler = seciliMarkalar; // [Polo, Süvari]
    var index = 0;

    if (event.target.checked) {
      secenekler.push(event.target.value);
    } else {
      index = secenekler.indexOf(event.target.value);
      secenekler.splice(index, 1);
    }
    console.log(secenekler);
    setSeciliMarkalar(secenekler);
  }

  const parametreler = useParams();
  function filtreyiUygula(event) {
    var adres =
      "http://localhost:3000/kategori/" +
      parametreler.kategori_url +
      "?sayfa=1" +
      "&secim=" +
      secim +
      "&marka=" +
      seciliMarkalar +
      "&min=" +
      minFiyat +
      "&max=" +
      maxFiyat;

    window.location.href = adres;

    event.preventDefault();
  }

  function minFiyatDegisti(event) {
    setMinFiyat(event.target.value);
  }

  function maxFiyatDegisti(event) {
    setMaxFiyat(event.target.value);
  }

  const [veritabanindakiMarkalar, setVTMarkalar] = useState([]);

  function vtMarkalariAl() {
    axios
      .get(
        "https://devshop-web.herokuapp.com/api/kategori/filtre/marka/" +
          parametreler.kategori_url
      )
      .then(function (gelenVeri) {
        setVTMarkalar(gelenVeri.data);
      });
  }
  useEffect(vtMarkalariAl, []);

  return (
    <aside className="col-md-3">
      <form onSubmit={filtreyiUygula}>
        <div className="card">
          <article className="filter-group">
            <header className="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_2"
                aria-expanded="true"
                className=""
              >
                <i className="icon-control fa fa-chevron-down"></i>
                <h6 className="title">Markalar </h6>
              </a>
            </header>
            <div className="filter-content collapse show" id="collapse_2">
              <div className="card-body">
                {veritabanindakiMarkalar.map(function (bakilanMarka) {
                  return (
                    <label className="custom-control custom-checkbox">
                      <input
                        defaultChecked={
                          seciliMarkalar.includes(bakilanMarka) ? true : false
                        }
                        onChange={markadaDegisiklik}
                        value={bakilanMarka}
                        type="checkbox"
                        className="custom-control-input"
                      />
                      <div className="custom-control-label">{bakilanMarka}</div>
                    </label>
                  );
                })}
              </div>
            </div>
          </article>
          <article className="filter-group">
            <header className="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_3"
                aria-expanded="true"
                className=""
              >
                <i className="icon-control fa fa-chevron-down"></i>
                <h6 className="title">Fiyat Aralığı</h6>
              </a>
            </header>
            <div className="filter-content collapse show" id="collapse_3">
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Min</label>
                    <input
                      onChange={minFiyatDegisti}
                      className="form-control"
                      placeholder="$0"
                      defaultValue={min}
                      type="number"
                    />
                  </div>
                  <div className="form-group text-right col-md-6">
                    <label>Max</label>
                    <input
                      defaultValue={max}
                      onChange={maxFiyatDegisti}
                      className="form-control"
                      placeholder="$1,0000"
                      type="number"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-block btn-primary">
                  Uygula
                </button>
              </div>
            </div>
          </article>
        </div>
      </form>
    </aside>
  );
};

export default Category_Filter;
