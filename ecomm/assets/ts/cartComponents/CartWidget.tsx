import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import QueryCart from "../queries/queryCart.graphql";
import { MinusOneToCart } from "./MinusOneToCart";
import { AddOneToCart } from "./AddOneToCart";

export function CartWidget() {
  const { loading, error, data } = useQuery(QueryCart);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let CartItemTotal = 0;

  return (
    <div className={``}>
      {data.cart?.products?.length > 0 ? (
        <div
          className={`  w-72 flex-shrink-0 text-center  bg-white  mx-auto  rounded p-2`}
        >
          {data.cart?.products?.map(({ quantity, product }) => {
            CartItemTotal += quantity;
            return (
              <div key={product.id} className={`border rounded m-2 flex`}>
                <Link
                  to={`/product/${product.slug}`}
                  className={`flex py-1 px-1 hover:bg-gray-100 rounded`}
                >
                  <img
                    alt={product.name}
                    className={`w-16 flex-shrink-0`}
                    src={product.productPic}
                  />
                </Link>

                <div className={`text-left ml-3 my-auto w-full`}>
                  <div className={`flex justify-between`}>
                    <div className={`w-full font-semibold text-lg`}>
                      {product.name}
                    </div>
                    <div className={`text-red-700 pr-3`}>${product.price}</div>
                  </div>
                  <div className={`flex w-full justify-between flex-right `}>
                    <span className={`text-xs my-auto`}>Quantity - </span>
                    <span className={`border px-2 bg-gray-100 rounded text-lg`}>
                      {quantity}
                    </span>
                    <div className={`pr-3`}>
                      <MinusOneToCart
                        productId={product.id}
                        productQtyInStock={product.id}
                      />
                      {"  "}
                      <AddOneToCart
                        productId={product.id}
                        productQtyInStock={product.id}
                      />
                    </div>
                  </div>
                  <div className={`text-right pr-3`}>
                    Total -{" "}
                    <span className={`text-blue-600`}>
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div className={`  mb-2`} />

          <Link
            to={"/cartpage"}
            className={`flex items-center bg-gray-100 justify-center border rounded hover:bg-gray-200 `}
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
      ) : (
        <div className={`w-48`}>Nothing in Cart </div>
      )}
    </div>
  );
}
