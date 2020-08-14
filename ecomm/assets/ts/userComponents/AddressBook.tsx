import React, { useState } from "react";
import { Link } from "react-router-dom";
import QueryUser from "../queries/queryUser.graphql";
import { useQuery } from "@apollo/client";

export function AddressBook() {
  const { loading, error, data } = useQuery(QueryUser);

  const [shippingAddress, setShippingAddress] = useState(null);

  return (
    <div className={``}>
      <div className={``}>
        <Link to={`/userprofile`}>User Profile</Link>
        {">"} Address Book
      </div>
      <div>
        <div>Address book</div>
      </div>
      <div className={`flex`}>
        <div className={`w-1/4`}></div>
        <div className={`w-1200 grid grid-cols-3`}>
          {(data?.currentUser?.billingSet || []).map((d) => {
            return (
              <div key={d.id} className={`border rounded m-2`}>
                <div>{d.id}</div>
                <div>{d.name}</div>
                <div>{d.address}</div>
                <div>{d.city}</div>
                <div>{d.state}</div>
                <div>{d.zip}</div>
                <div>{d.phone}</div>
              </div>
            );
          })}
        </div>{" "}
        <div className={`w-1/4`}></div>
      </div>
    </div>
  );
}
