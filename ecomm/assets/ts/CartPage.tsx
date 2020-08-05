import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import CART from "./queries/cartQuery.graphql";
import { Field, Formik } from "formik";
import get from "lodash/get";
import CartMutation from "./queries/cartMutation.graphql";
import { CheckOutPage } from "./CheckOutPage";
import { Link } from "react-router-dom";
export function CartPage() {
  const { loading, error, data } = useQuery(CART);
  const [mutationQuantity, setMutationQuantity] = useState(0);
  const [mutate] = useMutation(CartMutation);
  if (loading) return <div>"Loading"</div>;
  return (
    <Formik
      initialValues={{
        products: data.cart.products?.map((i) => {
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
        <div className={"flex flex-wrap "}>
          <div className={"w-1/3"}> </div>
          <div className={"w-1/3"}>
            {data?.cart?.products?.map(({ quantity, product }, n) => {
              return (
                <div className={"flex text-center"}>
                  <div className={"w-24"}>
                    <img src={product.profilePic} alt={`${product.name}`} />
                  </div>
                  <div className={"flex flex-wrap"} key={product.id}>
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
                      <button
                        className={`p-2 ml-2 border-solid border-1 rounded border-gray-300 bg-green-100 hover:border-blue-300`}
                        type={"button"}
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
                          });
                        }}
                      >
                        Update
                      </button>
                      <button
                        className={`p-2 ml-2 border-solid border-1 rounded border-gray-300 bg-red-100 hover:border-red-300`}
                        onClick={(e) => {
                          mutate({
                            variables: {
                              id: product.id,
                              quantity: 0,
                            },
                          });
                          return;
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <div className={"w-full text-left ml-2"}>
                      ${quantity * product.price}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={"w-1/3 text-right"}>
            <Link to={"/checkout"}>Check out!</Link>
          </div>
        </div>
      )}
    </Formik>
  );
}
