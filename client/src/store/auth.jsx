import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null); // Initialize user as null
  const [services, setServices] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;

  // Function to store the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Logout function to clear token and user info
  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  // Function to check if the user is authenticated
  const userAuthentication = async () => {
    if (!token) return; // Exit if there's no token

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData); // Set the user data in state
        setIsLoading(false);
      } else {
        console.error("Error fetching user data");
        LogoutUser(); // Log out if fetching user data fails
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      LogoutUser(); // Log out on error
    }
  };

  // Function to get service data
  const getServiceData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const services = await response.json();
        setServices(services.data);
      } else {
        console.error("Error fetching service data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get cards data
  const getCardData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cd/card", {
        method: "GET",
      });

      if (response.ok) {
        const cards = await response.json();
        setCards(cards.data);
      } else {
        console.error("Error fetching service data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Run authentication check when token changes or on initial load
  useEffect(() => {
    userAuthentication();
    getServiceData();
    getCardData();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        cards,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return authContextValue;
};
