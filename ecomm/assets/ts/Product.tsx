import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FileUpload } from "./FileUpload";
import { AddMultipleToCart } from "./AddMultipleToCart";

const PRODUCTS = gql`
  query fff($slug: String!) {
    getProduct(slug: $slug) {
      name
      price
      id
      description
      qtyInStock
      skuNumber
      slug
      profilePic
    }
  }
`;
export function ProductDisplay() {
  let { slug } = useParams();
  const { loading, error, data } = useQuery(PRODUCTS, {
    variables: { slug: slug },
  });
  return (
    <div>
      Product Display for {slug}
      <p>{data?.getProduct?.name}</p>
      <p>
        <AddMultipleToCart productId={data?.getProduct?.id} />
      </p>
      <img src={data?.getProduct?.profilePic} />
      <FileUpload productId={data?.getProduct?.id} />
    </div>
  );
}
