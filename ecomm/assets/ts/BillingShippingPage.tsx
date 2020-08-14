import React, { Fragment, useContext, useEffect } from "react";
import { Field, Formik, useField } from "formik";
import { useMutation } from "@apollo/react-hooks";
import MutationUpdateShippingBilling from "./queries/mutationUpdateShippingBilling.graphql";
import { Link, useHistory } from "react-router-dom";
import { ShippingBillingContext } from "./context";
import * as yup from "yup";
import { useQuery } from "@apollo/client";
import QueryUser from "./queries/queryUser.graphql";
let billingText =
  "px-2 mt-2 border border-red-900 rounded bg-red-100 p-1 text-right";
let billingUserInput =
  " mt-2 border-2 border-red-900 rounded active:border-red-500 p-1  bg-white ";
let addressText =
  "px-2 mt-2 border border-blue-900 rounded bg-blue-100 p-1 text-right";
let addressUserInput =
  " mt-2 border-2 border-blue-900 rounded active:border-blue-500 p-1 bg-white ";

function BillingField({ name, children }) {
  const [value, meta, helpers] = useField(name);

  return (
    <Fragment>
      <span className={`${billingText} `}>{children} -</span>
      <span className={`${billingUserInput} `}>
        <Field id={name} className={`outline-none`} type="text" name={name} />
      </span>
      <div
        className={`text-xs text-red-500 col-span-2 flex  justify-end pr-2 my-1`}
      >
        {meta.error && meta.touched && meta.error}
      </div>
    </Fragment>
  );
}

function ShippingField({ name, children }) {
  const [value, meta, helpers] = useField(name);

  return (
    <Fragment>
      <span className={`${addressText} `}>{children} -</span>
      <span className={`${addressUserInput} `}>
        <Field className={`outline-none`} type="text" name={name} />
      </span>
      <div
        className={`text-xs text-red-500 col-span-2 flex justify-end pr-2 my-1`}
      >
        {meta.error && meta.touched && meta.error}
      </div>
    </Fragment>
  );
}
const schema = yup.object({
  shipping: yup.object({
    name: yup.string().required("We need a name to ship to!"),
    phone: yup
      .string()
      .required("We need your digits.")
      .min(10, "We need all your digits.")
      .max(11, "Too many numbers!"),
    address: yup.string().required("Still need an address to ship to!"),
    city: yup.string().required("What city do you live in?"),
    state: yup.string().required("Not sure what state you live in."),
    zip: yup
      .string()
      .required("What is your 5 digit zip?")
      .min(5, "We must have 5 numbers.")
      .max(5, "We only need 5 numbers"),
  }),
  billing: yup.object({
    name: yup.string().required("Who is paying for this?"),
    phone: yup
      .string()
      .required("We need your digits.")
      .min(10, "We must have 10 numbers.")
      .max(11, "Too many numbers!"),
    address: yup.string().required("Where are we billing to?"),
    city: yup.string().required("Your street needs a city!"),
    state: yup.string().required("Your city needs a state!"),
    zip: yup
      .string()
      .required("Everyone has a zip.")
      .min(5, "We must have 5 numbers.")
      .max(5, "We only need 5 numbers"),
  }),
});
export function BillingShippingPage() {
  const shippingBillingContext = useContext(ShippingBillingContext);
  const [mutate, { data, loading }] = useMutation(
    MutationUpdateShippingBilling
  );
  const history = useHistory();
  const { loading: lQueryUser, error, data: dQueryUser } = useQuery(QueryUser);

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
  const billingFormikValuesArray = [
    { values: "billing.name", children: "Persons" },
    { values: "billing.phone", children: "Phone Number" },
    { values: "billing.address", children: "Address" },
    { values: "billing.city", children: "City" },
    { values: "billing.state", children: "State" },
    { values: "billing.zip", children: "Zip" },
  ];
  const shippingFormikValuesArray = [
    { values: "shipping.name", children: "Persons" },
    { values: "shipping.phone", children: "Phone Number" },

    { values: "shipping.address", children: "Address" },
    { values: "shipping.city", children: "City" },
    { values: "shipping.state", children: "State" },
    { values: "shipping.zip", children: "Zip" },
  ];
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        shipping: {
          name: ``,
          phone: ``,
          address: ``,
          city: ``,
          state: ``,
          zip: ``,
        },
        billing: {
          name: ``,
          phone: ``,
          address: ``,
          city: ``,
          state: ``,
          zip: ``,
        },
      }}
      onSubmit={async (values) => {
        // same shape as initial values
        await mutate({
          variables: {
            billing: {
              name: values.billing.name,
              phone: values.billing.phone,
              address: values.billing.address,
              city: values.billing.city,
              state: values.billing.state,
              zip: values.billing.zip,
            },
            shipping: {
              name: values.shipping.name,
              phone: values.shipping.phone,
              address: values.shipping.address,
              city: values.shipping.city,
              state: values.shipping.state,
              zip: values.shipping.zip,
            },
          },
        });
      }}
    >
      {({ values, handleSubmit, errors, touched, setFieldValue }) => (
        <form onSubmit={handleSubmit} className={`grid justify-center `}>
          <div className={`flex`}>
            <div className={`w-1/4`}></div>
            <div className={`w-1200 grid grid-cols-3`}>
              {(dQueryUser?.currentUser?.billingSet || []).map((d) => {
                return (
                  <div key={d.id} className={`border rounded m-2`}>
                    <button
                      onClick={(e) => {
                        setFieldValue("billing", d);
                      }}
                    >
                      <div>{d.name}</div>
                      <div>{d.address}</div>
                      <div>{d.city}</div>
                      <div>{d.state}</div>
                      <div>{d.zip}</div>
                      <div>{d.phone}</div>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className={`w-1/4`}></div>
          </div>
          <div className={`${billingAddressContainer}`}>
            <span className={`${billingAddressInformation}`}>
              Billing Information:
            </span>
            <span className={"grid grid-cols-2 max-w-md col-gap-2"}>
              {billingFormikValuesArray.map(({ values, children }) => (
                <BillingField name={values} children={children} />
              ))}
            </span>
          </div>
          <div>
            <button
              type={"button"}
              onClick={(f) => {
                setFieldValue("shipping", values.billing);
              }}
            >
              Click here if Shipping Address is same as Billing address
            </button>
          </div>
          <div className={`${billingAddressContainer}`}>
            <span className={`${billingAddressInformation}`}>
              Shipping Information:
            </span>
            <span className={"grid grid-cols-2 max-w-md col-gap-2"}>
              {shippingFormikValuesArray.map(({ values, children }) => (
                <ShippingField name={values} children={children} />
              ))}
            </span>
          </div>
          <button
            className={`bg-white border rounded border-gray-900 my-4 hover:bg-yellow-100`}
            type={"submit"}
          >
            Save and Go to payment
          </button>
        </form>
      )}
    </Formik>
  );
}
