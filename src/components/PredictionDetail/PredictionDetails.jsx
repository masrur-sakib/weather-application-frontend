import Header from "../Homepage/Header";
import { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import GContext from "../Contexts/GContext";
import { Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { FcGrid } from "react-icons/fc";
import { FcAreaChart } from "react-icons/fc";
const domain = "http://127.0.0.1:8000";

const CustomTooltip = ({ active, payload, label }) => {
  const tooltipClasses = "bg-white p-2 rounded border-gray-300 shadow";

  if (active && payload && payload.length) {
    return (
      <div className={tooltipClasses}>
        <p className="text-gray-800">{`Date: ${label}`}</p>
        {payload?.map((entry, index) => (
          <p key={index} className="text-gray-800 font-semibold">
            {`${entry?.name}: ${entry?.value} ${getUnit(entry?.name)}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const getUnit = (name) => {
  const unitMap = {
    T2M: " °C",
    RH2M: " %",
    PS: " KPa",
    WS10M: " m/s",
    PRECTOTCORR: " mm/hr",
    PM10: " µg/m3",
    PM25: " µg/m3",
    NO: " µg/m3",
    SO: " µg/m3",
    CO: " µg/m3",
    O3: " µg/m3",
  };

  return unitMap[name] || ""; // Default to an empty string if no unit is specified
};

const PredictionDetails = () => {
  const [data, setData] = useState([]);
  const [aqiData, setAqiData] = useState([]);
  const [forecastType, setForecastType] = useState("1");
  const [daysCount, setDaysCounts] = useState("1");
  const [loading, setLoading] = useState(false);
  const [dataStyle, setDataStyle] = useState("table");
  const { startDate, aqiClk, setAqiClk } = useContext(GContext);

  const columns = [
    {
      name: "Day",
      selector: (row) => new Date(row.date).toLocaleString(),
      sortable: true,
      lineCol: "",
      dataKey: "",
    },
    {
      name: "Temperature (°C)",
      selector: (row) => row.T2M.toFixed(2),
      sortable: true,
      lineCol: "#2CAFFE",
      dataKey: "T2M",
    },
    {
      name: "Humidity (%)",
      selector: (row) => row.RH2M.toFixed(2),
      sortable: true,
      lineCol: "#544FC5",
      dataKey: "RH2M",
    },
    {
      name: "Pressure (KPa)",
      selector: (row) => row.PS.toFixed(2),
      sortable: true,
      lineCol: "#FE6A35",
      dataKey: "PS",
    },
    {
      name: "Wind (m/s)",
      selector: (row) => row.WS10M.toFixed(2),
      sortable: true,
      lineCol: "#6B8ABC",
      dataKey: "WS10M",
    },
    {
      name: "Precipitation (mm/hr)",
      selector: (row) => row.PRECTOTCORR.toFixed(2),
      sortable: true,
      lineCol: "#00E272",
      dataKey: "PRECTOTCORR",
    },
  ];

  const aqiColumns = [
    {
      name: "Day",
      selector: (row) => new Date(row.date).toLocaleString(),
      sortable: true,
      lineCol: "",
      dataKey: "",
    },
    {
      name: "PM10 (µg/m3)",
      selector: (row) => row.PM10.toFixed(2),
      sortable: true,
      lineCol: "#2CAFFE",
      dataKey: "PM10",
    },
    {
      name: "PM2.5 (µg/m3)",
      selector: (row) => row.PM25.toFixed(2),
      sortable: true,
      lineCol: "#544FC5",
      dataKey: "PM25",
    },
    {
      name: "NO (µg/m3)",
      selector: (row) => row.NO.toFixed(2),
      sortable: true,
      lineCol: "#FE6A35",
      dataKey: "NO",
    },
    {
      name: "SO (µg/m3)",
      selector: (row) => row.SO.toFixed(2),
      sortable: true,
      lineCol: "#6B8ABC",
      dataKey: "SO",
    },
    {
      name: "CO (µg/m3)",
      selector: (row) => row.CO.toFixed(2),
      sortable: true,
      lineCol: "#00E272",
      dataKey: "CO",
    },
    {
      name: "O3 (µg/m3)",
      selector: (row) => row.O3.toFixed(2),
      sortable: true,
      lineCol: "#D568FB",
      dataKey: "O3",
    },
    {
      name: "AQI",
      selector: (row) => row.AQI.toFixed(2),
      sortable: true,
      lineCol: "#2EE0CA",
      dataKey: "AQI",
    },
  ];

  useEffect(() => {
    fetchWeatherData("initial", forecastType, daysCount, aqiClk); // Fetch initial data
  }, [aqiClk]);

  const fetchWeatherData = (type, forecastType, daysCount, aqiClk) => {
    let url;
    if (type === "initial") {
      setLoading(true);
      if (aqiClk) {
        url = `${domain}/aqiPredictions`;
      } else {
        url = `${domain}/weatherPredictions`;
      }
    }
    if (type === "update") {
      setLoading(true);
      if (aqiClk) {
        url = `${domain}/aqiPredictions?counts=${daysCount}&forecastType=${forecastType}`;
      } else {
        url = `${domain}/weatherPredictions?counts=${daysCount}&forecastType=${forecastType}`;
      }
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (aqiClk) {
            setAqiData(data.pred_aqi);
          } else {
            setData(data.pred_temp);
          }
        } else {
          alert("Geolocation request failed.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  const handleForecastTypeChange = (e) => {
    setForecastType(e.target.value);
    fetchWeatherData("update", e.target.value, daysCount, aqiClk);
  };

  const handleDayscounts = (e) => {
    setDaysCounts(e.target.value);
    fetchWeatherData("update", forecastType, e.target.value, aqiClk);
  };

  return (
    <div className="container">
      <Header />

      <div className="flex justify-between items-start">
        {/* Left Section */}
        <div className="mr-4 w-1/4"></div>
        {/* Right Section */}
        <div className="right-section">
          <div className="mr-20 flex">
            <p className="text-white mr-3">Show Weather On:</p>
            <select value={forecastType} onChange={handleForecastTypeChange}>
              <option value="1">Hourly Forecast</option>
              <option value="2">3-Hourly Forecast</option>
              <option value="3">Daily Forecast</option>
            </select>
          </div>
          <div className="flex mr-3 mt-4">
            <p className="text-white">Select Time Extent:</p>
            <div className="flex ml-2">
              <p className="text-white mr-2">From:</p>
              <DatePicker
                className="w-24 pl-1"
                popperPlacement="left"
                selected={startDate}
                readOnly={true}
              />
              <p className="text-white mr-2 ml-3">
                to next{" "}
                <select
                  className="text-black"
                  value={daysCount}
                  onChange={handleDayscounts}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>{" "}
                days
              </p>
            </div>
          </div>

          <div
            className="flex w-[200px] mt-4 py-2 bg-slate-800 border border-slate-400 rounded text-white text-sm"
            onClick={() => setAqiClk(true)}
          >
            <div
              className="flex w-full justify-center cursor-pointer"
              title="Click for see AQI Predictions"
            >
              AQI Predictions
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "5px" }}>
        <FcGrid
          size={40}
          style={{
            cursor: "pointer",
            border: dataStyle === "table" ? "2px solid blue" : "none",
          }}
          onClick={() => setDataStyle("table")}
        />
        <FcAreaChart
          size={40}
          style={{
            cursor: "pointer",
            border: dataStyle === "chart" ? "2px solid blue" : "none",
          }}
          onClick={() => setDataStyle("chart")}
        />
      </div>

      {aqiClk ? (
        <div className="mt-[20px]">
          {loading ? (
            <div className="w-full flex justify-center align-middle">
              <img src="./loader.gif" />
            </div>
          ) : (
            <>
              {dataStyle === "table" ? (
                <DataTable
                  className="text-white"
                  columns={aqiColumns}
                  data={aqiData}
                  fixedHeader
                  pagination
                ></DataTable>
              ) : (
                <LineChart
                  width={1200}
                  height={500}
                  data={aqiData}
                  margin={{ top: 50, right: 30, left: 20, bottom: 50 }}
                >
                  {aqiColumns.map((col, inx) => {
                    return (
                      <Line
                        key={inx}
                        type="monotone"
                        dataKey={col.dataKey}
                        stroke={col.lineCol}
                        // dot={false}
                        // strokeWidth={3}
                      ></Line>
                    );
                  })}

                  <YAxis />
                  <XAxis dataKey="date" hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </LineChart>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="mt-[20px]">
          {loading ? (
            <div className="w-full flex justify-center align-middle">
              <img src="./loader.gif" />
            </div>
          ) : (
            <>
              {dataStyle === "table" ? (
                <DataTable
                  className="text-white"
                  columns={columns}
                  data={data}
                  fixedHeader
                  pagination
                ></DataTable>
              ) : (
                <LineChart
                  width={1200}
                  height={500}
                  data={data}
                  margin={{ top: 50, right: 30, left: 20, bottom: 50 }}
                >
                  {columns.map((col, inx) => {
                    return (
                      <Line
                        key={inx}
                        type="monotone"
                        dataKey={col.dataKey}
                        stroke={col.lineCol}
                        // dot={false}
                        // strokeWidth={3}
                      ></Line>
                    );
                  })}

                  <YAxis />
                  <XAxis dataKey="date" hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </LineChart>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionDetails;
