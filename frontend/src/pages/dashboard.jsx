import React, { useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  // Upload CSV
  const handleUpload = async () => {
    if (!file) {
      alert("Please choose CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload dataset
      await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      alert("CSV Uploaded Successfully");

      // Get forecast results
      const response = await axios.post(
        "http://127.0.0.1:8000/forecast"
      );

      console.log(response.data);

      setForecastData(response.data.forecast);

    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  // Analytics
  const totalForecast = forecastData.reduce(
    (sum, item) => sum + item.forecast,
    0
  );

  const peakSales =
    forecastData.length > 0
      ? Math.max(
          ...forecastData.map((item) => item.forecast)
        )
      : 0;

  // Download Excel
  const downloadCSV = () => {
    let csv =
      "Date,Forecast\n";

    forecastData.forEach((item) => {
      csv += `${item.date},${item.forecast}\n`;
    });

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "forecast_report.csv";
    a.click();
  };

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text(
      "AI Demand Forecast Report",
      20,
      20
    );

    const tableColumn = [
      "Date",
      "Forecast",
    ];

    const tableRows = [];

    forecastData.forEach((item) => {
      tableRows.push([
        item.date,
        item.forecast,
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("forecast_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* Title */}
      <h1 className="text-5xl font-bold mb-8">
        AI Demand Forecast Dashboard
      </h1>

      {/* Upload */}
      <div className="flex flex-col items-center mb-8">

        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="mb-4 text-white"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-500 px-6 py-3 rounded-lg font-bold hover:bg-blue-600"
        >
          Upload CSV
        </button>

      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-blue-500 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">
            Total Forecast
          </h2>

          <p className="text-4xl">
            {totalForecast.toFixed(2)}
          </p>
        </div>

        <div className="bg-green-500 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">
            Peak Sales
          </h2>

          <p className="text-4xl">
            {peakSales.toFixed(2)}
          </p>
        </div>

        <div className="bg-purple-500 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">
            Growth Trend
          </h2>

          <p className="text-3xl">
            Positive 📈
          </p>
        </div>

      </div>

      {/* Download Buttons */}
      <div className="flex gap-4 mb-8">

        <button
          onClick={downloadCSV}
          className="bg-green-600 px-5 py-2 rounded-lg"
        >
          Download Excel
        </button>

        <button
          onClick={downloadPDF}
          className="bg-red-600 px-5 py-2 rounded-lg"
        >
          Download PDF
        </button>

      </div>

      {/* Graph */}
      <div className="bg-white p-6 rounded-2xl mb-10">

        <h2 className="text-4xl font-bold text-center mb-6 text-black">
          Forecast Graph
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <LineChart data={forecastData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Forecast Results */}
      <div>

        <h2 className="text-4xl font-bold mb-6">
          Forecast Results
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {forecastData.map((item, index) => (

            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow"
            >

              <p className="mb-2">
                <span className="font-bold">
                  Date:
                </span>{" "}
                {item.date}
              </p>

              <p>
                <span className="font-bold">
                  Predicted Sales:
                </span>{" "}
                {item.forecast}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;