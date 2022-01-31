import axios from "axios";
import React, { useState } from "react";

const Admin_Categories_One = (props) => {
  const [durum, setDurum] = useState(false);
  /*
    false : gizli
    true  : açık
   */

  const [aciklama, setAciklama] = useState("");

  function acKapat() {
    setDurum(!durum);
    setAciklama(props.aciklama);
  }

  function aciklamaDegisti(event) {
    setAciklama(event.target.value);
  }

  function bilgileriGuncelle(event) {
    axios
      .patch(
        "https://devshop-web.herokuapp.com/api/kategori_bireysel/guncelle?id=" +
          props.id,
        {
          kategori_aciklama: aciklama,
        }
      )
      .then(function (gelenVeri) {
        props.kategoriGuncellendi();
        setDurum(false);
      });
  }

  function kategoriyiSil() {
    axios
      .delete(
        "https://devshop-web.herokuapp.com/api/kategori_bireysel/sil?id=" +
          props.id
      )
      .then(function (gelenVeri) {
        props.kategoriGuncellendi();
        setDurum(false);
      });
  }

  return (
    <div className="m-3">
      <div onClick={acKapat} className="row ml-1 mr-1 pb-2 border-bottom">
        <div className="col-sm-2">
          {props.index}. {props.isim}
        </div>
        <div className="col-sm-2">{props.url}</div>
        <div className="col-sm-7">{props.aciklama}</div>
        <div className="col-sm-1">Aç</div>
      </div>
      <div>
        <div
          className={`p-3 mt-2 bg-white text-dark ${
            durum === false && "d-none"
          }`}
        >
          Kategoriyi Düzenle
          <div className="form-row mt-2">
            <div className="form-group col-md-6">
              <input
                defaultValue={props.isim}
                disabled
                type="text"
                className="form-control"
                id="inputEmail4"
                name="isim"
                placeholder="İsim giriniz"
              />
            </div>
            <div className="form-group col-md-6">
              <input
                defaultValue={props.url}
                disabled
                type="text"
                className="form-control"
                id="inputPassword4"
                name="url"
                placeholder="URL giriniz"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-10">
              <input
                defaultValue={props.aciklama}
                type="text"
                className="form-control"
                id="inputAddress"
                name="aciklama"
                placeholder="Açıklama giriniz"
                onChange={aciklamaDegisti}
              />
            </div>

            <div className="form-group col-md-1 d-flex align-items-end justify-content-end">
              <button
                onClick={bilgileriGuncelle}
                type="submit"
                className="btn btn-primary"
              >
                Kaydet
              </button>
            </div>
            <div className="form-group col-md-1 d-flex align-items-end justify-content-start">
              <button
                onClick={kategoriyiSil}
                type="submit"
                className="btn btn-danger"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Categories_One;
