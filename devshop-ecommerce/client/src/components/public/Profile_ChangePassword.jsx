import React, { useState } from "react";
import axios from "axios";
const Profile_ChangePassword = () => {
  const [durum, setDurum] = useState(0);
  /*
    0 : ilk hali
    1 : şifre güncellendi
    2 : yükleniyor
    3 : şifreler aynı değil
  */

  function sifreDegistir(event) {
    if (event.target.sifre.value !== event.target.resifre.value) {
      setDurum(3);
    } else {
      setDurum(2);
      axios
        .post(
          "https://devshop-web.herokuapp.com/api/profil/sifreguncelle",
          {
            sifre: event.target.sifre.value,
          },
          {
            withCredentials: true,
          }
        )
        .then(function (gelenVeri) {
          if (gelenVeri.data.sonuc === true) {
            setDurum(1);
          } else {
            setDurum(0);
          }
        });
    }

    event.preventDefault();
  }

  return (
    <main className="col-md-9">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-4">Şifre Değiştir</h4>
          <form onSubmit={sifreDegistir}>
            <div className="form-row">
              <div className="col form-group">
                <label>Şifre</label>
                <input name="sifre" type="password" className="form-control" />
              </div>
              <div className="col form-group">
                <label>Şifre Tekrarı</label>
                <input
                  name="resifre"
                  type="password"
                  className="form-control"
                />
              </div>
            </div>

            <button className="btn btn-primary btn-block">
              {durum === 0 && "Kaydet"}
              {durum === 1 && "Güncellendi"}
              {durum === 2 && "Kaydediliyor.."}
              {durum === 3 && "Şifreler Uyuşmuyor"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile_ChangePassword;
