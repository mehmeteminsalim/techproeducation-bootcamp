import React from "react";

const Poruduct_CommentAlert = () => {
  return (
    <div className="text-center p-2 bg-light rounded mb-2">
      <div>
        Yorum yapabilmek için üye olmanız ya da giriş yapmanız gerekiyor.
      </div>
      <br />
      <a href="/kayit" class="btn btn-danger">
        Kayıt Ol
      </a>
      <a href="/giris" class="btn btn-danger ml-2">
        Giriş Yap
      </a>
    </div>
  );
};

export default Poruduct_CommentAlert;
