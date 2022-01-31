import axios from "axios";
import React, { useState } from "react";

const Admin_CommentList_One = (props) => {
  const [state, setState] = useState(props.onay);
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
    <div className="d-flex flex-row comment-row m-t-0 border-bottom pt-3">
      <div className="comment-text w-100">
        <span className="m-b-15 d-block">{props.icerik}</span>
        <div className="comment-footer">
          <span className="text-muted float-right">
            <span className="font-medium">{props.isim} - </span>
            {props.tarih}
          </span>
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
          <span className="label text-muted"> {props.yildiz} Yıldız </span>
          <span className="action-icons ml-3">
            <button className="btn" onClick={yorumOnayla}>
              <i className="ti-check"></i>
            </button>
            <button className="btn" onClick={yorumReddet}>
              <i className="ti-trash"></i>
            </button>
            <a
              target="_blank"
              className="btn"
              href={`http://localhost:3000/urun/` + props.urun_id}
            >
              <i className="ti-link"></i>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Admin_CommentList_One;
