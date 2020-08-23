import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import QueryBillingInfo from "./queries/queryBillingInfo.graphql";
import QueryShippingInfo from "./queries/queryShippingInfo.graphql";
import { ShippingBillingContext } from "./context";
import { Link, useHistory } from "react-router-dom";
import QueryCart from "./queries/queryCart.graphql";
import MutationPurchase from "./queries/mutationpurchase.graphql";
import QueryAllProduct from "./queries/queryAllProducts.graphql";
import MutationProduct from "./queries/mutationProduct.graphql";

export function Payment() {
  const { loading: lCart, error: eCart, data: dCart } = useQuery(QueryCart);
  const shippingBillingContext = useContext(ShippingBillingContext);
  const [purchaseCart] = useMutation(MutationPurchase);
  const [mutationProduct] = useMutation(MutationProduct);
  const history = useHistory();
  console.log(shippingBillingContext);
  if (
    !shippingBillingContext.billingAddress?.id ||
    !shippingBillingContext.shippingAddress?.id
  ) {
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
  const billingArray = [
    { billing: "Name", billingInfo: data?.billingInfo?.name },
    { billing: "Address", billingInfo: data?.billingInfo?.address },
    { billing: "City", billingInfo: data?.billingInfo?.city },
    { billing: "State", billingInfo: data?.billingInfo?.state },
    { billing: "Zip", billingInfo: data?.billingInfo?.zip },
  ];
  const shippingArray = [
    { shipping: "Name", shippingInfo: d?.shippingInfo?.name },
    { shipping: "Address", shippingInfo: d?.shippingInfo?.address },
    { shipping: "City", shippingInfo: d?.shippingInfo?.city },
    { shipping: "State", shippingInfo: d?.shippingInfo?.state },
    { shipping: "Zip", shippingInfo: d?.shippingInfo?.zip },
  ];

  return (
    <div className={``}>
      <div className={`grid grid-cols-2 max-w-3xl m-auto`}>
        <div className={``}>
          <div>Billing</div>
          {billingArray.map((e) => {
            return (
              <div className={`flex w-64`}>
                <div>{e.billing} - </div>
                <div>{e.billingInfo}</div>
              </div>
            );
          })}
        </div>
        <div>
          <div>Shipping</div>
          {shippingArray.map((e) => {
            return (
              <div className={`flex w-64`}>
                <div>{e.shipping} -</div>
                <div>{e.shippingInfo}</div>
              </div>
            );
          })}
        </div>
      </div>
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
          await purchaseCart({
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
