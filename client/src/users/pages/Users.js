import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import Spinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isSpinnerActive, httpError, sendRequest, clearError } =
    useHttpClient();
  const [loadingUser, setLoadingUser] = useState();
  // useEffect(() => {
  //   const sendRequest = async () => {
  //     setSpinnerActive(true);
  //     try {
  //       const response = await fetch("http://localhost:5000/api/users");
  //       const responseData = await response.json();
  //       if (!response.ok) throw new Error(responseData.message);
  //       setLoadingUser(responseData.users);
  //     } catch (error) {
  //       setError(error);
  //     }
  //     setSpinnerActive(false);
  //   };
  //   sendRequest();
  // }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "api/users"
      );
      if (data) setLoadingUser(data.users);
    };

    getUsers();
  }, [sendRequest]);

  return (
    <>
      {isSpinnerActive && <Spinner asOverlay />}
      <ErrorModal error={httpError} onClear={clearError} />
      {!isSpinnerActive && loadingUser && <UsersList users={loadingUser} />}
    </>
  );
};

export default Users;
