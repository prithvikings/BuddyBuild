import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // <--- CRITICAL: Sends the HttpOnly Cookie
  headers: {
    "Content-Type": "application/json",
  },
});
// Response Interceptor: Handle Global Errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If Backend is down or throws 500
    console.error("[API Error]", error.response?.data || error.message);
    return Promise.reject(error);
  },
);
