import axios from "axios";

// Create an instance of axios with a base URL that changes based on the environment mode
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api",
});
