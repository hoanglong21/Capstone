import React from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import "../../assets/styles/admindashboard.css";
import { Link } from "react-router-dom";
import img from "../../assets/images/screen.png";
import ApexCharts from 'apexcharts';

function AdminDashboard() {
  var options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'sales',
      data: [30,40,35,50,49,60,70,91,125]
    }],
    xaxis: {
      categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
    }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  
  chart.render();
  

  return (
    <div className="container-fluid">
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
                <i className="fas fa-download fa-sm text-white-50"></i> Generate
                Report
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
            <div className="col-xl-8 col-lg-7">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                  Number Of Users By Month
                  </h6>
                </div>
                <div className="card-body">
                  <div className="chart-area" id="chart" style={{height: '300px', width: '100%'}}>
                  </div>
                </div>
              </div>
            </div>

            {/*  <!-- Pie Chart --> */}
            <div className="col-xl-4 col-lg-5">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Revenue Sources
                  </h6>
                </div>
                {/*  <!-- Card Body --> */}
                <div className="card-body">
                  <div className="chart-pie pt-4 pb-2">
                    <canvas id="myPieChart"></canvas>
                  </div>
                  <div className="mt-4 text-center small">
                    <span className="me-2">
                    <i class="bi bi-circle-fill text-primary"></i> Direct
                    </span>
                    <span className="me-2">
                      <i className="bi bi-circle-fill text-success"></i> Social
                    </span>
                    <span className="me-2">
                      <i className="bi bi-circle-fill text-info"></i> Referral
                    </span>
                  </div>
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
                      className="progress-bar bg-danger a2"
                      role="progressbar"
                    ></div>
                  </div>
                  <h4 className="small font-weight-bold">
                    Sales Tracking <span className="float-right">40%</span>
                  </h4>
                  <div className="progress mb-4">
                    <div
                      className="progress-bar bg-warning a3"
                      role="progressbar"
                    ></div>
                  </div>
                  <h4 className="small font-weight-bold">
                    Customer Database <span className="float-right">60%</span>
                  </h4>
                  <div className="progress mb-4">
                    <div className="progress-bar a7" role="progressbar"></div>
                  </div>
                  <h4 className="small font-weight-bold">
                    Payout Details <span className="float-right">80%</span>
                  </h4>
                  <div className="progress mb-4">
                    <div
                      className="progress-bar bg-info a4"
                      role="progressbar"
                    ></div>
                  </div>
                  <h4 className="small font-weight-bold">
                    Account Setup <span className="float-right">Complete!</span>
                  </h4>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success a5"
                      role="progressbar"
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
