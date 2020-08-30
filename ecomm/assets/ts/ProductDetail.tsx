import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { FileUpload } from "./FileUpload";
import { AddMultipleToCart } from "./cartComponents/AddMultipleToCart";
import QueryUser from "./queries/queryUser.graphql";
import QueryProduct from "./queries/queryProduct.graphql";

export function ProductDetail() {
  const { loading: lUserQuery, error: eUserQuery, data: dUserQuery } = useQuery(
    QueryUser
  );

  // @ts-ignore
    let { slug } = useParams();
  const { loading, error, data } = useQuery(QueryProduct, {
    variables: { slug: slug },
  });
  return (
    <div className="flex content-center items-center justify-center flex-wrap">
        <div className="text-3xl font-semibold w-full text-center mt-8 mb-4">{data?.getProduct?.name}</div>
      <div className="w-64">
        <img
          alt={`${data?.getProduct?.name}`}
          src={data?.getProduct?.productPic}
        />
      </div>
      <div className=" ml-8 flex flex-col  ">
          <AddMultipleToCart productId={data?.getProduct?.id} />
      </div>
    </div>
  );
}