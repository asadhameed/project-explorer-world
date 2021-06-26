import { useState, useCallback } from "react";

export const useHttpClient = () => {
  const [isSpinnerActive, setSpinnerActive] = useState(false);
  const [httpError, setHttpError] = useState();

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setSpinnerActive(true);
      try {
        const response = await fetch(url, { method, body, headers });
        const responseData = await response.json();
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

  return { isSpinnerActive, httpError, sendRequest, clearError };
};
