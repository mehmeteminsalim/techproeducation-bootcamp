import axios from "axios";
import React, { useState } from "react";

const Admin_LastComments_One = (props) => {
  const [state, setState] = useState(0);
  /*
    0 : onay bekliyor
    1 : onaylandı
    2 : reddedildi
  */

  function yorumOnayla() {
    axios
      .patch(
        "https://devshop-web.herokuapp.com/admin/api/yorum_islem?onay=1&id=" +
          props.id
      )
      .then(function (gelenVeri) {
        setState(1);
      });
  }

  function yorumReddet() {
    axios
      .patch(
        "https://devshop-web.herokuapp.com/admin/api/yorum_islem?onay=2&id=" +
          props.id
      )
      .then(function (gelenVeri) {
        setState(2);
      });
  }

  return (
    <div className="d-flex flex-row comment-row m-t-0">
      <div className="comment-text w-100">
        <h6 className="font-medium">{props.isim}</h6>
        <span className="m-b-15 d-block">{props.icerik}</span>
        <div className="comment-footer">
          <span className="text-muted float-right">{props.tarih}</span>
          <span
            className={`label label-rounded 
            ${state === 0 && "label-primary"} 
            ${state === 1 && "label-success"} 
            ${state === 2 && "label-danger"}`}
          >
            {state === 0 && "Onay Bekliyor"}
            {state === 1 && "Onaylandı"}
            {state === 2 && "Reddedildi"}
          </span>
          <span className="action-icons ml-3">
            <button className="btn" onClick={yorumOnayla}>
              <i className="ti-check"></i>
            </button>
            <button className="btn" onClick={yorumReddet}>
              <i className="ti-trash"></i>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Admin_LastComments_One;
