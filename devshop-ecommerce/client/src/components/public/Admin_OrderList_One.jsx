import axios from "axios";
import React, { useEffect, useState } from "react";

const Admin_OrderList_One = (props) => {
  const [bilgiler, setBilgiler] = useState({
    urunler: [{}],
    iletisim: [{}],
    durum: [{}],
  });

  const [bir, setBir] = useState(false);
  const [iki, setIki] = useState(false);
  const [uc, setUc] = useState(false);
  const [dort, setDort] = useState(false);

  const [durum, setDurum] = useState(false);
  /*
      false : gizli
      true  : açık
  */

  function uruneAitBilgilerAl() {
    axios
      .get(
        "https://devshop-web.herokuapp.com/admin/api/siparis_bireysel?id=" +
          props.id
      )
      .then(function (gelenVeri) {
        setBilgiler(gelenVeri.data[0]);
        if (gelenVeri.data[0].durum.length > 3) {
          setBir(true);
          setIki(true);
          setUc(true);
          setDort(true);
        } else if (gelenVeri.data[0].durum.length > 2) {
          setBir(true);
          setIki(true);
          setUc(true);
          setDort(false);
        } else if (gelenVeri.data[0].durum.length > 1) {
          setBir(true);
          setIki(true);
          setUc(false);
          setDort(false);
        } else if (gelenVeri.data[0].durum.length > -1) {
          setBir(true);
          setIki(false);
          setUc(false);
          setDort(false);
        }
      });
  }

  useEffect(uruneAitBilgilerAl, [props.id !== undefined]);

  function acKapat() {
    setDurum(!durum);
  }

  function bilgileriGuncelle(event) {
    var nameDegeri = event.target.name;
    var seciliMi = event.target.checked;

    var bosDurum = [];

    if (nameDegeri === "dort" && seciliMi === true) {
      setBir(true);
      setIki(true);
      setUc(true);
      setDort(true);

      bosDurum.push({ islem: "Sipariş Hazırlanıyor" });
      bosDurum.push({ islem: "Kargoya Verildi" });
      bosDurum.push({ islem: "Kargo Yola Çıktı" });
      bosDurum.push({ islem: "Teslimat İçin Hazır" });
    } else if (nameDegeri === "dort" && seciliMi === false) {
      setBir(true);
      setIki(true);
      setUc(true);
      setDort(false);

      bosDurum.push({ islem: "Sipariş Hazırlanıyor" });
      bosDurum.push({ islem: "Kargoya Verildi" });
      bosDurum.push({ islem: "Kargo Yola Çıktı" });
    }

    if (nameDegeri === "uc" && seciliMi === true) {
      setBir(true);
      setIki(true);
      setUc(true);
      setDort(false);
      bosDurum.push({ islem: "Sipariş Hazırlanıyor" });
      bosDurum.push({ islem: "Kargoya Verildi" });
      bosDurum.push({ islem: "Kargo Yola Çıktı" });
    } else if (nameDegeri === "uc" && seciliMi === false) {
      setBir(true);
      setIki(true);
      setUc(false);
      setDort(false);
      bosDurum.push({ islem: "Sipariş Hazırlanıyor" });
      bosDurum.push({ islem: "Kargoya Verildi" });
    }

    if (nameDegeri === "iki" && seciliMi === true) {
      setBir(true);
      setIki(true);
      setUc(false);
      setDort(false);
      bosDurum.push({ islem: "Sipariş Hazırlanıyor" });
      bosDurum.push({ islem: "Kargoya Verildi" });
    } else if (nameDegeri === "iki" && seciliMi === false) {
      setIki(true);
      setIki(false);
      setUc(false);
      setDort(false);
      bosDurum.push({ islem: "Sipariş Hazırlanıyor" });
    }

    if (nameDegeri === "bir" && seciliMi === true) {
      setBir(true);
      setIki(false);
      setUc(false);
      setDort(false);
      bosDurum.push({ islem: "Sipariş Hazırlanıyor" });
    } else if (nameDegeri === "bir" && seciliMi === false) {
      setBir(true);
      setIki(false);
      setUc(false);
      setDort(false);
      bosDurum.push({ islem: "Sipariş Hazırlanıyor" });
    }

    axios.patch(
      "https://devshop-web.herokuapp.com/admin/api/siparis_durum_guncelle",
      {
        id: props.id,
        durum: bosDurum,
      }
    );
  }

  function teslimEt() {
    axios
      .patch("https://devshop-web.herokuapp.com/admin/api/siparis_teslim", {
        id: props.id,
        durum: [
          { islem: "Sipariş Hazırlanıyor" },
          { islem: "Kargoya Verildi" },
          { islem: "Kargo Yola Çıktı" },
          { islem: "Teslimat İçin Hazır" },
        ],
      })
      .then(function (gelenVeri) {
        if (gelenVeri.data.sonuc === true) {
          setBilgiler(function (oncekiState) {
            return { ...oncekiState, sonuc: true };
          });
        }
      });
  }

  return (
    <div className="m-3">
      <div onClick={acKapat} className="row ml-1 mr-1 pb-2 border-bottom">
        <div className="col-sm-4">
          <b>{props.index}.</b> {bilgiler.tarih}
        </div>
        <div className="col-sm-1">₺{bilgiler.tutar}</div>
        <div className="col-sm-4">{bilgiler.adres}</div>
        <div className="col-sm-2">
          {bilgiler.sonuc === true && <b className="text-success">Bitti</b>}
          {dort === true && bilgiler.sonuc === false && (
            <span className="text-danger">Teslimat Bekleniyor</span>
          )}
          {uc === true && dort === false && bilgiler.sonuc === false && (
            <span className="text-danger">Kargo Yola Çıktı</span>
          )}

          {iki === true &&
            uc === false &&
            dort === false &&
            bilgiler.sonuc === false && (
              <span className="text-danger">Kargoya Verildi</span>
            )}

          {bir === true &&
            iki === false &&
            uc === false &&
            dort === false &&
            bilgiler.sonuc === false && (
              <span className="text-danger">Sipariş Hazırlanıyor</span>
            )}
        </div>
        <div className="col-sm-1">Aç</div>
      </div>
      <div>
        <div
          className={`p-3 mt-2 bg-white text-dark ${
            durum === false && "d-none"
          }`}
        >
          <article className="card order-group mb-4 bg-light-gray">
            <header className="card-header bg-light-gray">
              <b className="d-inline-block mr-3 bg-light-gray">
                Takip No : #{bilgiler.takip_no}
              </b>
              <span>Tarih: {bilgiler.tarih}</span>
              <button onClick={teslimEt} className="btn btn-light float-right">
                Teslim Edildi
              </button>
            </header>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <h6 className="text-muted">Ödeme</h6>
                  <p>
                    <span className="text-success">
                      <i className="fab fa-lg fa-cc-visa"></i>Ödendi
                    </span>
                    <br />
                    <span className="b">Toplam: ₺{bilgiler.tutar} </span>
                  </p>
                </div>
                <div className="col-md-4">
                  <h6 className="text-muted">İletişim</h6>
                  <p>
                    {bilgiler.iletisim[0].isim} {bilgiler.iletisim[0].soyisim}
                    <br /> {bilgiler.iletisim[0].telefon} <br />
                    {bilgiler.iletisim[0].email}
                  </p>
                </div>
                <div className="col-md-4">
                  <h6 className="text-muted">Adres</h6>
                  <p>{bilgiler.adres}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-6 col-md-3">
                  <input
                    onChange={bilgileriGuncelle}
                    name="bir"
                    type="checkbox"
                    defaultChecked={`${bir === true ? true : false}`}
                    checked={bir}
                  />
                  <span className="text">Sipariş hazırlanıyor</span>
                </div>

                <div className="col-sm-6 col-md-3">
                  <input
                    onChange={bilgileriGuncelle}
                    name="iki"
                    type="checkbox"
                    defaultChecked={`${iki === true ? true : false}`}
                    checked={iki}
                  />
                  <span className="text"> Kargoya verildi</span>
                </div>

                <div className="col-sm-6 col-md-3">
                  <input
                    onChange={bilgileriGuncelle}
                    name="uc"
                    type="checkbox"
                    defaultChecked={`${uc === true ? true : false}`}
                    checked={uc}
                  />
                  <span className="text"> Kargo yola çıktı </span>
                </div>

                <div className="col-sm-6 col-md-3">
                  <input
                    onChange={bilgileriGuncelle}
                    name="dort"
                    type="checkbox"
                    defaultChecked={`${dort === true ? true : false}`}
                    checked={dort}
                  />
                  <span className="text">Teslimat için hazır</span>
                </div>
              </div>
              <hr />
              <ul className="row">
                {bilgiler.urunler.map(function (urun) {
                  return (
                    <li className="col-md-4">
                      <figure className="itemside  mb-3">
                        <div className="aside">
                          <img src={urun.resim} className="img-sm border" />
                        </div>
                        <figcaption className="info align-self-center">
                          <p className="title">{urun.isim}</p>
                          <span className="text-muted">
                            ₺{urun.fiyat} x {urun.miktar}{" "}
                          </span>
                        </figcaption>
                      </figure>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Admin_OrderList_One;
