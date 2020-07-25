import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import AddProductToCartMutation from "./queries/cartMutation.graphql";

export function AddMultipleToCart({ productId }) {
  const [mutate] = useMutation(AddProductToCartMutation);
  const [quantity, setQuantity] = useState("");
  return (
    <div>
      <input
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          mutate({
            variables: {
              id: productId,
              quantity: quantity,
            },
          });
          return;
        }}
      >
        <span className="px-2 py-1 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full">
          Add to Cart
        </span>
      </button>
    </div>
  );
}
