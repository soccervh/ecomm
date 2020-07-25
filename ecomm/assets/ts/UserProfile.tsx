import React from "react";
import UserQuery from "./queries/currentUser.graphql";

import { useQuery } from "@apollo/react-hooks";

export function UserProfile() {
  const { loading, error, data } = useQuery(UserQuery);

  return (
    <div>
      <p>
        {data?.currentUser?.firstName} {data?.currentUser?.lastName}
      </p>
      <p>{data?.currentUser?.email}</p>
      <p>{data?.currentUser?.dateJoined}</p>
    </div>
  );
}
