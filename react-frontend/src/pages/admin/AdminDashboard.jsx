import React from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link } from "react-router-dom";
import img from "../../assets/images/screen.png";
import { useEffect } from "react";
// import CanvasJS from '@canvasjs/charts';
import ApexCharts from "apexcharts";

function AdminDashboard() {
  // window.onload = function () {
  //   var chartArea = new CanvasJS.Chart("chartContainer",
  //   {
  //     title: {
  //       text: "Users By Month"
  //     },
  //       data: [
  //     {
  //       type: "area",
  //       dataPoints: [//array

  //       { x: new Date(2012, 0, 1), y: 2600 },
  //       { x: new Date(2012, 1, 1), y: 3800 },
  //       { x: new Date(2012, 2, 1), y: 4300 },
  //       { x: new Date(2012, 3, 1), y: 2900 },
  //       { x: new Date(2012, 4, 1), y: 4100 },
  //       { x: new Date(2012, 5, 1), y: 4500 },
  //       { x: new Date(2012, 6, 1), y: 8600 },
  //       { x: new Date(2012, 7, 1), y: 6400 },
  //       { x: new Date(2012, 8, 1), y: 5300 },
  //       { x: new Date(2012, 9, 1), y: 6000 }
  //       ]
  //     }
  //     ]
  //   });

  //   chartArea.render();

  //   var chartPie = new CanvasJS.Chart("chartPie", {
  //     theme: "light2", // "light1", "light2", "dark1", "dark2"
  //     exportEnabled: true,
  //     animationEnabled: true,
  //     title: {
  //       text: "Users Device"
  //     },
  //     data: [{
  //       type: "pie",
  //       startAngle: 25,
  //       toolTipContent: "<b>{label}</b>: {y}%",
  //       showInLegend: "true",
  //       legendText: "{label}",
  //       indexLabelFontSize: 16,
  //       indexLabel: "{label} - {y}%",
  //       dataPoints: [
  //         { y: 55.08, label: "Chrome" },
  //         { y: 30.02, label: "Microsoft Edge" },
  //         { y: 15.44, label: "Others" }
  //       ]
  //     }]
  //   });
  //   chartPie.render();

  // }
  var options = {
    series: [
      {
        name: "series1",
        data: [31, 40, 28],
      },
      {
        name: "series2",
        data: [11, 32, 60],
      },
    ],
    chart: {
      height: 350,
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
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  
  // var chartOrigin = document.querySelector('#chart');
  // if(chartOrigin) {
  //   var chart = new ApexCharts(document.querySelector('#chart'), options);
  //   chart.render();
  // }

  // useEffect(() => {
  //   window.onload = () => {
  //     const chartOrigin = document.querySelector('#chart');
  //     if (chartOrigin) {
  //       const chart = new ApexCharts(chartOrigin, options);
  //       chart.render();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    initializeChart(); // Render the chart when the component mounts
  }, []);

  // useEffect(() => {
  //   initializeChart();
  // }, [options]); // Pass any dependencies here that may change and require the chart to be rerendered

  const initializeChart = () => {
    const chartOrigin = document.querySelector('#chart');
    if (chartOrigin) {
      const chart = new ApexCharts(chartOrigin, options);
      chart.render();
    }
  };


  return (
    <div className="container-fluid bg-white">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="container">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              <Link
                to="/"
                className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              >
                <i className="bi bi-download text-white"></i> Generate Report
              </Link>
            </div>
            <div className="row">
              {/*  <!-- Earnings (Monthly) Card Example --> */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left border-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          Earnings (Monthly)
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          $40,000
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*  <!-- Earnings (Monthly) Card Example --> */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left border-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Earnings (Annual)
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          $215,000
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*  <!-- Earnings (Monthly) Card Example --> */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left border-info shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                          Tasks
                        </div>
                        <div className="row no-gutters align-items-center">
                          <div className="col-auto">
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                              50%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="bi bi-clipboard fs-2 text-secondary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*  <!-- Pending Requests Card Example --> */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left border-warning shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Pending Requests
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          18
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-comments fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/*   <!-- Area Chart --> */}
            <div className="col-xl-7 col-lg-7">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Number Of Users By Month
                  </h6>
                </div>
                <div className="card-body">
                  <div
                    className="chart-area"
                    id="chart"
                    style={{ height: "300px", width: "100%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/*  <!-- Pie Chart --> */}
            <div className="col-xl-5 col-lg-5">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    User Devices
                  </h6>
                </div>
                {/*  <!-- Card Body --> */}
                <div className="card-body">
                  <div
                    id="chartPie"
                    style={{ height: "300px", width: "100%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/*   <!-- Content Column --> */}
            <div className="col-lg-6 mb-4">
              {/* <!-- Project Card Example --> */}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Projects
                  </h6>
                </div>
                <div className="card-body">
                  <h4 className="small font-weight-bold">
                    Server Migration <span className="float-right">20%</span>
                  </h4>
                  <div className="progress mb-4">
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "20%" }}
                      aria-valuenow="20"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <h4 className="small font-weight-bold">
                    Sales Tracking <span className="float-right">40%</span>
                  </h4>
                  <div className="progress mb-4">
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: "40%" }}
                      aria-valuenow="40"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <h4 className="small font-weight-bold">
                    Customer Database <span className="float-right">60%</span>
                  </h4>
                  <div className="progress mb-4">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "60%" }}
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <h4 className="small font-weight-bold">
                    Payout Details <span className="float-right">80%</span>
                  </h4>
                  <div className="progress mb-4">
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow="80"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <h4 className="small font-weight-bold">
                    Account Setup <span className="float-right">Complete!</span>
                  </h4>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Illustrations
                  </h6>
                </div>
                <div className="card-body">
                  <div className="text-center">
                    <img
                      className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
                      src={img}
                      alt="..."
                    />
                  </div>
                  <p>
                    In the future, the Nihongo Level Up development team will
                    release more new features for users to help people have a
                    better experience when using our website. Hope to work with
                    you all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
