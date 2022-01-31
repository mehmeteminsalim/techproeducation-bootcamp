import axios from "axios";
import React, { useEffect, useState } from "react";

const Header_Menu = () => {
  const [kategoriler, setKategoriler] = useState([]);

  function kategorileriAl() {
    axios
      .get("https://devshop-web.herokuapp.com/api/kategori_liste")
      .then(function (gelenVeri) {
        setKategoriler(gelenVeri.data);
      });
  }

  useEffect(kategorileriAl, []);

  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link pl-0" href="/">
          <strong>Anasayfa</strong>
        </a>
      </li>
      {kategoriler.map(function (kategori) {
        return (
          <li className="nav-item">
            <a className="nav-link" href={`/kategori/${kategori.kategori_url}`}>
              {kategori.kategori_isim}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Header_Menu;
