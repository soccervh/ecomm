import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import QueryCart from "../queries/queryCart.graphql";

export function CartWidget() {
  const { loading, error, data } = useQuery(QueryCart);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let CartItemTotal = 0;

  return (
    <div>
      {data.cart?.products?.map(({ quantity, product }) => {
        CartItemTotal += quantity;
        return (
          <div key={product.id}>
            <Link
              to={`/product/${product.slug}`}
              className={`flex justify-between py-1 px-1 hover:bg-gray-100`}
            >
              <span>{product.name}</span> <span>{quantity}</span>
            </Link>
          </div>
        );
      })}
      <div className={`my-2 border`}></div>
      <Link
        to={"/cartpage"}
        className={`flex items-center justify-center hover:bg-gray-100 border-double border-4 border-gray-600 hover:border-red-500`}
      >
        <span> Go to Cart</span>
        <svg
          className={`w-6 fill-current ml-1`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
        </svg>
      </Link>
    </div>
  );
}
