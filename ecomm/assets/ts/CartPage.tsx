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
        <table>
          <tbody>
            {data?.cart?.products?.map(({ quantity, product }, n) => {
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>
                    <Field type="text" name={`products[${n}].quantity`} />
                  </td>
                  <td>
                    <button
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
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <Link to={"/checkout"}>Check out!</Link>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </Formik>
  );
}
