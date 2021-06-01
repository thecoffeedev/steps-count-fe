import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  LineChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import moment from "moment";

import Form from "./components/Form";

import { getData, addSteps } from "./helpers/controllers";

function App() {
  const [data, setData] = useState([]);

  const [count, setCount] = useState("");

  const [isBar, setIsBar] = useState(true);

  const toggleBtn = () => {
    setIsBar(!isBar);
  };

  const fetchData = () => {
    getData()
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  };

  const increaseSteps = (steps) => {
    addSteps(steps)
      .then(() => fetchData())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dateFormatter = (item) => moment(item).format("DD-MM-YY");

  return (
    <div className="App">
      <h1>STEP COUNTER</h1>
      <div className="cont">
        <div className="column-form">
          <Form value={[count, setCount]} fn={increaseSteps} />
        </div>
        <div className="column">
          {isBar ? (
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={data}>
                <XAxis dataKey="date" tickFormatter={dateFormatter} />
                <YAxis />
                <Tooltip labelFormatter={dateFormatter} />
                <Bar dataKey="steps" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width={800} height={500}>
              <LineChart data={data}>
                <XAxis dataKey="date" tickFormatter={dateFormatter} />
                <YAxis dataKey="steps" />
                <Tooltip labelFormatter={dateFormatter} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line
                  type="monotone"
                  dataKey="steps"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
          <div className="toggleBtns mt-4">
            <button
              className={
                isBar ? "btn btn-primary mr-2" : "btn btn-secondary mr-2"
              }
              onClick={toggleBtn}
            >
              Bar Chart
            </button>
            <button
              className={
                !isBar ? "btn btn-primary ml-2" : "btn btn-secondary ml-2"
              }
              onClick={toggleBtn}
            >
              Line Chart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
