import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

// Registering the required components for Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const PieChart = ({
  pendingCount,
  inProgressCount,
  completedCount,
  onHoldCount,
  cancelledCount,
  awaitingReviewCount,
  assignedCount,
  reopenedCount,
  failedCount,
  deferredCount,
}) => {
  const data = {
    labels: [
      "Pending",
      "In Progress",
      "Completed",
      "On Hold",
      "Cancelled",
      "Awaiting Review",
      "Assigned",
      "Reopened",
      "Failed",
      "Deferred",
    ],
    datasets: [
      {
        data: [
          pendingCount,
          inProgressCount,
          completedCount,
          onHoldCount,
          cancelledCount,
          awaitingReviewCount,
          assignedCount,
          reopenedCount,
          failedCount,
          deferredCount,
        ],
        backgroundColor: [
          "rgba(209, 213, 219, 0.2)", // Pending (Gray)
          "rgba(96, 165, 250, 0.2)", // In Progress (Blue)
          "rgba(74, 222, 128, 0.2)", // Completed (Green)
          "rgba(253, 224, 71, 0.2)", // On Hold (Yellow)
          "rgba(248, 113, 113, 0.2)", // Cancelled (Red)
          "rgba(251, 146, 60, 0.2)", // Awaiting Review (Orange)
          "rgba(192, 132, 252, 0.2)", // Assigned (Purple)
          "rgba(217, 119, 6, 0.2)", // Reopened (Amber)
          "rgba(185, 28, 28, 0.2)", // Failed (Dark Red)
          "rgba(139, 92, 246, 0.2)",
        ],
        borderColor: [
          "rgba(209, 213, 219, 1)", // Pending (Gray)
          "rgba(96, 165, 250, 1)", // In Progress (Blue)
          "rgba(74, 222, 128, 1)", // Completed (Green)
          "rgba(253, 224, 71, 1)", // On Hold (Yellow)
          "rgba(248, 113, 113, 1)", // Cancelled (Red)
          "rgba(251, 146, 60, 1)", // Awaiting Review (Orange)
          "rgba(192, 132, 252, 1)", // Assigned (Purple)
          "rgba(217, 119, 6, 1)", // Reopened (Amber)
          "rgba(185, 28, 28, 1)", // Failed (Dark Red)
          "rgba(139, 92, 246, 1)", // Deferred (Violet)
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
