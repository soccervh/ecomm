import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import MutationAddProductToCart from "../queries/mutationAddProductToCart.graphql";

export function AddMultipleToCart({ productId }) {
  const [mutate] = useMutation(MutationAddProductToCart);
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
          }).then(({ data }) => {
            if (!data.addProductToCart.success) {
              alert(data.addProductToCart.message);
            }
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
