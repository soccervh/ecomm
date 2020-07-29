import React, { useContext } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import BillingInfo from "./queries/billingInfoQuery.graphql";
import ShippingInfo from "./queries/shippingInfoQuery.graphql";
import { ShippingBillingContext } from "./context";
import { Cart } from "./Cart";
import { Link, useHistory } from "react-router-dom";
import CART from "./queries/cartQuery.graphql";
import Purchase from "./queries/purchase.graphql";

export function Payment() {
  const { loading: lCart, error: eCart, data: dCart } = useQuery(CART);
  const shippingBillingContext = useContext(ShippingBillingContext);
  const [mutate] = useMutation(Purchase);

  const history = useHistory();
  console.log(shippingBillingContext);
  if (
    !shippingBillingContext.billingAddress?.id ||
    !shippingBillingContext.shippingAddress?.id
  ) {
    console.log("here");
    history.push(`/checkout`);
  }

  const { loading, error, data } = useQuery(BillingInfo, {
    variables: {
      id: shippingBillingContext.billingAddress.id,
    },
  });
  const { loading: l, error: e, data: d } = useQuery(ShippingInfo, {
    variables: {
      id: shippingBillingContext.shippingAddress.id,
    },
  });
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
            return (
              <div key={product.id}>
                {product.name} {quantity} at {product.price}
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={async (e) => {
          await mutate({
            variables: {
              billing: shippingBillingContext.billingAddress.id,
              shipping: shippingBillingContext.shippingAddress.id,
            },
          });
          history.push(`/thankyou`);
        }}
      >
        Purchase
      </button>
    </div>
  );
}
