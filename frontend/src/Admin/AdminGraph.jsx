import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://app-m1-recode-server.onrender.com/api/allQuestion"
        );
        const data = response.data?.allQuestion;

        if (!data || data.length === 0) {
          console.warn("No data found!");
          setLoading(false);
          return;
        }

        // Count the number of questions for each difficulty level
        const difficultyCounts = {
          Easy: 0,
          Medium: 0,
          Hard: 0,
        };

        data.forEach((q) => {
          if (q.difficulty === "Easy") difficultyCounts.Easy++;
          else if (q.difficulty === "Medium") difficultyCounts.Medium++;
          else if (q.difficulty === "Hard") difficultyCounts.Hard++;
        });

        // Set chart data
        setChartData({
          labels: ["Easy", "Medium", "Hard"], // Difficulty levels
          datasets: [
            {
              label: "Number of Questions per Difficulty Level",
              data: [
                difficultyCounts.Easy,
                difficultyCounts.Medium,
                difficultyCounts.Hard,
              ],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 99, 132, 0.6)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <GraphBody>
      <div className="graph-body">
        <h2>Question Difficulty Level Distribution</h2>
        {loading ? (
          <p>Loading graph...</p>
        ) : chartData ? (
          <div style={{ width: "80%", height: "400px" }}>
            <Bar
              data={chartData}
              options={{ responsive: true, maintainAspectRatio: false }}
              height={400}
            />
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </GraphBody>
  );
};

export default AdminGraph;

// Styled Components
const GraphBody = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
