import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { FileUpload } from "./FileUpload";
import { AddMultipleToCart } from "./cartComponents/AddMultipleToCart";
import QueryUser from "./queries/queryUser.graphql";
import QueryProduct from "./queries/queryProduct.graphql";

export function ProductDisplay() {
  const { loading: lUserQuery, error: eUserQuery, data: dUserQuery } = useQuery(
    QueryUser
  );

  let { slug } = useParams();
  const { loading, error, data } = useQuery(QueryProduct, {
    variables: { slug: slug },
  });
  return (
    <div className="flex content-center items-center justify-center">
      <div className="w-64">
        <img
          alt={`${data?.getProduct?.name}`}
          src={data?.getProduct?.productPic}
        />
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
