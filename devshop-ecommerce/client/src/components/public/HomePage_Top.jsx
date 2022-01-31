import React from "react";

const HomePage_Top = () => {
  return (
    <React.StrictMode>
      <section className="section-intro padding-y-sm">
        <div className="container">
          <div className="intro-banner-wrap">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                <div className="shadow-sm card-banner">
                  <div className="p-4" style={{ width: "75%" }}>
                    <h5 className="card-title">Altınyıldz Gömlekler</h5>
                    <p>
                      2021 Model altınyıldız marka gömleklerdeki indirimi
                      kaçırmayın.
                    </p>
                  </div>
                  <img
                    alt=""
                    src="https://productimages.hepsiburada.net/l/38/600-800/10580777664562.jpg"
                    height="150"
                    className="img-bg"
                  />
                </div>
                <div className="shadow-sm card-banner mt-2">
                  <div className="p-4" style={{ width: "70%" }}>
                    <h5 className="card-title">Sezon Sonu İndirimi</h5>
                    <p>
                      Yaz mevsiminin gelmesiyle, montlarda %70'e varan
                      indirimler var.
                    </p>
                  </div>
                  <img
                    alt=""
                    src="https://www.sporset.com/UserFiles/ProductImages/0/100340277/orj/lumberjack-arch-coat-erkek-mont-100340277-gri-91150.jpg"
                    height="150"
                    className="img-bg"
                  />
                </div>

                <div className="shadow-sm card-banner  mt-2">
                  <div className="p-4" style={{ width: "75%" }}>
                    <h5 className="card-title">Yeni Sezon Ürünler</h5>
                    <p>
                      2021'in modasına uygun yeni sezon pantolonlara baktınız mı
                      ?
                    </p>
                  </div>
                  <img
                    src="https://cdn.dsmcdn.com/mnresize/415/622/Assets/ProductImages/oa/76/538202/1/5414782948293_2_org_zoom.jpg"
                    height="150"
                    className="img-bg"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                <div
                  id="carousel1_indicator"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carousel1_indicator"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li
                      data-target="#carousel1_indicator"
                      data-slide-to="1"
                    ></li>
                    <li
                      data-target="#carousel1_indicator"
                      data-slide-to="2"
                    ></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        className="d-block w-100"
                        src="images/banners/slide1.jpg"
                        alt="First slide"
                        alt=""
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100"
                        src="images/banners/slide2.jpg"
                        alt="Second slide"
                        alt=""
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100"
                        src="images/banners/slide3.jpg"
                        alt="Third slide"
                        alt=""
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carousel1_indicator"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carousel1_indicator"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div
                className="card-banner overlay-gradient"
                style={{
                  minHeight: "230px",
                  backgroundImage: "url('../images/posts/2.jpg')",
                }}
              >
                <div className="card-img-overlay white">
                  <h3 className="card-title">
                    Tüm kışlık kıyafetleriniz <br /> hazır mı ?
                  </h3>
                  <p className="card-text" style={{ maxWidth: "400px" }}>
                    Mont çeşitlerinden berelere, eldivenlerden kazaklara kadar
                    aradığınız tüm kışlık kıyafetler %50'ye varan indirimlerle
                    sizi bekliyor.
                  </p>
                  <a href="" className="btn btn-warning">
                    Hemen İncele
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card-banner overlay-gradient"
                style={{
                  minHeight: "230px",
                  backgroundImage:
                    "url('https://media.istockphoto.com/photos/kids-making-winter-snowman-children-play-in-snow-picture-id1076248012')",
                }}
              >
                <div className="card-img-overlay text-white">
                  <h5 className="card-title">En Güzel Montlar </h5>
                  <p className="card-text">
                    Çocuklarınız için birbirinden sevimli ve güzel mont
                    çeşitleri sizi bekliyor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-content padding-y-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <article className="card card-body">
                <figure className="itemside">
                  <div className="aside">
                    <span className="icon-sm rounded-circle bg-warning">
                      <i className="fa fa-money-bill-alt white"></i>
                    </span>
                  </div>
                  <figcaption className="info">
                    <h5 className="title">Uygun Fiyatlar</h5>
                    <p>
                      Cep yakmayan uygun fiyatlarda dört mevsim kıyafet
                      ihtiyacınızı karşılayın.
                    </p>
                  </figcaption>
                </figure>
              </article>
            </div>
            <div className="col-md-4">
              <article className="card card-body">
                <figure className="itemside">
                  <div className="aside">
                    <span className="icon-sm rounded-circle bg-secondary">
                      <i className="fa fa-comment-dots white"></i>
                    </span>
                  </div>
                  <figcaption className="info">
                    <h5 className="title">7/24 İletişim</h5>
                    <p>
                      Müşteri hizmetlerimize istediğiniz zaman ulaşabilirsiniz.
                    </p>
                  </figcaption>
                </figure>
              </article>
            </div>
            <div className="col-md-4">
              <article className="card card-body">
                <figure className="itemside">
                  <div className="aside">
                    <span className="icon-sm rounded-circle bg-success">
                      <i className="fa fa-truck white"></i>
                    </span>
                  </div>
                  <figcaption className="info">
                    <h5 className="title">Hızlı Teslimat</h5>
                    <p>Satın aldığınız ürünler aynı gün kargoya verilir.</p>
                  </figcaption>
                </figure>
              </article>
            </div>
          </div>
        </div>
      </section>
    </React.StrictMode>
  );
};

export default HomePage_Top;
