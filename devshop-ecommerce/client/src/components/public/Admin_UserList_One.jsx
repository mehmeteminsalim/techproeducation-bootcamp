import axios from "axios";
import React, { useState } from "react";

const Admin_UserList_One = (props) => {
  const [engel, setEngel] = useState(props.engel);

  function engelle() {
    setEngel(1);
    axios.patch(
      "https://devshop-web.herokuapp.com/admin/api/kullanici_engel",
      {
        id: props.id,
        engel: 1,
      },
      { withCredentials: true }
    );
  }
  function engeliKaldir() {
    setEngel(0);
    axios.patch(
      "https://devshop-web.herokuapp.com/admin/api/kullanici_engel",
      {
        id: props.id,
        engel: 0,
      },
      { withCredentials: true }
    );
  }

  return (
    <tr>
      <td>{props.index}</td>
      <td>
        {props.isim} {props.soyisim}
      </td>
      <td>{props.telefon}</td>
      <td>{props.email}</td>
      <td>{props.adres}</td>
      <td>{props.cinsiyet}</td>
      <td>
        {engel === 0 && (
          <button onClick={engelle} className="btn btn-info">
            Engelle
          </button>
        )}

        {engel === 1 && (
          <button onClick={engeliKaldir} className="btn btn-success">
            Engeli Kaldır
          </button>
        )}
      </td>
    </tr>
  );
};

export default Admin_UserList_One;
