import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import Spinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const Users = () => {
  const [isSpinnerActive, setSpinnerActive] = useState(false);
  const [error, setError] = useState();
  const [loadingUser, setLoadingUser] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      setSpinnerActive(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const responseData = await response.json();
        if (!response.ok) throw new Error(responseData.message);
        console.log(responseData);
        setLoadingUser(responseData.users);
      } catch (error) {
        setError(error);
      }
      setSpinnerActive(false);
    };
    sendRequest();
  }, []);

  return (
    <>
      {isSpinnerActive && <Spinner asOverlay />}
      <ErrorModal error={error} onClear={() => setError(null)} />
      {!isSpinnerActive && loadingUser && <UsersList users={loadingUser} />}
    </>
  );
};

export default Users;
