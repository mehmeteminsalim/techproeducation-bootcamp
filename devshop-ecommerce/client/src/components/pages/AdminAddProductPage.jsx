import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Admin_Header from "../public/Admin_Header.jsx";
import Admin_LeftMenu from "../public/Admin_LeftMenu.jsx";

const AdminAddProductPage = () => {
  const el = useRef();

  const [progress, setProgress] = useState(0);
  const [kategoriler, setKategoriler] = useState([]);
  const [dosya1, setDosya1] = useState("");
  const [dosya2, setDosya2] = useState("");
  const [dosya3, setDosya3] = useState("");
  const [dosya4, setDosya4] = useState("");

  function kategorileriAl() {
    axios
      .get("https://devshop-web.herokuapp.com/api/kategori_liste")
      .then(function (gelenVeri) {
        setKategoriler(gelenVeri.data);
      });
  }

  useEffect(kategorileriAl, []);

  function handleChange(event) {
    setProgress(0);
    const dosya = event.target.files[0];
    const nameDegeri = event.target.name;

    if (nameDegeri === "dosya1") {
      setDosya1(dosya);
    } else if (nameDegeri === "dosya2") {
      setDosya2(dosya);
    } else if (nameDegeri === "dosya3") {
      setDosya3(dosya);
    } else if (nameDegeri === "dosya4") {
      setDosya4(dosya);
    }
  }

  function uploadFile(event) {
    const formData = new FormData();
    formData.append("isim", event.target.isim.value);
    formData.append("aciklama", event.target.aciklama.value);
    formData.append(
      "kategori",
      event.target.kategori[event.target.kategori.selectedIndex].textContent
    );
    formData.append("kategori_url", event.target.kategori.value);
    formData.append("marka", event.target.marka.value);
    formData.append("renk", event.target.renk.value);
    formData.append("cinsiyet", event.target.cinsiyet.value);
    formData.append("ind_fiyat", event.target.ind_fiyat.value);
    formData.append("normal_fiyat", event.target.normal_fiyat.value);
    formData.append("s", event.target.s.value);
    formData.append("m", event.target.m.value);
    formData.append("l", event.target.l.value);
    formData.append("xl", event.target.xl.value);

    if (dosya1 !== "") {
      formData.append("dosya1", dosya1);
    }
    if (dosya2 !== "") {
      formData.append("dosya2", dosya2);
    }
    if (dosya3 !== "") {
      formData.append("dosya3", dosya3);
    }
    if (dosya4 !== "") {
      formData.append("dosya4", dosya4);
    }

    axios
      .post(
        "https://devshop-web.herokuapp.com/admin/api/urunolustur",
        formData,
        {
          onUploadProgress: (data) => {
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        }
      )
      .then(function (gelenVeri) {
        console.log("Kayıt Tamamdır.");
      });

    event.preventDefault();
    event.target.reset();
  }

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
                <h4 className="page-title">Ürün Ekle</h4>
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
                        Ürün Ekle
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <div className="col-7"></div>
            </div>
          </div>
          <div className="row">
            <main role="main" className="col  pt-3">
              <div className="p-3 ">
                <form onSubmit={uploadFile}>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="row mb-2">
                        <div className="col">
                          <input
                            required
                            className="form-control"
                            type="text"
                            name="isim"
                            placeholder="Başlık"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-6 ">
                          <div className="bg-light p-2 rounded  d-flex align-items-center ">
                            <span class="w-25">Kategori</span>
                            <select
                              name="kategori"
                              class=" w-75 float-right rounded border-light"
                            >
                              {kategoriler.map(function (kategori) {
                                return (
                                  <option value={kategori.kategori_url}>
                                    {kategori.kategori_isim}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 mt-sm-2 mt-md-0">
                          <div className="bg-light p-2 rounded d-flex align-items-center ">
                            <div class="custom-control custom-radio custom-control-inline">
                              <input
                                required
                                value="Erkek"
                                type="radio"
                                id="customRadioInline1"
                                name="cinsiyet"
                                class="custom-control-input"
                              />
                              <label
                                class="custom-control-label"
                                for="customRadioInline1"
                              >
                                Erkek
                              </label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                              <input
                                required
                                value="Kadın"
                                type="radio"
                                id="customRadioInline2"
                                name="cinsiyet"
                                class="custom-control-input"
                              />
                              <label
                                class="custom-control-label"
                                for="customRadioInline2"
                              >
                                Kadın
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col">
                          <input
                            required
                            className="form-control"
                            type="number"
                            step="0.01"
                            name="ind_fiyat"
                            placeholder="İndirimli Fiyat"
                          />
                        </div>
                        <div className="col">
                          <input
                            required
                            className="form-control"
                            type="number"
                            step="0.01"
                            name="normal_fiyat"
                            placeholder="Normal Fiyat"
                          />
                        </div>
                      </div>

                      <div className="row mb-2">
                        <div className="col">
                          <input
                            required
                            className="form-control"
                            type="text"
                            name="marka"
                            placeholder="Marka"
                          />
                        </div>
                        <div className="col">
                          <input
                            required
                            className="form-control"
                            type="text"
                            name="renk"
                            placeholder="Renk"
                          />
                        </div>
                      </div>
                      <textarea
                        placeholder="Açıklama"
                        required
                        className="form-control mb-2"
                        name="aciklama"
                        rows="3"
                      ></textarea>

                      <div className="pt-1 pb-0">Stok Sayısı Giriniz</div>
                      <hr className="p-0 mt-2" />
                      <div className="row">
                        <div className="col-md-6 col-lg-3 col-sm-12">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="basic-addon1">
                                S
                              </span>
                            </div>
                            <input
                              required
                              name="s"
                              type="number"
                              class="form-control"
                              placeholder="Sayı Giriniz"
                              aria-describedby="basic-addon1"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-sm-12">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="basic-addon1">
                                M
                              </span>
                            </div>
                            <input
                              required
                              name="m"
                              type="number"
                              class="form-control"
                              placeholder="Sayı Giriniz"
                              aria-describedby="basic-addon1"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-sm-12">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="basic-addon1">
                                L
                              </span>
                            </div>
                            <input
                              required
                              name="l"
                              type="number"
                              class="form-control"
                              placeholder="Sayı Giriniz"
                              aria-describedby="basic-addon1"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-sm-12">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="basic-addon1">
                                XL
                              </span>
                            </div>
                            <input
                              required
                              name="xl"
                              type="number"
                              class="form-control"
                              placeholder="Sayı Giriniz"
                              aria-describedby="basic-addon1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 position-relative p-2 bg-light rounded d-flex align-content-between  flex-wrap">
                      <div>
                        <div className="">
                          <div className="col form-control mb-2 p-2 d-flex align-items-center">
                            <span>Resim 1 </span>

                            <input
                              required
                              ref={el}
                              className="pl-2 w-75"
                              name="dosya1"
                              id="dosya1"
                              type="file"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="">
                          <div className="col form-control mb-2 p-2 d-flex align-items-center">
                            <span>Resim 2 </span>

                            <input
                              ref={el}
                              required
                              className="pl-2 w-75"
                              name="dosya2"
                              id="dosya2"
                              type="file"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="">
                          <div className="col form-control mb-2 p-2 d-flex align-items-center">
                            <span>Resim 3 </span>

                            <input
                              ref={el}
                              required
                              className="pl-2 w-75"
                              name="dosya3"
                              id="dosya3"
                              type="file"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="">
                          <div className="col form-control mb-2 p-2 d-flex align-items-center">
                            <span>Resim 4 </span>

                            <input
                              required
                              ref={el}
                              className="pl-2 w-75"
                              name="dosya4"
                              id="dosya4"
                              type="file"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-100">
                        <div class="progress mb-2">
                          <div
                            class="progress-bar"
                            role="progressbar"
                            style={{ width: `${progress}` }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {progress} Yüklendi
                          </div>
                        </div>
                        <input
                          className="w-100  btn btn-danger mb-2"
                          type="submit"
                          value="Ekle"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default AdminAddProductPage;
