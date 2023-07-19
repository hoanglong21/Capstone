import React, { useState } from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link } from "react-router-dom";
import img from "../../assets/images/screen.png";
import { useEffect } from "react";
import ApexCharts from "apexcharts";
import AdminService from "../../services/AdminService";

function AdminDashboard() {
  const [registernumber, setRegisterNumber] = useState();
  const [classnumber, setClassNumber] = useState();
  const [studySetnumber, setStudySetNumber] = useState();
  const [accessNumber, setAccessNumber] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const temp = (await AdminService.getRegisterNumber()).data;
      setRegisterNumber(temp);
    };
    fetchData();

    const fetchDataClass = async () => {
      const temp = (await AdminService.getClassNumber()).data;
      setClassNumber(temp);
    };
    fetchDataClass();

    const fetchDataStudySet = async () => {
      const temp = (await AdminService.getStudySetNumber()).data;
      setStudySetNumber(temp);
    };
    fetchDataStudySet();

    const fetchDataAccess = async () => {
      const temp = (await AdminService.getAccessNumber()).data;
      setAccessNumber(temp);
    };
    fetchDataAccess();
  }, []);

  var optionColumn = {
    series: [
      {
        name: "Person",
        data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },

    grid: {
      row: {
        colors: ["#fff", "#f2f2f2"],
      },
    },
    xaxis: {
      labels: {
        rotate: -45,
      },
      categories: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8",
        "Week 9",
        "Week 10",
        "Week 11",
        "Week 12",
      ],
      tickPlacement: "on",
    },
    yaxis: {
      title: {
        text: "Person",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
  };

  useEffect(() => {
    initializeChart(); // Render the chart when the component mounts
  }, []);

  // useEffect(() => {
  //   initializeChart();
  // }, [options]); // Pass any dependencies here that may change and require the chart to be rerendered

  const initializeChart = () => {
    const chartOrigin = document.querySelector("#chart");
    if (chartOrigin) {
      const chart = new ApexCharts(chartOrigin, optionColumn);
      chart.render();
    }
  };

  var optionLine = {
    series: [
      {
        name: "Sales",
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
      },
    ],
    chart: {
      height: 350,
      type: "line",
    },
    // forecastDataPoints: {
    //   count: 7
    // },
    stroke: {
      width: 7,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "1/11/2000",
        "2/11/2000",
        "3/11/2000",
        "4/11/2000",
        "5/11/2000",
        "6/11/2000",
        "7/11/2000",
        "8/11/2000",
        "9/11/2000",
        "10/11/2000",
        "11/11/2000",
        "12/11/2000",
        "1/11/2001",
        "2/11/2001",
        "3/11/2001",
        "4/11/2001",
        "5/11/2001",
        "6/11/2001",
      ],
      tickAmount: 10,
      labels: {
        formatter: function (value, timestamp, opts) {
          return opts.dateFormatter(new Date(timestamp), "dd MMM");
        },
      },
    },
    title: {
      text: "Set",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#FDD835"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 100, 50, 100],
      },
    },
    yaxis: {
      min: -10,
      max: 40,
    },
  };

  useEffect(() => {
    initializeChartline(); // Render the chart when the component mounts
  }, []);

  const initializeChartline = () => {
    const chartOrigin = document.querySelector("#chartPie");
    if (chartOrigin) {
      const chart = new ApexCharts(chartOrigin, optionLine);
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
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left border-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="fw-bold text-primary text-uppercase mb-1">
                          Access Number (Monthly)
                        </div>
                        <div className="h5 mb-0 fw-bold">{accessNumber}</div>
                      </div>
                      <div className="col-auto">
                        <i class="bi bi-people fs-2 text-secondary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left border-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Register (Monthly)
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {registernumber}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i class="bi bi-person-plus fs-2 text-secondary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left border-info shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                          Classes created (Monthly)
                        </div>
                        <div className="row no-gutters align-items-center">
                          <div className="col-auto">
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                              {classnumber}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="bi bi-person-workspace fs-2 text-secondary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left border-warning shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Sets created (Monthly)
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {studySetnumber}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="bi bi-file-earmark-text fs-2 text-secondary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/*   <!-- Area Chart --> */}
            <div className="col-xl-6 col-lg-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 fw-bold text-uppercase text-primary">
                    User growth over the last 3 months
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
            <div className="col-xl-6 col-lg-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-secondary text-uppercase">
                    Sets created by users within 1 month
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
