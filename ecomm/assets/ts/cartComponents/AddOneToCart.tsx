import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import MutationAddProductToCart from "../queries/mutationAddProductToCart.graphql";

export function AddOneToCart({ productId, productQtyInStock, productQty = 0 }) {
  const [mutate] = useMutation(MutationAddProductToCart);
  const [addOneMoreToCart, setAddOneMoreToCart] = useState(productQty + 1);
  return (
    <button
      onClick={(e) => {
        if (productQtyInStock === 0) {
          alert("Out Of stock!");
        }
        if (productQtyInStock < addOneMoreToCart) {
          alert("We don't have that many in stock.");
        } else {
          mutate({
            variables: {
              id: productId,
              quantity: addOneMoreToCart,
            },
          });
          setAddOneMoreToCart(addOneMoreToCart + 1);

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
