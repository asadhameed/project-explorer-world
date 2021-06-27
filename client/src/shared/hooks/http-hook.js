import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isSpinnerActive, setSpinnerActive] = useState(false);
  const [httpError, setHttpError] = useState();
  const activeHttpRequests = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setSpinnerActive(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        const responseData = await response.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );
        if (!response.ok) throw new Error(responseData.message);
        setSpinnerActive(false);
        return responseData;
      } catch (error) {
        setHttpError(error.message || "Something went wrong, Please try again");
      }
      setSpinnerActive(false);
    },
    []
  );

  const clearError = () => {
    setHttpError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isSpinnerActive, httpError, sendRequest, clearError };
};
