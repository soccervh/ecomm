import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import CART from "./queries/cartQuery.graphql";

export function Cart() {
  const { loading, error, data } = useQuery(CART);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.cart?.products?.map(({ quantity, product }) => {
        return (
          <div key={product.id}>
            {product.name} {quantity}
          </div>
        );
      })}
      <Link to={"/cartpage"}>Goto Cart</Link>
    </div>
  );
}
