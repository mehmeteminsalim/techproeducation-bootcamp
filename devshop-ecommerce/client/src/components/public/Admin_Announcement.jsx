import axios from "axios";
import React, { useEffect, useState } from "react";

const Admin_Announcement = () => {
  const [duyurular, setDuyurular] = useState([]);

  function duyurulariAl() {
    axios
      .get("https://devshop-web.herokuapp.com/admin/api/duyuru")
      .then(function (gelenVeri) {
        setDuyurular(gelenVeri.data);
      });
  }

  useEffect(duyurulariAl, []);

  function duyuruEkle(event) {
    var icerik = event.target.duyuru.value;
    axios
      .post("https://devshop-web.herokuapp.com/admin/api/duyuru", {
        duyuru: icerik,
      })
      .then(function (gelenVeri) {
        setDuyurular(function (onceki) {
          return [{ duyuru: icerik }, ...onceki];
        });
      });

    event.preventDefault();
    event.target.reset();
  }

  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Duyurular</h4>
          <div className="feed-widget">
            <ul className="list-style-none feed-body m-0 p-b-20">
              <li className="p-2">
                <form onSubmit={duyuruEkle}>
                  <div className="row">
                    <input
                      name="duyuru"
                      autoComplete="off"
                      type="text"
                      className="form-control col-sm-8 "
                      placeholder="Duyuru Ekleyin"
                    />
                    <div className="col-sm-4">
                      <button type="submit" className="ml-1 btn btn-info">
                        Kaydet
                      </button>
                    </div>
                  </div>
                </form>
              </li>
              {duyurular.map(function (duyuru) {
                return (
                  <li className="feed-item">
                    <div className="feed-icon bg-info">
                      <i className="far fa-bell"></i>
                    </div>
                    {duyuru.duyuru}
                    <span className="ml-auto font-12 text-muted">
                      {duyuru.tarih}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Announcement;
