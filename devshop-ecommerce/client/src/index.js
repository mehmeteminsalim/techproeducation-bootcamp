import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CartPage from "./components/pages/CartPage.jsx";
import CategoryPage from "./components/pages/CategoryPage.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import ProductPage from "./components/pages/ProductPage.jsx";
import RegisterPage from "./components/pages/RegisterPage.jsx";
import { CookiesProvider } from "react-cookie";
import PaymentPage from "./components/pages/PaymentPage.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ProfilePage from "./components/pages/ProfilePage.jsx";
import ContactDeliveryInfo_Page from "./components/pages/ContactDeliveryInfo_Page.jsx";
import AdminHomePage from "./components/pages/AdminHomePage.jsx";
import AdminAddProductPage from "./components/pages/AdminAddProductPage.jsx";
import AdminProductListPage from "./components/pages/AdminProductListPage.jsx";
import AdminCategoriesPage from "./components/pages/AdminCategoriesPage.jsx";
import AdminCommentListPage from "./components/pages/AdminCommentListPage.jsx";
import AdminUserListPage from "./components/pages/AdminUserListPage.jsx";
import AdminOrderListPage from "./components/pages/AdminOrderListPage.jsx";
import AdminLoginPage from "./components/pages/AdminLoginPage.jsx";
import AdminEditProductPage from "./components/pages/AdminEditProductPage.jsx";
const promise = loadStripe(
  "pk_test_51INGWaEKIejjwtwZG64KMynkwBQHXzXXuBvTugXlCaLAYMz54K17DfnT0jpAcxbQ5KJonZua4ryZn88QKozYhUV100zYmIoFNH"
);

ReactDOM.render(
  <CookiesProvider>
    <Router>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/urun/:id">
        <ProductPage />
      </Route>
      <Route path="/kategori/:kategori_url">
        <CategoryPage />
      </Route>
      <Route path="/sepetim">
        <CartPage />
      </Route>
      <Route path="/kayit">
        <RegisterPage />
      </Route>
      <Route path="/giris">
        <LoginPage />
      </Route>
      <Route path="/odeme">
        <Elements stripe={promise}>
          <PaymentPage />
        </Elements>
      </Route>
      <Route path="/profilim">
        <ProfilePage />
      </Route>
      <Route path="/kargo-bilgileri">
        <ContactDeliveryInfo_Page />
      </Route>
      <Route path="/admin/giris"></Route>
      <Route path="/admin/anasayfa">
        <AdminHomePage />
      </Route>
      <Route path="/admin/urunler">
        <AdminProductListPage />
      </Route>
      <Route path="/admin/urun-ekle">
        <AdminAddProductPage />
      </Route>
      <Route path="/admin/siparisler">
        <AdminOrderListPage />
      </Route>
      <Route path="/admin/giris">
        <AdminLoginPage />
      </Route>
      <Route path="/admin/siparis-duzenle"></Route>
      <Route path="/admin/yorumlar">
        <AdminCommentListPage />
      </Route>
      <Route path="/admin/kategoriler">
        <AdminCategoriesPage />
      </Route>
      <Route path="/admin/kullanicilar">
        <AdminUserListPage />
      </Route>
      <Route path="/admin/urun_duzenle">
        <AdminEditProductPage />
      </Route>
    </Router>
  </CookiesProvider>,
  document.getElementById("root")
);
