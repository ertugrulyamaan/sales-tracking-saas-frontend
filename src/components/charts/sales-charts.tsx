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

const MOCK_CHART_DATA = [
  { date: "2026-04-10", salesAmount: "840.25", salesCount: 4 },
  { date: "2026-04-11", salesAmount: "1290.40", salesCount: 6 },
  { date: "2026-04-12", salesAmount: "980.10", salesCount: 5 },
  { date: "2026-04-13", salesAmount: "1650.85", salesCount: 8 },
  { date: "2026-04-14", salesAmount: "1410.55", salesCount: 7 },
  { date: "2026-04-15", salesAmount: "1840.90", salesCount: 9 },
  { date: "2026-04-16", salesAmount: "1725.30", salesCount: 8 },
];

function toChartData(_sales: SaleRecord[]) {
  // Temporary mock data for testing
  // const sorted = [...sales].sort((a, b) => a.date.localeCompare(b.date)).slice(-7);
  const sorted = MOCK_CHART_DATA;

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
        backgroundColor: "rgba(68, 221, 193, 0.75)",
        borderColor: "rgba(68, 221, 193, 1)",
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
          color: "#bbcac4",
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
        ticks: { color: "#85948f" },
        grid: { color: "rgba(133, 148, 143, 0.15)" },
      },
      y: {
        ticks: { color: "#44ddc1" },
        grid: { color: "rgba(133, 148, 143, 0.12)" },
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
