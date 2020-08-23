import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import MutationAddProductToCart from "../queries/mutationAddProductToCart.graphql";
import QueryCart from "../queries/queryCart.graphql";
import QueryUser from "../queries/queryUser.graphql";

export function AddOneToCart({ productId, productQtyInStock }) {
  const [mutate] = useMutation(MutationAddProductToCart);
  const { loading: lCart, error: eCart, data: dCart } = useQuery(QueryCart);

  // upon clicking add to cart it will add the current quantity + 1

  const quantityToSetCartTo =
    (dCart?.cart?.cartProducts.find((cartProduct) => {
      return cartProduct.product.id == productId;
    })?.quantity || 0) + 1;
  return (
    <button
      onClick={(e) => {
        if (productQtyInStock === 0) {
          alert("Out Of stock!");
        } else {
          mutate({
            variables: {
              id: productId,
              quantity: quantityToSetCartTo,
            },
            refetchQueries: [
              {
                query: QueryCart,
              },
            ],
          });

          return;
        }
      }}
    >
      <span className="px-2 py-1 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full">
        Add to Cart
      </span>
    </button>
  );
}
