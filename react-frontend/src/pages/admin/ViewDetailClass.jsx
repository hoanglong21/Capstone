import React, { useState, useEffect } from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link, useParams } from "react-router-dom";
import ClassService from "../../services/ClassService";
import ApexCharts from "apexcharts";
// import dayjs from 'dayjs';

function ViewDetailClass() {
  const [classes, setClasses] = useState([]);
  const { id } = useParams();
  const [classLearnerJoined, setclassLearnerJoined] = useState([]);
  const [classTest, setClassTest] = useState([]);
  const [classAssignment, setClassAssignment] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = (await ClassService.getClassroomById(id)).data;
        setClasses(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchData();

    const fetchDataClassLearnerJoined = async () => {
      try {
        const temp = (await ClassService.getLeanerJoined(id)).data;
        setclassLearnerJoined(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataClassLearnerJoined();

    const fetchDataClassAssignmentNumber = async () => {
      try {
        const temp = (await ClassService.getAssignmentNumber(id)).data;
        setClassAssignment(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataClassAssignmentNumber();

    const fetchDataClassTestNumber = async () => {
      try {
        const temp = (await ClassService.getTestNumber(id)).data;
        setClassTest(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataClassTestNumber();
  }, [id]);

  var options = {
    series: [
      {
        name: "sales",
        data: [
          {
            x: "2019/01/01",
            y: 400,
          },
          {
            x: "2019/04/01",
            y: 430,
          },
          {
            x: "2019/07/01",
            y: 448,
          },
          {
            x: "2019/10/01",
            y: 470,
          },
        ],
      },
    ],
    chart: {
      type: "bar",
      height: 380,
    },
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val) {
          // return "Q" + dayjs(val).quarter()
        },
      },
      group: {
        style: {
          fontSize: "10px",
          fontWeight: 700,
        },
        groups: [{ title: "2019", cols: 4 }],
      },
    },
    title: {
      text: "Grouped Labels on the X-axis",
    },
    tooltip: {
      x: {
        formatter: function (val) {
          // return "Q" + dayjs(val).quarter() + " " + dayjs(val).format("YYYY")
        },
      },
    },
  };

  useEffect(() => {
    initializeChartline(); // Render the chart when the component mounts
  }, []);

  const initializeChartline = () => {
    const chartOrigin = document.querySelector("#chart");
    if (chartOrigin) {
      const chart = new ApexCharts(chartOrigin, options);
      chart.render();
    }
  };

  var optionsDataLabel = {
    series: [
      {
        name: "Learn Joined",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        },
      },
    },
    title: {
      text: "Monthly Inflation in Argentina, 2002",
      floating: true,
      offsetY: 330,
      align: "center",
      style: {
        color: "#444",
      },
    },
  };

  useEffect(() => {
    initializeChartDataLabel();
  }, []);

  const initializeChartDataLabel = () => {
    const chartOrigin = document.querySelector("#chartDataLabel");
    if (chartOrigin) {
      const chart = new ApexCharts(chartOrigin, optionsDataLabel);
      chart.render();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="card mb-4">
            <div className="card-header fs-5 fw-bold text-uppercase">
              Class Details
            </div>
            <div className="card-body">
              <div className="row gx-3 mb-3">
                <div className="col-xl-4 col-md-4 mb-4">
                  <div className="card border-left border-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            Learners join
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {classLearnerJoined}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="bi bi-person-workspace fs-2 text-secondary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-4">
                  <div className="card border-left border-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Number of assignments
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {classAssignment}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="bi bi-file-earmark-text fs-2 text-secondary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-4">
                  <div className="card border-left border-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Number of tests
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {classTest}
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
              <div className="mb-3">
                <label className="small mb-1 fs-6">Class Name </label>
                <input
                  className="form-control"
                  type="text"
                  readOnly
                  value={classes?.class_name}
                />
              </div>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1 fs-6">Class ID</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={classes?.id}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small mb-1 fs-6">Tutor guide</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={classes?.user?.username}
                  />
                </div>
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1 fs-6">Create Date</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={classes?.created_date}
                  />
                </div>

                <div className="col-md-6">
                  <label className="small mb-1 fs-6">Member's Joined</label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={classes?.users?.length}
                  />
                </div>
              </div>
              <div className="row gx-3 mb-3">
                <div className="col-md-12">
                  <label className="small mb-1 fs-6">Description</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={classes?.description}
                  />
                </div>
              </div>
              <div className="row gx-3 mb-3">
                <div className="col-xl-6 col-lg-6">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 fw-bold text-uppercase text-primary">
                        number of posts per week
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
                <div className="col-xl-6 col-lg-6">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 fw-bold text-uppercase text-primary">
                        number of learners join class by month
                      </h6>
                    </div>
                    <div className="card-body">
                      <div
                        className="chart-area"
                        id="chartDataLabel"
                        style={{ height: "300px", width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Link className="btn btn-primary" to="/manageclass">
                  Close
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailClass;
