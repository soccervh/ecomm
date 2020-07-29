import React, { Fragment, useContext, useEffect } from "react";
import { Field, Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import UpdateShippingBilling from "./queries/updateShippingBilling.graphql";
import { Link, useHistory } from "react-router-dom";
import { ShippingBillingContext } from "./context";

export function CheckOutPage() {
  const shippingBillingContext = useContext(ShippingBillingContext);
  const [mutate, { data, loading }] = useMutation(UpdateShippingBilling);
  const history = useHistory();

  useEffect(() => {
    if (data && !loading) {
      // data now has {shipping: {}, billing" {} }
      shippingBillingContext.setShippingAddress(
        data.updateShippingBilling.shipping
      );
      shippingBillingContext.setBillingAddress(
        data.updateShippingBilling.billing
      );
      history.push("/payment");
    }
  }, [data, loading]);
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
      {({ values }) => (
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
            <button
              type={"button"}
              onClick={async (e) => {
                // Call your mutation
                // you have the product.id
                //you have the field value under values
                // values['products[1].quantity

                await mutate({
                  variables: {
                    billing: {
                      name: values.billing.name,
                      address: values.billing.address,
                      city: values.billing.city,
                      state: values.billing.state,
                      zip: values.billing.zip,
                    },
                    shipping: {
                      name: values.shipping.name,
                      address: values.shipping.address,
                      city: values.shipping.city,
                      state: values.shipping.state,
                      zip: values.shipping.zip,
                    },
                  },
                });
              }}
            >
              Save and Go to payment
            </button>
          </div>
        </Fragment>
      )}
    </Formik>
  );
}
