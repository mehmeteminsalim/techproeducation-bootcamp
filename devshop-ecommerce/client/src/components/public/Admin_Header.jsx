import axios from "axios";
import React, { useEffect } from "react";

const Admin_Header = () => {
  async function girisKontrol() {
    await axios
      .get("https://devshop-web.herokuapp.com/api/kullanici/giriskontrol", {
        withCredentials: true,
      })
      .then(function (gelenVeri) {
        if (gelenVeri.data.sonuc === true && gelenVeri.data.rol === "admin") {
          // işleme gerek yok.
        } else {
          window.location.href = "/admin/giris";
        }
      });
  }

  useEffect(girisKontrol, []);

  function cikisYap() {
    axios
      .get("https://devshop-web.herokuapp.com/api/kullanici/cikis", {
        withCredentials: true,
      })
      .then(function (gelenVeri) {
        window.location.href = "/admin/giris";
      });
  }

  return (
    <header className="topbar" data-navbarbg="skin5">
      <nav className="navbar top-navbar navbar-expand-md navbar-dark">
        <div className="navbar-header" data-logobg="skin5">
          <a className="navbar-brand" href="/admin/anasayfa">
            <b className="logo-icon">
              <img
                src="../../assets/images/logo-icon.png"
                alt="homepage"
                className="dark-logo"
                height="40px"
              />
              <img
                src="../../assets/images/logo-light-icon.png"
                alt="homepage"
                className="light-logo"
                height="40px"
              />
            </b>
          </a>
          <a
            className="nav-toggler waves-effect waves-light d-block d-md-none"
            href="javascript:void(0)"
          >
            <i className="ti-menu ti-close"></i>
          </a>
        </div>
        <div
          className="navbar-collapse collapse"
          id="navbarSupportedContent"
          data-navbarbg="skin5"
        >
          <ul className="navbar-nav float-left mr-auto"></ul>
          <ul className="navbar-nav float-right">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
                href=""
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="../../assets/images/users/1.jpg"
                  alt="user"
                  className="rounded-circle"
                  width="31"
                />
              </a>
              <div className="dropdown-menu dropdown-menu-right user-dd animated">
                <button onClick={cikisYap} className="dropdown-item">
                  <i className="ti-user m-r-5 m-l-5"></i>
                  Çıkış Yap
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Admin_Header;
