import React, { Fragment } from "react";
import { Field, Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import Purchase from "./queries/purchase.graphql";

export function CheckOutPage() {
  const [mutate] = useMutation(Purchase);
  return (
    <Formik
      initialValues={{
        shipping: {
          name: ``,
          address: ``,
          city: ``,
          state: ``,
          zip: ``,
        },
        billing: {
          name: ``,
          address: ``,
          city: ``,
          state: ``,
          zip: ``,
        },
      }}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      <Fragment>
        <div>
          <span>Shipping</span>
          <span className={"grid grid-cols-2 max-w-md bg-gray-300"}>
            <span>Person -</span>
            <span>
              <Field type="text" name={`shipping.name`} />
            </span>
            <span>Address -</span>
            <span>
              <Field type="text" name={`shipping.address`} />
            </span>

            <span>City -</span>
            <span>
              <Field type="text" name={`shipping.city`} />
            </span>
            <span>State -</span>
            <span>
              <Field type="text" maxLength={2} name={`shipping.state`} />
            </span>
            <span>Zip -</span>
            <span>
              <Field type="text" name={`shipping.zip`} />
            </span>
          </span>
        </div>
        <div>
          <span>Billing</span>
          <span className={"grid grid-cols-2 max-w-md bg-gray-300"}>
            <span>Person -</span>
            <span>
              <Field type="text" name={`billing.name`} />
            </span>
            <span>Address -</span>
            <span>
              <Field type="text" name={`billing.address`} />
            </span>

            <span>City -</span>
            <span>
              <Field type="text" name={`billing.city`} />
            </span>
            <span>State -</span>
            <span>
              <Field type="text" name={`billing.state`} />
            </span>
            <span>Zip -</span>
            <span>
              <Field type="text" name={`billing.zip`} />
            </span>
          </span>
        </div>
        <button
            type={"button"}
            onClick={(e) => {
              // Call your mutation
              // you have the product.id
              //you have the field value under values
              // values['products[1].quantity

              mutate({
                variables: {
                  name:
                },
              });

            }}
        >Save and Go to payment</button>
      </Fragment>
    </Formik>
  );
}
