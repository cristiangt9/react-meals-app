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
        if(res.data.success) {
          applyData(res.data.data);
        } else {
          setError(res.data.title);
          console.log(res);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Something went wrong!");
        if (e?.response?.data) {
          console.log(e?.response?.data);
        } else {
          console.log(e);
        }
        setIsLoading(false);
      });
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useAxioshttp;
