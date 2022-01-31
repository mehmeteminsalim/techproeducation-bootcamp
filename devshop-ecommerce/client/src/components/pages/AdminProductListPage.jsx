import React, { useEffect, useState } from "react";
import Admin_Header from "../public/Admin_Header";
import Admin_LeftMenu from "../public/Admin_LeftMenu";
import axios from "axios";

const AdminProductListPage = () => {
  const [urunler, setUrunler] = useState([]);
  const [sabitArray, setSabitArray] = useState([]);

  function urunleriAl() {
    axios
      .get("https://devshop-web.herokuapp.com/admin/api/tumurunler")
      .then(function (gelenVeri) {
        setUrunler(gelenVeri.data);
        setSabitArray(gelenVeri.data);
      });
  }

  useEffect(urunleriAl, []);

  function urunAra(event) {
    var arananKelime = event.target.value;

    var bosArray = sabitArray.filter(function (bakilan) {
      return (
        bakilan.isim.toLowerCase().includes(arananKelime.toLowerCase()) ||
        bakilan.marka.toLowerCase().includes(arananKelime.toLowerCase()) ||
        bakilan._id.includes(arananKelime)
      );
    });

    setUrunler(bosArray);
  }

  function urunSil(event) {
    var id = event.target.id;
    axios
      .delete("https://devshop-web.herokuapp.com/admin/api/urunsil?id=" + id)
      .then(function (gelenVeri) {
        if (gelenVeri.data.sonuc === true) {
          var bosArray = sabitArray.filter(function (bakilan) {
            return bakilan._id !== id;
          });

          setSabitArray(bosArray);
          setUrunler(bosArray);
        }
      });
  }

  return (
    <React.StrictMode>
      <div
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin5"
        data-sidebartype="full"
        data-sidebar-position="absolute"
        data-header-position="absolute"
        data-boxed-layout="full"
      >
        <Admin_LeftMenu />
        <Admin_Header />

        <div className="page-wrapper">
          <div className="page-breadcrumb">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="page-title">Ürün Listesi</h4>
                <div className="d-flex align-items-center">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/admin/anasayfa">Anasayfa</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Ürün Listesi
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <div className="col-3">
                <div class="ml-auto">
                  <div class="dl">
                    <input
                      onChange={urunAra}
                      class="form-control mr-sm-2"
                      type="search"
                      placeholder="Ürün İsmi Giriniz"
                      aria-label="Search"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <main role="main" className="col bg-white mt-3 p-3">
              <table class="table">
                <caption>Ürün Listesi</caption>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">İsim</th>
                    <th scope="col">Kategori</th>
                    <th scope="col">Marka</th>
                    <th scope="col">İnd. Fiyat</th>
                    <th scope="col">Nor. Fiyat</th>
                    <th scope="col">Satış Sayısı</th>
                    <th scope="col">Stok</th>
                    <th scope="col">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {urunler.map(function (urun, index) {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{urun.isim}</td>
                        <td>{urun.kategori}</td>
                        <td>{urun.marka}</td>
                        <td>{urun.ind_fiyat}</td>
                        <td>{urun.normal_fiyat}</td>
                        <td>{urun.satilma}</td>
                        <td>
                          S-{urun.stok.s} M-{urun.stok.m} L-{urun.stok.l} XL-
                          {urun.stok.xl}
                        </td>
                        <td>
                          <button
                            onClick={urunSil}
                            id={urun._id}
                            className="btn btn-danger"
                          >
                            Sil
                          </button>
                          <a
                            href={`/admin/urun_duzenle?id=${urun._id}`}
                            className="ml-2 btn btn-dark"
                          >
                            Düzenle
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </main>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default AdminProductListPage;
