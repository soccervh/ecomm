import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import MutationAddProductToCart from "../queries/mutationAddProductToCart.graphql";
import QueryCart from "../queries/queryCart.graphql";
import { Field, Form, Formik } from "formik";
import _ from "lodash";
import QueryProduct from "../queries/queryProduct.graphql";

interface CartProductInterface {
  quantity: number;
  id: string | number;
  slug: string;
  product: {
    id: string | number;
    qtyInStock: number;
    slug: string;
  };
}
export function AddMultipleToCart({
  productQtyInStock,
  productSlug,
  productId,
}) {
  const [mutate] = useMutation(MutationAddProductToCart);
  const { loading: lQueryCart, error, data: dQueryCart } = useQuery(QueryCart);

  const optionFieldValue = Math.min(Math.trunc(0.5 * productQtyInStock), 10);
  const findProduct: CartProductInterface = dQueryCart?.cart?.cartProducts.find(
    (cartProduct: CartProductInterface) => {
      return cartProduct.product.id == productId;
    }
  );
  if (lQueryCart) {
    return <div />;
  }

  return (
    <div>
      <Formik
        initialValues={{
          quantity: findProduct?.quantity || 0,
        }}
        onSubmit={async (values) => {
          await mutate({
            variables: {
              slug: productSlug,
              id: productId,
              quantity: values.quantity,
            },
            refetchQueries: [
              {
                query: QueryCart,
              },
            ],
          });
          return;
        }}
      >
        {({ values }) => (
          <Form>
            {optionFieldValue > 0 ? (
              <span>
                <Field as="select" name="quantity">
                  {_.range(0, optionFieldValue + 1, 1).map((e) => {
                    return (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    );
                  })}
                </Field>
                <button type="submit">
                  <span className="px-2 py-1 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full">
                    Update Cart
                  </span>
                </button>
              </span>
            ) : (
              <div>Restocking Soon</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
