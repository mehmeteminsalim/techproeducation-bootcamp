import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Admin_SaleSummary = () => {
  const [satis, setSatis] = useState([]);
  const [gunler, setGunler] = useState([]);

  function satisOzetiniAl() {
    axios
      .get("https://devshop-web.herokuapp.com/admin/api/aylik_satisozeti")
      .then(function (gelenVeri) {
        var satisOzeti = gelenVeri.data;
        var tarihler = [];
        var satislar = [];

        satisOzeti.forEach((siparis) => {
          var date = new Date(siparis.tarih);
          date.setHours(3);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);

          tarihler.push(date.toISOString());

          var toplamSatilanUrunSayisi = 0;

          siparis.urunler.forEach((urun) => {
            toplamSatilanUrunSayisi += urun.miktar;
          });

          satislar.push(toplamSatilanUrunSayisi);
        });

        setSatis(satislar);
        setGunler(tarihler);
      });
  }

  useEffect(satisOzetiniAl, []);

  var state = {
    series: [
      {
        name: "Satış Sayısı",
        data: satis,
      },
    ],
    options: {
      yaxis: {
        min: 0,
      },
      chart: {
        height: 200,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: gunler,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  return (
    <div className="col-md-8">
      <div className="card">
        <div className="card-body">
          <div className="d-md-flex align-items-center">
            <div>
              <h5 className="card-title">Satış Özeti</h5>
              <h6 className="card-subtitle">Bu ayki satış özetiniz</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="area"
                height={275}
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_SaleSummary;
