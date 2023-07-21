import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import UserService from "../../services/UserService";
import ApexCharts from "apexcharts";
import defaultAvatar from "../../assets/images/avatar-default.jpg"

function ViewDetailsUser() {
  const [users, setUsers] = useState([]);
  const {username} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const temp = (await UserService.getUser(username)).data;
      setUsers(temp);
    };
    if (username) {
      fetchData();
    };
  }, [username]);

  var optionRadar = {
    series: [{
    name: 'Series 1',
    data: [80, 50, 30, 40, 100, 20],
  }],
    chart: {
    height: 350,
    type: 'radar',
  },
  title: {
    text: 'Basic Radar Chart'
  },
  xaxis: {
    categories: ['January', 'February', 'March', 'April', 'May', 'June']
  }
  };

  useEffect(() => {
    initializeChartRadar(); 
  }, []);

  const initializeChartRadar = () => {
    const chartOrigin = document.querySelector("#chartRadar");
    if (chartOrigin) {
      const chart = new ApexCharts(chartOrigin, optionRadar);
      chart.render();
    }
  };

  function generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = (i + 1).toString();
      var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    
      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
    }

  var optionHeatMap = {
    series: [{
    name: 'Metric1',
    data: generateData(18, {
      min: 0,
      max: 90
    })
  },
  {
    name: 'Metric2',
    data: generateData(18, {
      min: 0,
      max: 90
    })
  },
  {
    name: 'Metric3',
    data: generateData(18, {
      min: 0,
      max: 90
    })
  },
  {
    name: 'Metric4',
    data: generateData(18, {
      min: 0,
      max: 90
    })
  },
  {
    name: 'Metric5',
    data: generateData(18, {
      min: 0,
      max: 90
    })
  },
  {
    name: 'Metric6',
    data: generateData(18, {
      min: 0,
      max: 90
    })
  },
  {
    name: 'Metric7',
    data: generateData(18, {
      min: 0,
      max: 90
    })
  },
  {
    name: 'Metric8',
    data: generateData(18, {
      min: 0,
      max: 90
    })
  },
  {
    name: 'Metric9',
    data: generateData(18, {
      min: 0,
      max: 90
    })
  }
  ],
    chart: {
    height: 350,
    type: 'heatmap',
  },
  dataLabels: {
    enabled: false
  },
  colors: ["#008FFB"],
  title: {
    text: 'HeatMap Chart (Single color)'
  },
  };

  useEffect(() => {
    initializeChartHeatMap(); 
  }, []);

  const initializeChartHeatMap = () => {
    const chartOrigin = document.querySelector("#chartMap");
    if (chartOrigin) {
      const chart = new ApexCharts(chartOrigin, optionHeatMap);
      chart.render();
    }
  };

  var options = {
    series: [{
    name: "sales",
    data: [{
      x: '2019/01/01',
      y: 400
    }, {
      x: '2019/04/01',
      y: 430
    }, {
      x: '2019/07/01',
      y: 448
    }, {
      x: '2019/10/01',
      y: 470
    }]
  }],
    chart: {
    type: 'bar',
    height: 380
  },
  xaxis: {
    type: 'category',
    labels: {
      formatter: function(val) {
        // return "Q" + dayjs(val).quarter()
      }
    },
    group: {
      style: {
        fontSize: '10px',
        fontWeight: 700
      },
      groups: [
        { title: '2019', cols: 4 }
      ]
    }
  },
  title: {
      text: 'Grouped Labels on the X-axis',
  },
  tooltip: {
    x: {
      formatter: function(val) {
        // return "Q" + dayjs(val).quarter() + " " + dayjs(val).format("YYYY")
      }  
    }
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
    series: [{
    name: 'Inflation',
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
  }],
    chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%";
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ["#304758"]
    }
  },
  
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    position: 'top',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        }
      }
    },
    tooltip: {
      enabled: true,
    }
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val) {
        return val + "%";
      }
    }
  
  },
  title: {
    text: 'Monthly Inflation in Argentina, 2002',
    floating: true,
    offsetY: 330,
    align: 'center',
    style: {
      color: '#444'
    }
  }
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
              Account Details
            </div>
            <div className="card-body">
                <div className="mb-3">
                  <label className="small mb-1 fs-6">Profile Picture </label>
                  <img
                    className="img-account-profile rounded-circle"
                    src={users?.avatar ? users?.avatar : defaultAvatar}
                    alt=""
                    style={{
                      width: "100px",
                      height: "100px",
                      marginLeft: "35%",
                    }}
                  />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Username</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={users?.username}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Bio</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={users?.bio}
                    />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">First name</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={users?.first_name}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Last name</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={users?.last_name}
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Date of birth</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={users?.dob}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Address</label>
                    <input
                      className="form-control"
                      readOnly
                      type="text"
                      value={users?.address}
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Email address</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value={users?.email}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Phone number</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value={users?.phone}
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Status</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value={users?.status}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Role</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={users?.role}
                    />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
            <div className="col-xl-12 col-lg-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 fw-bold text-uppercase text-info">
                  Number of logins day by day
                  </h6>
                </div>
                <div className="card-body">
                  <div
                    className="chart-area"
                    id="chartMap"
                    style={{ height: "300px", width: "100%" }}
                  ></div>
                </div>
              </div>
            </div>
              </div>
                <div className="row gx-3 mb-3">
              <div className="col-xl-6 col-lg-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 fw-bold text-uppercase text-primary">
                  Number of times to learn sets
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
            <div className="col-xl-6 col-lg-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 fw-bold text-uppercase text-success">
                  Number of join classes
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
            <div className="row gx-3 mb-3">
            <div className="col-xl-6 col-lg-6 ms-auto me-auto">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 fw-bold text-uppercase text-warning">
                  Learn studyset kanji, grammar and vocabulary
                  </h6>
                </div>
                <div className="card-body">
                  <div
                    className="chart-area"
                    id="chartRadar"
                    style={{ height: "300px", width: "100%" }}
                  ></div>
                </div>
              </div>
            </div>
            </div>
              </div>
                <div className="text-center">
                <Link className="btn btn-primary" to="/manageusers">
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

export default ViewDetailsUser;
