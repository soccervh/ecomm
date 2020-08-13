import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import QueryBillingInfo from "./queries/queryBillingInfo.graphql";
import QueryShippingInfo from "./queries/queryShippingInfo.graphql";
import { ShippingBillingContext } from "./context";
import { Cart } from "./Cart";
import { Link, useHistory } from "react-router-dom";
import QueryCart from "./queries/queryCart.graphql";
import MutationPurchase from "./queries/mutationpurchase.graphql";
import QueryAllProduct from "./queries/queryAllProducts.graphql";

export function Payment() {
  const { loading: lCart, error: eCart, data: dCart } = useQuery(QueryCart);
  const shippingBillingContext = useContext(ShippingBillingContext);
  const [mutate] = useMutation(MutationPurchase);
  const history = useHistory();
  console.log(shippingBillingContext);
  if (
    !shippingBillingContext.billingAddress?.id ||
    !shippingBillingContext.shippingAddress?.id
  ) {
    console.log("here");
    history.push(`/checkout`);
  }

  const { loading, error, data } = useQuery(QueryBillingInfo, {
    variables: {
      id: shippingBillingContext.billingAddress.id,
    },
  });
  const { loading: l, error: e, data: d } = useQuery(QueryShippingInfo, {
    variables: {
      id: shippingBillingContext.shippingAddress.id,
    },
  });
  let totalCostOfProducts = 0;
  return (
    <div>
      <span className={'grid grid-cols-4 max-w-md bg-gray-300"'}>
        <span>Billing</span>
        <span> </span>
        <span>Shipping</span>
        <span> </span>
        <span>Name -</span>
        <span>{data?.billingInfo?.name}</span>
        <span>Name -</span>
        <span>{d?.shippingInfo?.name}</span>
        <span>Address -</span>
        <span>{data?.billingInfo?.address}</span>
        <span>Address -</span>
        <span>{d?.shippingInfo?.address}</span>
        <span>City -</span>
        <span>{data?.billingInfo?.city}</span>
        <span>City -</span>
        <span>{d?.shippingInfo?.city}</span>
        <span>State -</span>
        <span>{data?.billingInfo?.state}</span>
        <span>State -</span>
        <span>{d?.shippingInfo?.state}</span>
        <span>Zip -</span>
        <span>{data?.billingInfo?.zip}</span>

        <span>Zip -</span>
        <span>{d?.shippingInfo?.zip}</span>
      </span>
      <div>
        Your Cart
        <div>
          {dCart?.cart?.products?.map(({ quantity, product }) => {
            totalCostOfProducts += quantity * product.price;
            return (
              <div key={product.id}>
                {product.name} {quantity} at {product.price} will cost{" "}
                {quantity * product.price}
              </div>
            );
          })}
        </div>
      </div>
      Total cost will be {totalCostOfProducts} <div> </div>
      <button
        onClick={async (e) => {
          await mutate({
            variables: {
              billing: shippingBillingContext.billingAddress.id,
              shipping: shippingBillingContext.shippingAddress.id,
            },
            refetchQueries: [
              {
                query: QueryAllProduct,
              },
            ],
          });
          history.push(`/thankyou`);
        }}
      >
        Purchase
      </button>
    </div>
  );
}
