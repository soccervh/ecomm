import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { FileUpload } from "./FileUpload";
import { AddMultipleToCart } from "./cartComponents/AddMultipleToCart";
import QueryUser from "./queries/queryUser.graphql";
import QueryProduct from "./queries/queryProduct.graphql";
import { CartWidget } from "./cartComponents/CartWidget";
import { ShippingAddressWidget } from "./userComponents/ShippingAddressWidget";

export function ProductDetail() {
  const { loading: lUserQuery, error: eUserQuery, data: dUserQuery } = useQuery(
    QueryUser
  );

  // @ts-ignore
  let { slug } = useParams();
  const {
    loading: lQueryProduct,
    error: eQueryProduct,
    data: dQueryProduct,
  } = useQuery(QueryProduct, {
    variables: { slug: slug },
  });
  return (
    <div>
      <div className={"flex"}>
        <div
          className={`flex flex-wrap  sm:flex-wrap md:flex-wrap lg:flex-no-wrap xl:flex-no-wrap`}
        >
          <div
            className="min-w-0 w-128 flex-shrink-0 rounded
                              "
          >
            <img
              className={`min-w-0 w-128 flex-shrink-0 rounded`}
              alt={`${dQueryProduct?.getProduct?.name}`}
              src={dQueryProduct?.getProduct?.productPic}
            />
          </div>
          <div className={`ml-2 divide-y mx-auto divide-gray-400`}>
            <div className={`text-3xl`}>{dQueryProduct?.getProduct?.name}</div>
            <div className={``}>{dQueryProduct?.getProduct?.description}</div>
            <div className={``}>{dQueryProduct?.getProduct?.price}</div>
            <div className={``}>
              {dQueryProduct?.getProduct?.qtyInStock > 20
                ? "In Stock"
                : dQueryProduct?.getProduct?.qtyInStock < 1
                ? "Out Of Stock"
                : "Few Left"}
            </div>
          </div>
        </div>
        <div className={` w-72 flex-shrink-0  text-center mt-20`}>
          <div className={``}>
            <AddMultipleToCart
              productId={dQueryProduct?.getProduct?.id}
              productSlug={dQueryProduct?.getProduct?.slug}
              productQtyInStock={dQueryProduct?.getProduct?.qtyInStock}
            />
          </div>
          <ShippingAddressWidget />
          <CartWidget />
        </div>
      </div>
    </div>
  );
}
