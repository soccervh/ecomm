import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FileUpload } from "./FileUpload";
import { AddMultipleToCart } from "./AddMultipleToCart";
import QueryUser from "./queries/queryUser.graphql";

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
      productPic
    }
  }
`;
export function ProductDisplay() {
  const { loading: lUserQuery, error: eUserQuery, data: dUserQuery } = useQuery(
    QueryUser
  );

  let { slug } = useParams();
  const { loading, error, data } = useQuery(PRODUCTS, {
    variables: { slug: slug },
  });
  return (
    <div className="flex content-center items-center justify-center">
      <div className="w-64">
        <img
          alt={`${data?.getProduct?.name}`}
          src={data?.getProduct?.productPic}
        />
        {dUserQuery?.currentUser?.isSuperuser ? (
          <FileUpload productId={data?.getProduct?.id} />
        ) : (
          ""
        )}
      </div>
      <div className=" ml-8 flex flex-col  ">
        Picture of {slug} <div className="  ">{data?.getProduct?.name}</div>
        <div className="  ">
          <AddMultipleToCart productId={data?.getProduct?.id} />
        </div>
      </div>
    </div>
  );
}
