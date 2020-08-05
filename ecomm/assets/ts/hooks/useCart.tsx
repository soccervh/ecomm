import React from "react";
import { useQuery } from "@apollo/react-hooks";
import CART from "../queries/cartQuery.graphql";

export const useCart = () => {
  const { loading, error, data } = useQuery(CART);

  return {
    cartData: data,
    cartLoading: loading,
    cartError: error,
  };
};
