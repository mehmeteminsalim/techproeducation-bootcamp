import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin_Popular10Products = () => {
  const [bilgiler, setBilgiler] = useState([]);

  function bilgileriAl() {
    axios
      .get("https://devshop-web.herokuapp.com/admin/api/populerurunler")
      .then(function (gelenVeri) {
        setBilgiler(gelenVeri.data);
      });
  }

  useEffect(bilgileriAl, []);

  function urunSil(event) {
    console.log(event.target.value);
    axios
      .delete(
        "https://devshop-web.herokuapp.com/admin/api/urunsil?id=" +
          event.target.value
      )
      .then(function (gelenVeri) {
        if (gelenVeri.data.sonuc === true) {
          urunuArraydenKaldir(event.target.value);
        } else {
          alert("Bir hata oluştu, ürün silinemedi.");
        }
      });
  }

  function urunuArraydenKaldir(id) {
    var bosArray = bilgiler.filter(function (bakilan) {
      return bakilan._id !== id;
    });

    setBilgiler(bosArray);
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="d-md-flex align-items-center">
              <div>
                <h5 className="card-title">En Çok Satan 10 Ürün</h5>
                <h6 className="card-subtitle">
                  Çok satan ürünleri görüntüleyebilirsiniz
                </h6>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table v-middle">
              <thead>
                <tr className="bg-light">
                  <th className="border-top-0">Ürün</th>
                  <th className="border-top-0">Kategori</th>
                  <th className="border-top-0">Marka</th>
                  <th className="border-top-0">İnd. Fiyat</th>
                  <th className="border-top-0">Nor. Fiyat</th>
                  <th className="border-top-0">S. Sayı</th>
                  <th className="border-top-0">Sil</th>
                  <th className="border-top-0">Düzenle</th>
                </tr>
              </thead>
              <tbody>
                {bilgiler.map(function (urun) {
                  return (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="m-r-10"></div>
                          <div className="">
                            <h4 className="m-b-0 font-16">{urun.isim}</h4>
                          </div>
                        </div>
                      </td>
                      <td>{urun.kategori}</td>
                      <td>{urun.marka}</td>
                      <td>{urun.ind_fiyat}</td>
                      <td>{urun.normal_fiyat}</td>
                      <td>{urun.satilma}</td>
                      <td>
                        <button
                          value={urun._id}
                          className="btn btn-danger"
                          onClick={(e) => {
                            if (
                              window.confirm(
                                "Silmek istediğinizden emin misiniz ?"
                              )
                            ) {
                              urunSil(e);
                            }
                          }}
                        >
                          Sil
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-secondary">Düzenle</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Popular10Products;
