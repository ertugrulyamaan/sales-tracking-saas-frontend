"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import type { SaleRecord } from "@/types/api";
import { shortDateLabel } from "@/features/sales/metrics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler,
);

type SalesChartProps = {
  sales: SaleRecord[];
};

function toChartData(sales: SaleRecord[]) {
  const sorted = [...sales].sort((a, b) => a.date.localeCompare(b.date)).slice(-7);

  return {
    labels: sorted.map((sale) => shortDateLabel(sale.date)),
    amounts: sorted.map((sale) => Number(sale.salesAmount)),
    counts: sorted.map((sale) => sale.salesCount),
  };
}

export function MissionRevenueBarChart({ sales }: SalesChartProps) {
  const { labels, amounts } = toChartData(sales);

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: amounts,
        backgroundColor: "rgba(0, 224, 255, 0.7)",
        borderColor: "rgba(0, 224, 255, 1)",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        labels: {
          color: "#9bb6ca",
          boxWidth: 10,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `Revenue: $${Number(ctx.parsed.y).toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#7f98ae" },
        grid: { color: "rgba(127, 152, 174, 0.2)" },
      },
      y: {
        ticks: { color: "#00e0ff" },
        grid: { color: "rgba(127, 152, 174, 0.16)" },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export function LightRevenueLineChart({ sales }: SalesChartProps) {
  const { labels, amounts, counts } = toChartData(sales);

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: amounts,
        borderColor: "#006b5c",
        backgroundColor: "rgba(0, 107, 92, 0.18)",
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: "Sales Count",
        data: counts,
        borderColor: "#4d5d58",
        backgroundColor: "#4d5d58",
        yAxisID: "yCount",
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        labels: {
          color: "#404946",
          boxWidth: 10,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            ctx.dataset.label === "Revenue"
              ? `Revenue: $${Number(ctx.parsed.y).toFixed(2)}`
              : `Sales Count: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#5b6763" },
        grid: { color: "rgba(60, 74, 70, 0.12)" },
      },
      y: {
        ticks: { color: "#006b5c" },
        grid: { color: "rgba(60, 74, 70, 0.12)" },
      },
      yCount: {
        position: "right",
        ticks: { color: "#4d5d58", precision: 0 },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return <Line data={data} options={options} />;
}
