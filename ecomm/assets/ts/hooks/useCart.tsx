import React from "react";
import { useQuery } from "@apollo/react-hooks";
import QueryCart from "../queries/queryCart.graphql";

export const useCart = () => {
  const { loading, error, data } = useQuery(QueryCart);

  return {
    cartData: data,
    cartLoading: loading,
    cartError: error,
  };
};
