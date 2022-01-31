import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";

const CartPage_Product = (props) => {
  const [cookies, setCookie] = useCookies(["sepet"]);

  const [detay, setDetay] = useState({
    resimler: {
      bir: "",
      iki: "",
      uc: "",
      dort: "",
    },
    stok: {
      s: 0,
      m: 0,
      l: 0,
      xl: 0,
    },
    yildiz: {
      sayi: 0,
      puan: "0",
    },
    parametreler: {
      taksit: "",
      garanti: "",
      kargo: "",
    },
  });
  const [miktar, setMiktar] = useState(1);
  const [size, setSize] = useState(1);
  const [stokDurumu, setStokDurumu] = useState(true);

  function artir() {
    if (miktar < 15 && miktar < stokSayisiAl()) {
      sepeteEkle(miktar + 1);
      setMiktar(miktar + 1);
      stokKontrol(miktar + 1);
    } else {
      setStokDurumu(false);
    }
  }

  function azalt() {
    if (miktar > 1) {
      sepeteEkle(miktar - 1);
      setMiktar(miktar - 1);
      stokKontrol(miktar - 1);
    }
  }

  function stokKontrol(sayi) {
    if (size === "S") {
      if (sayi > detay.stok.s) setStokDurumu(false);
      else setStokDurumu(true);
    } else if (size === "M") {
      if (sayi > detay.stok.m) setStokDurumu(false);
      else setStokDurumu(true);
    } else if (size === "L") {
      if (sayi > detay.stok.l) setStokDurumu(false);
      else setStokDurumu(true);
    } else if (size === "XL") {
      if (sayi > detay.stok.xl) setStokDurumu(false);
      else setStokDurumu(true);
    }
  }

  function stokSayisiAl() {
    if (size === "S") {
      return detay.stok.s;
    } else if (size === "M") {
      return detay.stok.m;
    } else if (size === "L") {
      return detay.stok.l;
    } else if (size === "XL") {
      return detay.stok.xl;
    }
  }

  function bilgileriAl() {
    setMiktar(props.miktar);
    setSize(props.size);
    axios
      .get("https://devshop-web.herokuapp.com/api/urun/detay/" + props.id)
      .then(function (gelenVeriler) {
        console.log(
          props.miktar,
          stokSayisiIlkDurumKontrol(gelenVeriler.data[0].stok)
        );
        if (
          props.miktar > stokSayisiIlkDurumKontrol(gelenVeriler.data[0].stok)
        ) {
          sepettenKaldir();
        } else {
          setDetay(gelenVeriler.data[0]);
        }
      });
  }

  function stokSayisiIlkDurumKontrol(stok) {
    if (props.size === "S") {
      return stok.s;
    } else if (props.size === "M") {
      return stok.m;
    } else if (props.size === "L") {
      return stok.l;
    } else if (props.size === "XL") {
      return stok.xl;
    }
  }

  function sepettenKaldir() {
    var bosArray = cookies.sepet;
    if (bosArray === undefined) {
      bosArray = [];
    }

    var yeniArray = bosArray.filter(function (bakilan) {
      return !(bakilan.id === props.id && bakilan.size === props.size);
    });

    setCookie("sepet", yeniArray, { path: "/" });
  }

  function sepeteEkle(sayi) {
    var bosArray = new Cookies().get("sepet");
    if (bosArray === undefined) {
      bosArray = [];
    }

    bosArray.forEach((element) => {
      if (element.id === detay._id && element.size === size) {
        element.miktar = sayi;
      }
    });

    setCookie("sepet", bosArray, { path: "/" });
  }

  useEffect(bilgileriAl, [props.miktar !== undefined]);

  return (
    <tr>
      <td>
        <figure className="itemside align-items-center">
          <div className="aside">
            <img src={props.resim} className="img-sm" alt="" />
          </div>
          <figcaption className="info">
            <a href={`/urun/${props.id}`} className="title text-dark">
              {props.isim}
            </a>
            <p className="text-muted small">
              Beden : {props.size} <br /> Adet: {miktar}
            </p>
          </figcaption>
        </figure>
      </td>
      <td>
        <div className="input-group mb-3 input-spinner">
          <div className="input-group-prepend ">
            <button
              onClick={artir}
              className={`btn btn-light ${!stokDurumu && "disabled"}`}
              type="button"
              id="button-plus"
            >
              +
            </button>
          </div>
          <input type="text" className="form-control" value={miktar} />
          <div className="input-group-append">
            <button
              onClick={azalt}
              className="btn btn-light"
              type="button"
              id="button-minus"
            >
              −
            </button>
          </div>
        </div>
      </td>
      <td>
        <div className="price-wrap">
          <var className="price">₺{(props.fiyat * miktar).toFixed(2)}</var>
          <small className="text-muted">₺{props.fiyat} </small>
        </div>
      </td>
      <td className="text-right">
        <button onClick={sepettenKaldir} className="btn btn-light">
          Çıkar
        </button>
      </td>
    </tr>
  );
};

export default CartPage_Product;
