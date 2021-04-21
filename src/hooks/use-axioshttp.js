import axios from "axios";
import { useCallback, useState } from "react";
import qs from "qs";

const useAxioshttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback((requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    axios({
      method: requestConfig?.method ?? "GET",
      url: requestConfig.url,
      headers: requestConfig.headers ?? {},
      data: requestConfig.data,
      paramsSerializer: function (requestConfig) {
        if (
          requestConfig.method.toLowerCase() === "get" ||
          !requestConfig?.method
        ) {
          return "";
        }
        return qs.stringify(requestConfig.data, { arrayFormat: "brackets" });
      },
    })
      .then((res) => {
        applyData(res.data);
      })
      .catch((error) => {
        setError(error.message || "Something went wrong!");
        if (error?.response?.data) {
          console.log(error?.response?.data);
        } else {
          console.log(error);
        }
      });
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useAxioshttp;
