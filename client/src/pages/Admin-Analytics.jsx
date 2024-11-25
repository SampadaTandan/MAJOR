import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useAuth } from "../store/auth"; // Make sure this hook is correct and in the right path

// ProfitChart Component
const ProfitChart = ({ analyticsData }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (analyticsData.length > 0) {
      const labels = analyticsData.map((item) => item.Name);
      const profits = analyticsData.map((item) => item.Profit);

      setChartData({
        labels,
        datasets: [
          {
            label: "Profit by Product",
            data: profits,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [analyticsData]);

  return (
    <div style={{ width: "80%", margin: "0 auto", marginTop: "2rem" }}>
      <h2>Business Profit Analysis</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        }}
      />
    </div>
  );
};

// AdminAnalytics Component
const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const { authorizationToken } = useAuth(); // Custom hook for auth token

  // Fetch analytics data from API
  const getAllAnalyticsData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/analytics", {
        headers: {
          Authorization: authorizationToken, // Pass auth token in headers
        },
      });

      if (response.status === 200) {
        setAnalyticsData(response.data);
      } else {
        console.error("Failed to fetch analytics data");
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  // Delete analytics record
  const deleteAnalyticsRecord = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/analytics/delete/${id}`,
        {
          headers: {
            Authorization: authorizationToken, // Pass auth token in headers
          },
        }
      );

      if (response.status === 200) {
        console.log(`Analytics record with ID ${id} deleted successfully`);
        getAllAnalyticsData(); // Refetch data after deletion
      } else {
        console.error("Failed to delete analytics record");
      }
    } catch (error) {
      console.error("Error deleting analytics record:", error);
    }
  };

  // Load data when the component is mounted
  useEffect(() => {
    getAllAnalyticsData();
  }, [authorizationToken]); // Trigger refetch if the auth token changes

  return (
    <section className="admin-analytics-section">
      <div className="container">
        <h1>Admin Analytics Data</h1>
      </div>
      <div className="container admin-analytics">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Profit</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.map((record, index) => (
              <tr key={index}>
                <td>{record.Name}</td>
                <td>{record.Profit}</td>
                <td>{record.Date}</td>
                <td>
                  <button onClick={() => deleteAnalyticsRecord(record._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Embedding the ProfitChart component */}
      <ProfitChart analyticsData={analyticsData} />
    </section>
  );
};

export default AdminAnalytics;
