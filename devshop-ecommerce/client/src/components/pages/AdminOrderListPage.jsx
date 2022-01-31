import axios from "axios";
import React, { useEffect, useState } from "react";
import Admin_Categories_One from "../public/Admin_Categories_One";
import Admin_Header from "../public/Admin_Header";
import Admin_LeftMenu from "../public/Admin_LeftMenu";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin_OrderList_One from "../public/Admin_OrderList_One";
import { useLocation } from "react-router";

const AdminOrderListPage = () => {
  const query = new URLSearchParams(useLocation().search);
  var sayfa = query.get("sayfa");
  const [siparisler, setSiparisler] = useState([]);

  function siparisleriAl() {
    axios
      .get(
        "https://devshop-web.herokuapp.com/admin/api/tum_siparisler?sayfa=" +
          sayfa
      )
      .then(function (gelenVeri) {
        setSiparisler(gelenVeri.data);
      });
  }

  useEffect(siparisleriAl);

  return (
    <React.StrictMode>
      <ToastContainer />
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
                <h4 className="page-title">Sipariş Listesi</h4>
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
                        Tüm Siparişler
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
              {siparisler.map(function (siparis, index) {
                return (
                  <Admin_OrderList_One
                    index={index + 1}
                    key={siparis._id}
                    id={siparis._id}
                  />
                );
              })}
            </main>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default AdminOrderListPage;
