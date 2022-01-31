import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Product_CreateComment = (props) => {
  const parametreler = useParams();
  const [durum, setDurum] = useState(0);
  /*
    0 : ilk durum,
    1 : yükleniyor,
    2 : onay için bekliyor
  */

  function yorumEkle(event) {
    setDurum(1); // yükleniyor.
    var uyeisim = props.uyeisim;
    var uyeid = props.uyeid;
    var icerik = event.target.yorum.value;
    var urun_id = parametreler.id;
    var yildiz = event.target.yildiz.value;

    axios
      .post("https://devshop-web.herokuapp.com/api/yorum", {
        urun_id: urun_id,
        isim: uyeisim,
        kullanici_id: uyeid,
        icerik: icerik,
        yildiz: yildiz,
      })
      .then(function (gelenVeri) {
        setDurum(2); // onay için bekliyor
        event.target.yorum.value = "";
      });

    event.preventDefault();
  }

  return (
    <React.StrictMode>
      <form onSubmit={yorumEkle} className="bg-light p-2 rounded mb-2">
        <div className="pb-2 pr-2">Yorum Yap</div>
        <div className="form-group">
          <div className="row">
            <div className="col-sm-10">
              <textarea
                placeholder="Yorumunuzu buraya girebilirsiniz"
                rows="1"
                name="yorum"
                className="form-control"
                aria-label="With textarea"
                required
              ></textarea>
            </div>
            <div className="col-sm-1">
              <div class="btn-group">
                <select name="yildiz" class="custom-select" required>
                  <option value="1">1 Puan</option>
                  <option value="2">2 Puan</option>
                  <option value="3">3 Puan</option>
                  <option value="4">4 Puan</option>
                  <option value="5" selected>
                    5 Puan
                  </option>
                </select>
              </div>
            </div>
            <div className="1">
              <button
                type="submit"
                class="btn btn-warning"
                disabled={`${durum === 1 ? "disabled" : ""}`}
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
        {durum === 2 && <small className="pl-2">Yorumunuz onay bekliyor</small>}
      </form>
    </React.StrictMode>
  );
};

export default Product_CreateComment;
