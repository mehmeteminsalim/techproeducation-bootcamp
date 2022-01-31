import axios from "axios";
import React, { useEffect, useState } from "react";

const Admin_LastOrders = () => {
  const [siparisler, setSiparisler] = useState([]);
  function siparisleriAl() {
    axios
      .get("https://devshop-web.herokuapp.com/admin/api/son_siparisler")
      .then(function (gelenVeri) {
        setSiparisler(gelenVeri.data);
      });
  }
  useEffect(siparisleriAl, []);
  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Bekleyen Siparişler</h4>

          <table class="table table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tutar</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {siparisler.map(function (siparis) {
                return (
                  <tr>
                    <th scope="row" className="font-small">
                      <small>
                        {siparis.urunler.map(function (urun) {
                          return (
                            <React.StrictMode>
                              {urun.isim} x {urun.miktar} <br />
                            </React.StrictMode>
                          );
                        })}
                      </small>
                    </th>
                    <td>{siparis.tutar}</td>
                    <td className="d-flex justify-content-end">
                      <button className="btn btn-dark">Siparişe Git</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin_LastOrders;
