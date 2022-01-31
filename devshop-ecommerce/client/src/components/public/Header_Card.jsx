import React from "react";
import { useCookies } from "react-cookie";

const Header_Card = () => {
  const [cookies, setCookie] = useCookies(["sepet"]);

  var toplam = 0;

  if (cookies.sepet !== undefined) {
    for (var i = 0; i < cookies.sepet.length; i++) {
      toplam += cookies.sepet[i].miktar;
    }
  }

  return (
    <a href="/sepetim" className="widget-header pl-3 ml-3">
      <div className="icon icon-sm rounded-circle border">
        <i className="fa fa-shopping-cart"></i>
      </div>
      <span className="badge badge-pill badge-danger notify">{toplam}</span>
    </a>
  );
};

export default Header_Card;
