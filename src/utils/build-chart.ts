import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
  DoughnutController,
} from 'chart.js';
import { Chart } from 'chart.js';
// -----------------------------------------------

const FONT_FAMILY = 'Inter, system, -apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Arial, sans-serif';

// Register all chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
  DoughnutController
);

const buildScales = (axes: boolean) => {
  const scales = {
    x: {
      ticks: {
        font: {
          family: FONT_FAMILY,
          size: 12,
        },
      },
    },
    y: {
      ticks: {
        beginAtZero: true,
        font: {
          family: FONT_FAMILY,
          size: 12,
        },
      },
    },
  };

  return axes ? scales : {};
};

const buildLegend = (legend: boolean) => {
  if (!legend) return undefined;
  const leg = {
    position: 'right' as const,
    labels: {
      font: {
        family: FONT_FAMILY,
      },
    },
  };
  return leg;
};

interface ChartConfig {
  ctx: CanvasRenderingContext2D;
  chartType: 'pie' | 'bar' | 'doughnut';
  labels: string[];
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  axes: boolean;
  legend: boolean;
}

export function buildChart(config: ChartConfig) {
  
  const { ctx, chartType, labels, data, backgroundColor, borderColor, axes, legend } = config;

  // Destroy existing chart if it exists
  const existingChart = Chart.getChart(ctx.canvas);
  if (existingChart) {
    existingChart.destroy();
  }

  // Clear the canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  return new Chart(ctx, {
    type: chartType,
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: buildScales(axes),
      plugins: {
        legend: buildLegend(legend),
        tooltip: {
          titleFont: {
            family: FONT_FAMILY,
          },
          bodyFont: {
            family: FONT_FAMILY,
          },
          cornerRadius: 3,
        },
      },
    },
  });
};
