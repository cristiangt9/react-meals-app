import { useCallback, useState } from "react";
import qs from "qs";
import axios from "../adapters/axios";

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
        if (res.data.success) {
          applyData(res.data.data);
        } else {
          setError(res.data?.data?.title ?? res.data.title);
          console.log(res);
        }
      })
      .catch((e) => {
        setError(e.message || "Something went wrong!");
        if (e?.response?.data) {
          setError(e?.response?.data.title)
          console.log(e?.response?.data);
        } else {
          console.log(e);
        }
      })
      .then(() => {
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
