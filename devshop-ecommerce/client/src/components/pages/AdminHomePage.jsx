import React from "react";
import Admin_Announcement from "../public/Admin_Announcement.jsx";
import Admin_Header from "../public/Admin_Header.jsx";
import Admin_LastComments from "../public/Admin_LastComments.jsx";
import Admin_LastOrders from "../public/Admin_LastOrders.jsx";
import Admin_LeftMenu from "../public/Admin_LeftMenu.jsx";
import Admin_Popular10Products from "../public/Admin_Popular10Products.jsx";
import Admin_SaleSummary from "../public/Admin_SaleSummary.jsx";

const AdminHomePage = () => {
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
              <div className="col-5">
                <h4 className="page-title">Anasayfa</h4>
                <div className="d-flex align-items-center">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="#">Anasayfa</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Panel
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <div className="col-7"></div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <Admin_SaleSummary />
              <Admin_Announcement />
            </div>

            <Admin_Popular10Products />

            <div className="row">
              <Admin_LastComments />
              <Admin_LastOrders />
            </div>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default AdminHomePage;
