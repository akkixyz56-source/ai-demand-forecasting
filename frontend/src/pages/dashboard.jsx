import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {

  const [forecast, setForecast] = useState([]);
  const [peaks, setPeaks] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchForecast();
    fetchPeakUsage();
    fetchAnomalies();
    fetchRecommendations();
  }, []);

  const fetchForecast = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/forecast");
      setForecast(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPeakUsage = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/peak-usage");
      setPeaks(res.data.peak_periods);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAnomalies = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/anomalies");
      setAnomalies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/recommendations");
      setRecommendations(res.data.recommendations);
    } catch (err) {
      console.log(err);
    }
  };

  // PDF DOWNLOAD FUNCTION
  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.text(
      "AI Energy Consumption Forecast Report",
      20,
      20
    );

    doc.text(
      `Forecast Records: ${forecast.length}`,
      20,
      40
    );

    doc.text(
      `Peak Usage Records: ${peaks.length}`,
      20,
      50
    );

    doc.text(
      `Anomalies Detected: ${anomalies.length}`,
      20,
      60
    );

    doc.text(
      `Recommendations: ${recommendations.length}`,
      20,
      70
    );

    doc.save("energy_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        AI Energy Consumption Dashboard
      </h1>

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Forecast Records</h3>
          <h1 className="text-3xl font-bold">{forecast.length}</h1>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Peak Usage</h3>
          <h1 className="text-3xl font-bold">{peaks.length}</h1>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Anomalies</h3>
          <h1 className="text-3xl font-bold">{anomalies.length}</h1>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Recommendations</h3>
          <h1 className="text-3xl font-bold">{recommendations.length}</h1>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Forecast Accuracy</h3>
          <h1 className="text-3xl font-bold">94%</h1>
        </div>

      </div>

      {/* FILTERS */}

      <div className="flex justify-between mb-6">

        <select className="p-2 rounded border">
          <option>All Devices</option>
          <option>AC_1</option>
          <option>FAN_1</option>
        </select>

        <div className="space-x-3">

          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Download CSV
          </button>

        </div>

      </div>

      {/* FORECAST CHART */}

      <div className="bg-white p-5 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-semibold mb-5">
          Forecast Predictions
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={forecast.slice(0, 10)}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="ds" hide />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="yhat"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* PEAK USAGE */}

      <div className="bg-white p-5 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-semibold mb-5">
          Peak Usage Analysis
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={peaks}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="device_id" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="energy_usage"
              fill="#ef4444"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* ANOMALIES */}

      <div className="bg-white p-5 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-semibold mb-5">
          Detected Anomalies
        </h2>

        {
          anomalies.map((item, index) => (

            <div
              key={index}
              className="border-b py-3"
            >

              <p>
                <strong>Device:</strong> {item.device_id}
              </p>

              <p>
                <strong>Abnormal Usage:</strong> {item.energy_usage}
              </p>

            </div>

          ))
        }

      </div>

      {/* RECOMMENDATIONS */}

      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="text-2xl font-semibold mb-5">
          AI Recommendations
        </h2>

        {
          recommendations.map((item, index) => (

            <div
              key={index}
              className="border-b py-3"
            >
              {item}
            </div>

          ))
        }

      </div>

    </div>
  );
};

export default Dashboard;