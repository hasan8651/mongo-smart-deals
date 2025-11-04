import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  // Add a request interceptor
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      // Do something before request is sent
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
      }
      return config;
    });

    // Add a response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        //     // Any status code that lie within the range of 2xx cause this function to trigger
        //     // Do something with response data
        return response;
      },
      (error) => {
        //     // Any status codes that falls outside the range of 2xx cause this function to trigger
        //     // Do something with response error
        const status = error?.status;
        if (status === 401 || status === 403) {
          console.log("log out the user", status);
          signOutUser().then(() => {
            navigate("/register");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
