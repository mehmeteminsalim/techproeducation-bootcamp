import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile_Information = () => {
  const [bilgiler, setBilgiler] = useState([]);
  const [durum, setDurum] = useState(0);
  /*
    0 : normal durum
    1 : güncellendi.
    2 : kaydediliyor.
  */

  function bilgileriAl() {
    axios
      .get("https://devshop-web.herokuapp.com/api/profil/bilgiler", {
        withCredentials: true,
      })
      .then(function (gelenVeri) {
        setBilgiler(gelenVeri.data);
        console.log("bilgiler", gelenVeri.data);
      });
  }

  useEffect(bilgileriAl, []);

  function bilgileriGonder(event) {
    setDurum(2);
    axios
      .patch(
        "https://devshop-web.herokuapp.com/api/profil/bilgiler",
        {
          isim: event.target.isim.value,
          soyisim: event.target.soyisim.value,
          adres: event.target.adres.value,
          telefon: event.target.telefon.value,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (gelenVeri) {
        setDurum(1);
      });

    event.preventDefault();
  }

  return (
    <main className="col-md-9">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-4">Profil</h4>
          <form onSubmit={bilgileriGonder}>
            <div className="form-row">
              <div className="col form-group">
                <label>İsim</label>
                <input
                  name="isim"
                  type="text"
                  className="form-control"
                  defaultValue={bilgiler.isim}
                />
              </div>
              <div className="col form-group">
                <label>Soyisim</label>
                <input
                  name="soyisim"
                  type="text"
                  className="form-control"
                  defaultValue={bilgiler.soyisim}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  defaultValue={bilgiler.email}
                  disabled
                />
              </div>
              <div className="form-group col-md-6">
                <label>Telefon</label>
                <input
                  name="telefon"
                  type="text"
                  className="form-control"
                  defaultValue={bilgiler.telefon}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col">
                <label>Adres</label>
                <input
                  name="adres"
                  type="text"
                  className="form-control"
                  defaultValue={bilgiler.adres}
                />
              </div>
            </div>

            <button className="btn btn-primary btn-block">
              {durum === 0 && "Kaydet"}
              {durum === 1 && "Güncellendi"}
              {durum === 2 && "Kaydediliyor.."}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile_Information;
