import React, { Fragment, useContext, useEffect } from "react";
import { Field, Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import UpdateShippingBilling from "./queries/updateShippingBilling.graphql";
import { Link, useHistory } from "react-router-dom";
import { ShippingBillingContext } from "./context";
let billingText = "px-2 m-2 border border-red-900 rounded bg-red-100 ";
let billingUserInput =
  " m-2 border-2 border-red-900 rounded active:border-red-500";
let addressText = "px-2 m-2 border border-blue-900 rounded bg-blue-100 ";
let addressUserInput =
  " m-2 border-2 border-blue-900 rounded active:border-blue-500";

function BillingField({ name, children }) {
  return (
    <Fragment>
      <span className={`${billingText} `}>{children} -</span>
      <span className={`${billingUserInput} `}>
        <Field type="text" name={name} />
      </span>
    </Fragment>
  );
}

function ShippingField({ name, children }) {
  return (
    <Fragment>
      <span className={`${addressText} `}>{children} -</span>
      <span className={`${addressUserInput} `}>
        <Field type="text" name={name} />
      </span>
    </Fragment>
  );
}
export function CheckOutPage() {
  const shippingBillingContext = useContext(ShippingBillingContext);
  const [mutate, { data, loading }] = useMutation(UpdateShippingBilling);
  const history = useHistory();
  // Css shortcut variables

  let billingAddressContainer = "bg-gray-200 border rounded shadow m-4";
  let billingAddressInformation = "ml-8 mb-2 border-b border-gray-900";
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
        <div className={`grid justify-center `}>
          <div className={`${billingAddressContainer}`}>
            <span className={`${billingAddressInformation}`}>
              Billing Information:
            </span>
            <span className={"grid grid-cols-2 max-w-md"}>
              <BillingField name={`billing.name`}>Person</BillingField>
              <BillingField name={`billing.address`}>Address</BillingField>
              <BillingField name={`billing.city`}>City</BillingField>
              <BillingField name={`billing.state`}>State</BillingField>
              <BillingField name={`billing.zip`}>Zip</BillingField>
            </span>
          </div>

          <div className={`${billingAddressContainer}`}>
            <span className={`${billingAddressInformation}`}>
              Shipping Information:
            </span>
            <span className={"grid grid-cols-2 max-w-md "}>
              <ShippingField name={`shipping.name`}>Person</ShippingField>
              <ShippingField name={`shipping.address`}>Address</ShippingField>
              <ShippingField name={`shipping.city`}>City</ShippingField>
              <ShippingField name={`shipping.state`}>State</ShippingField>
              <ShippingField name={`shipping.zip`}>Zip</ShippingField>
            </span>
          </div>
          <button
            className={`bg-white border rounded border-gray-900 my-4 hover:bg-yellow-100`}
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
      )}
    </Formik>
  );
}
