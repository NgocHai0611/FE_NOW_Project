import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../css/thongKeChiTieu.css";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ChartLegend = ({
  labels,
  data,
  percentages,
  backgroundColor,
  borderColor,
}) => (
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

const ThongKeChiTieu = ({ customerID }) => {
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
  const [revenueData, setRevenueData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost/orders/stats/product/by-customer/yearly/${customerID}`
        );
        if (!response.ok) throw new Error(`Lỗi API: ${response.status}`);

        const result = await response.json();
        const stats = result.statsByYear;
        if (!stats) throw new Error("Không có dữ liệu statsByYear");

        const availableYears = Object.keys(stats).sort().reverse();
        setRevenueData(stats);
        setYears(availableYears);
        setSelectedYear(availableYears[0]);
        updateChart(stats[availableYears[0]]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [customerID]);

  const updateChart = (yearData) => {
    const labels = Object.keys(yearData);
    const data = labels.map((label) => yearData[label].totalAmount);

    const total = data.reduce((sum, val) => sum + val, 0);
    const calculatedPercentages = data.map((val) =>
      total > 0 ? (val / total) * 100 : 0
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
    const selected = e.target.value;
    setSelectedYear(selected);
    updateChart(revenueData[selected]);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (sum, val) => sum + val,
              0
            );
            const percent =
              total > 0 ? ((value / total) * 100).toFixed(2) : "0.00";
            return `${context.label}: ${value} VNĐ (${percent}%)`;
          },
        },
      },
      datalabels: {
        color: "black",
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
          const percent =
            total > 0 ? ((value / total) * 100).toFixed(2) : "0.00";
          return `${percent}%`;
        },
        font: { weight: "bold", size: 14 },
        textAlign: "center",
      },
    },
  };

  if (loading) return <div className="page-container">Đang tải dữ liệu...</div>;
  if (error) return <div className="page-container">Lỗi: {error}</div>;

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="page-title">Thống Kê Chi Tiêu</h1>

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
            Biểu đồ thể hiện tổng chi tiêu sản phẩm theo năm {selectedYear}
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

export default ThongKeChiTieu;
