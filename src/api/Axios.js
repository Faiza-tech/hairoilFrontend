import axios from "axios";
import { getToken, logout } from "../utils/auth";


const api = axios.create({

  baseURL: import.meta.env.VITE_API_URL,

});


// Automatically attach token
api.interceptors.request.use((config) => {

  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR
// Auto logout if token expired / invalid
api.interceptors.response.use(
  // Successful response
  (response) => response,


  // Error response
  (error) => {
    // 401 = Unauthorized
    if (error.response?.status === 401) {
      //alert("Your session has expired. Please login again.");

      // IMPORTANT:
      // Do NOT treat failed LOGIN as expired session.
      //
      // Login can return 401 when the email/password
      // is incorrect.

      const requestUrl = error.config?.url || "";

      const isLoginRequest = requestUrl.includes("/api/auth/login");


      // Wrong email/password:
      // Login.jsx handles this itself.
      if (isLoginRequest) {

        // Let Login.jsx handle the error.
        return Promise.reject(error);

      }


      // ------------------------------------------
      // Other 401 requests
      // ------------------------------------------
      //
      // These can mean the existing login token
      // has expired or is invalid.


     // Existing token expired/invalid
      alert(
        "Your session has expired. Please login again."
      );



      logout();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;


