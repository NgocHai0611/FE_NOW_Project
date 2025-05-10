import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../css/thongKe.css";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ChartLegend = ({
  labels,
  data,
  percentages,
  backgroundColor,
  borderColor,
}) => {
  return (
    <div className="chart-legend">
      <div className="legend-items">
        {labels.map((label, index) => (
          <div className="legend-item" key={index}>
            <span
              style={{
                backgroundColor: backgroundColor[index],
                borderColor: borderColor[index],
              }}
            ></span>
            {label} ({data[index]} VNĐ - {percentages[index].toFixed(2)}%)
          </div>
        ))}
      </div>
    </div>
  );
};

const ThongKe = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Phân bổ sản phẩm",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [percentages, setPercentages] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3002/revenue/product/yearly",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Phản hồi không thành công: ${response.status} - ${errorText.slice(
              0,
              50
            )}...`
          );
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const errorText = await response.text();
          throw new Error(
            `Phản hồi không phải JSON: ${errorText.slice(0, 50)}...`
          );
        }

        const { revenueByProductYear } = await response.json();
        const availableYears = Object.keys(revenueByProductYear)
          .sort()
          .reverse();
        setYears(availableYears);
        if (availableYears.length > 0) {
          setSelectedYear(availableYears[0]);
          updateChartData(revenueByProductYear, availableYears[0]);
        } else {
          throw new Error("Không có dữ liệu năm nào được trả về");
        }
      } catch (err) {
        setError(err.message);
        console.error("Lỗi fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateChartData = (revenueByProductYear, year) => {
    const products = revenueByProductYear[year] || {};
    const labels = Object.keys(products);
    const data = Object.values(products);

    // Tính tổng doanh thu và phần trăm
    const total = data.reduce((sum, value) => sum + value, 0);
    const calculatedPercentages = data.map((value) =>
      total > 0 ? (value / total) * 100 : 0
    );

    const colors = labels.map((_, index) => {
      const hue = (index * 137.5) % 360;
      return `hsla(${hue}, 70%, 60%, 0.6)`;
    });

    setChartData({
      labels,
      datasets: [
        {
          label: "Phân bổ sản phẩm",
          data,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    });
    setPercentages(calculatedPercentages);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    updateChartData(revenueByProductYear, year);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (sum, val) => sum + val,
              0
            );
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(2) : "0.00";
            if (label) label += ": ";
            label += `${value} VNĐ (${percentage}%)`;
            return label;
          },
        },
      },
      datalabels: {
        color: "black",
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
          const percentage =
            total > 0 ? ((value / total) * 100).toFixed(2) : "0.00";
          return `${percentage}%`;
        },
        font: {
          weight: "bold",
          size: 14,
        },
        textAlign: "center",
      },
    },
  };

  if (loading) return <div className="page-container">Đang tải...</div>;
  if (error) return <div className="page-container">Lỗi: {error}</div>;

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="page-title">Thống Kê</h1>
        {years.length > 0 && (
          <div className="year-selector">
            <label htmlFor="year">Chọn năm: </label>
            <select id="year" value={selectedYear} onChange={handleYearChange}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="chart-card">
          <div className="chart-container">
            <div
              className="chart-wrapper"
              style={{ width: "450px", height: "450px" }}
            >
              <Pie data={chartData} options={options} />
            </div>
          </div>
          <p className="chart-description">
            Biểu đồ thể hiện doanh thu của từng sản phẩm trong năm{" "}
            {selectedYear}
          </p>
          <ChartLegend
            labels={chartData.labels}
            data={chartData.datasets[0].data}
            percentages={percentages}
            backgroundColor={chartData.datasets[0].backgroundColor}
            borderColor={chartData.datasets[0].borderColor}
          />
        </div>
      </div>
    </div>
  );
};

export default ThongKe;
