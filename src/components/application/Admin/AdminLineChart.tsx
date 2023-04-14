"use client";

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";

const AdminLineChart = () => {
  ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

  return (
    <div>
      <Line
        data={{
          labels: ["HJello", "world!"],
          datasets: [
            {
              label: "Dataset 1",
              data: [250, 300],
            },
            {
              label: "Dataset 2",
              data: [500, 600],
            },
          ],
        }}
      />
    </div>
  );
};

export default AdminLineChart;
