import React from "react";
import { useMutation } from "@apollo/react-hooks";
import AddProductToCartMutation from "./queries/cartMutation.graphql";

export function AddOneToCart({ productId }) {
  const [mutate] = useMutation(AddProductToCartMutation);
  return (
    <button
      onClick={(e) => {
        mutate({
          variables: {
            id: productId,
            quantity: 1,
          },
        });
        return;
      }}
    >
      <span className="px-2 py-1 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full">
        Add to Cart
      </span>
    </button>
  );
}
