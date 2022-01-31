import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Admin_Header from "../public/Admin_Header";
import Admin_CommentList_One from "../public/Admin_CommentList_One";
import Admin_LeftMenu from "../public/Admin_LeftMenu";

const AdminCommentList = () => {
  const [yorumlar, setYorumlar] = useState([]);
  const [yorumYok, setYorumYok] = useState(false);
  const query = new URLSearchParams(useLocation().search);

  const sayfa = query.get("sayfa") === null ? 1 : query.get("sayfa");

  function yorumlariAl() {
    axios
      .get(
        "https://devshop-web.herokuapp.com/admin/api/tumyorumlar?sayfa=" + sayfa
      )
      .then(function (gelenVeri) {
        setYorumlar(gelenVeri.data);
        if (gelenVeri.data.length < 1) {
          setYorumYok(true);
        }
      });
  }

  useEffect(yorumlariAl, []);

  return (
    <React.StrictMode>
      <div
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin5"
        data-sidebartype="full"
        data-sidebar-position="absolute"
        data-header-position="absolute"
        data-boxed-layout="full"
      >
        <Admin_LeftMenu />
        <Admin_Header />

        <div className="page-wrapper">
          <div className="page-breadcrumb">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="page-title">Yorum Listesi</h4>
                <div className="d-flex align-items-center">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/admin/anasayfa">Anasayfa</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Tüm Yorumlar
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <div className="col-3">
                <div className="ml-auto"></div>
              </div>
            </div>
          </div>
          <div className="row ">
            <main role="main" className="col bg-white mt-3">
              <div className="p-3">
                {yorumYok === true && "Herhangi bir yorum bulunamadı."}

                {yorumlar.map(function (yorum) {
                  return (
                    <Admin_CommentList_One
                      onay={yorum.onay}
                      yildiz={yorum.yildiz}
                      key={yorum._id}
                      id={yorum._id}
                      urun_id={yorum.urun_id}
                      isim={yorum.isim}
                      icerik={yorum.icerik}
                      tarih={yorum.tarih}
                    />
                  );
                })}
              </div>
            </main>
          </div>

          <nav className="mt-4" aria-label="Page navigation sample">
            <div className="p-3 d-flex justify-content-between">
              <div>
                {parseInt(sayfa) > 1 ? (
                  <a
                    className={`page-link`}
                    href={`?sayfa=${parseInt(sayfa) - 1}`}
                  >
                    Önceki Sayfa
                  </a>
                ) : (
                  <span className=" disabled"></span>
                )}
              </div>

              <div>
                <a className="page-link" href={`?sayfa=${parseInt(sayfa) + 1}`}>
                  Sonraki Sayfa
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default AdminCommentList;
