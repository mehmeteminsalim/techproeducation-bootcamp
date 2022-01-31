import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin_LastComments_One from "./Admin_LastComments_One";

const Admin_LastComments = () => {
  const [yorumlar, setYorumlar] = useState([]);

  function yorumlariAl() {
    axios
      .get("https://devshop-web.herokuapp.com/admin/api/sonyorumlar")
      .then(function (gelenVeri) {
        setYorumlar(gelenVeri.data);
      });
  }

  useEffect(yorumlariAl, []);

  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Son Yorumlar</h4>
        </div>
        <div className="comment-widgets scrollable">
          {yorumlar.map(function (yorum) {
            return (
              <Admin_LastComments_One
                key={yorum._id}
                id={yorum._id}
                isim={yorum.isim}
                icerik={yorum.icerik}
                tarih={yorum.tarih}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin_LastComments;
