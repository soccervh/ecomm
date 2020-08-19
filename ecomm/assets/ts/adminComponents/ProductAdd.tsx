import React from "react";
import { useQuery } from "@apollo/client";
import QueryUser from "../queries/queryUser.graphql";
import { ProductEdit } from "./ProductEdit";

export function ProductAdd() {
  return (
    <div>
      <ProductEdit />
    </div>
  );
}
