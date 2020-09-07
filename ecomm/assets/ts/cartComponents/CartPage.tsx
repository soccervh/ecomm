import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import QueryCart from "../queries/queryCart.graphql";
import { Field, Formik } from "formik";
import get from "lodash/get";
import MutationAddProductToCart from "../queries/mutationAddProductToCart.graphql";
import { CheckOutButton } from "./CheckOutButton";
import { UpdateButton } from "./UpdateButton";
import { DeleteButton } from "./DeleteButton";
import { Link } from "react-router-dom";

export function CartPage({}) {
  const { loading, error, data } = useQuery(QueryCart);
  const [mutationQuantity, setMutationQuantity] = useState(0);
  const [mutate] = useMutation(MutationAddProductToCart);
  const products = data?.cart?.products || [];
  if (loading) return <div>"Loading"</div>;
  return (
    <Formik
      initialValues={{
        products: products.map((i) => {
          return {
            quantity: i.quantity,
            productName: i.product.name,
            productId: i.product.id,
          };
        }),
      }}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ values }) => (
        <div className={"flex flex-wrap py-4"}>
          <div className={"w-1/3"} />
          <div className={"w-1/3"}>
            {products.map(({ quantity, product }, n) => {
              return (
                <div
                  key={product.id}
                  className={
                    "flex flex-none text-center py-4 px-4 mb-2 border rounded border-gray-900"
                  }
                >
                  <div className={"w-24 flex-none"}>
                    <Link to={`/product/${product.slug}`}>
                      <img src={product.productPic} alt={`${product.name}`} />
                    </Link>
                  </div>
                  <div className={"flex flex-wrap"}>
                    <div className={"w-full text-left mx-2"}>
                      {product.name}
                    </div>
                    <div className={""}>
                      <Field
                        maxLength={2}
                        className={"w-12 p-2 ml-2 border rounded"}
                        type="text"
                        name={`products[${n}].quantity`}
                      />
                    </div>
                    <div>
                      <UpdateButton
                        onClick={(e) => {
                          // Call your mutation
                          // you have the product.id
                          //you have the field value under values
                          // values['products[1].quantity

                          mutate({
                            variables: {
                              id: product.id,
                              quantity: get(values, `products.${n}.quantity`),
                            },
                          }).then(({ data }) => {
                            if (!data.addProductToCart.success) {
                              alert(data.addProductToCart.message);
                            }
                          });
                        }}
                      />
                      <DeleteButton
                        onClick={(e) => {
                          mutate({
                            variables: {
                              id: product.id,
                              quantity: 0,
                            },
                          });
                          return;
                        }}
                      />
                    </div>
                    <div className={"w-full text-left ml-2"}>
                      ${quantity * product.price}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={"w-1/3 text-center pt-4"}>
            <CheckOutButton />
          </div>
        </div>
      )}
    </Formik>
  );
}
