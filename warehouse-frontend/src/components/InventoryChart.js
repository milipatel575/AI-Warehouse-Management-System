import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InventoryChart = ({ products }) => {

  const data = {
    labels: products.map(p => p.name),
    datasets: [
      {
        label: "Stock Quantity",
        data: products.map(p => p.quantity),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  };

  return (
    <div style={{width:"700px", margin:"40px auto"}}>
      <h2>Inventory Analytics</h2>
      <Bar data={data} />
    </div>
  );
};

export default InventoryChart;