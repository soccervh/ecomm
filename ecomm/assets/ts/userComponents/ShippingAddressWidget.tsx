import React from "react";
import { useQuery } from "@apollo/client";
import QueryUser from "../queries/queryUser.graphql";

export function ShippingAddressWidget() {
  const { loading: lQueryUser, error, data: dQueryUser } = useQuery(QueryUser);

  return (
    <div className={`text-left `}>
      <div className={`text-center`}>
        <div>Last Shipped to address:</div>
        <div>{dQueryUser?.currentUser?.billingSet[0].address}</div>
        <div>
          {dQueryUser?.currentUser?.billingSet[0].city}
          {", "}
          {dQueryUser?.currentUser?.billingSet[0].state}
          {dQueryUser?.currentUser?.billingSet[0].zip}
        </div>
      </div>
    </div>
  );
}
