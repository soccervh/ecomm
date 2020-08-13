import React from "react";
import { useQuery } from "@apollo/client";
import QueryUser from "../queries/queryUser.graphql";

export function ProductAdd() {
  const { loading, error, data } = useQuery(QueryUser);

  return <div>Add file</div>;
}
