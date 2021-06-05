import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const users = [
    {
      id: "u1",
      name: "name 1",
      image:
        "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
      placeCount: 34,
    },
  ];

  return (
    <div>
      <UsersList users={users} />
    </div>
  );
};

export default Users;
