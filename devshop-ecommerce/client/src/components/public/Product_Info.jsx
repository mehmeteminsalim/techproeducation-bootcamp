import React from "react";

const Product_Info = (props) => {
  return (
    <section className="section-pagetop bg">
      <div className="container">
        <nav>
          <ol className="breadcrumb text-white">
            <li className="breadcrumb-item">
              <a href="/">Anasayfa</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/kategori/${props.kategori_url}`}>
                {props.kategori_isim}
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {props.isim}
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Product_Info;
