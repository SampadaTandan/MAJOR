import { useState } from "react";
import { useAuth } from "../store/auth";

export const AdminStatus = () => {
  const [stockData, setStockData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const { authorizationToken } = useAuth();

  // Function to fetch and update stock levels periodically
  const updateStockLevels = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/status/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStockData(data.updatedCards); // Update stockData state with the latest data
        console.log("Updated Stock Data:", data);
      } else {
        console.error("Failed to update stock levels");
      }
    } catch (error) {
      console.error("Error updating stock levels:", error);
    }
  };

  // Start or stop the periodic updates
  const handleStockChange = () => {
    if (!isUpdating) {
      const intervalId = setInterval(updateStockLevels, 5000); // Update every 5 seconds
      setIsUpdating(intervalId); // Store the interval ID
      alert("Stock level updates started!");
    } else {
      clearInterval(isUpdating); // Stop updates
      setIsUpdating(false);
      alert("Stock level updates stopped!");
    }
  };

  return (
    <section className="section-admin-status">
      <div className="admin-status-content container">
        <h1 className="main-heading">Stock Level Update</h1>

        <div className="status-item">
          <span>Current Stock Levels:</span>
          <ul>
            {stockData.map((card) => (
              <li key={card._id}>
                {card.name}: {card.Stock}
              </li>
            ))}
          </ul>
        </div>

        <div className="status-item">
          <button onClick={handleStockChange}>
            {isUpdating ? "Stop" : "Start"} Updating Stock
          </button>
        </div>
      </div>
    </section>
  );
};
