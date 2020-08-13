import React from "react";
import QueryUser from "./queries/queryUser.graphql";

import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import QueryBillingInfo from "./queries/queryBillingInfo.graphql";

export function UserProfile() {
  const { loading, error, data } = useQuery(QueryUser);
  const { loading: lBilling, error: eBilling, data: dBilling } = useQuery(
    QueryBillingInfo
  );
  return (
    <div className={`grid justify-center`}>
      <div>
        {data?.currentUser?.firstName} {data?.currentUser?.lastName}
      </div>
      <div>{data?.currentUser?.email}</div>
      <div>{data?.currentUser?.dateJoined}</div>
      <Link to={`/AddressBook`}>Address Book</Link>
      <div>
        <Link to={`/UserProfileEdit`}>Edit</Link>
      </div>
    </div>
  );
}
