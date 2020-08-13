import React, { useState } from "react";
import QueryUser from "./queries/queryUser.graphql";
import UserEditMutation from "./queries/mutationUserEdit.graphql";
import { useMutation } from "@apollo/react-hooks";
import { Field, Form, Formik } from "formik";
import { useQuery } from "@apollo/client";

export function UserProfileEdit() {
  const { loading, error, data } = useQuery(QueryUser);
  const [billingAddress, setBillingAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [mutate] = useMutation(UserEditMutation);

  return (
    <div>
      <Formik
        initialValues={{
          userEdit: {
            firstName: ``,
            lastName: ``,
            email: ``,
          },
        }}
        onSubmit={async (values) => {
          console.log(values);
          // same shape as initial values
          await mutate({
            variables: {
              firstName: values.userEdit.firstName,
              lastName: values.userEdit.lastName,
              email: values.userEdit.email,
            },
          });
        }}
      >
        <Form className={`flex`}>
          <div className={"flex-initial m-8"}>User Picture</div>
          <div className={`flex-auto`}>
            <div className={`flex`}>
              Name:
              <div>
                {data?.currentUser?.firstName} {data?.currentUser?.lastName}
              </div>
            </div>
            <div className={`grid grid-col-2`}>
              <div>FirstName</div>
              <Field
                className={`outline-none`}
                type="text"
                name="userEdit.firstName"
              />
              <div>LastName</div>
              <Field
                className={`outline-none`}
                type="text"
                name="userEdit.lastName"
              />
            </div>
            <div> Email: {data?.currentUser?.email}</div>
            <div>
              <div>Email:</div>
              <Field
                className={`outline-none`}
                type="text"
                name="userEdit.email"
              />
            </div>
            <div>When you became a member:</div>
            <div>{data?.currentUser?.dateJoined}</div>
            <div></div>
          </div>
          <div className={`flex-initial m-8`}>
            <select
              name={"saveactionselect"}
              className={`items-center justify-center`}
              onChange={(e) => e.target.value}
            >
              <option> ---- </option>
              <option value={"save"}>Save</option>
              <option value={"savereturn"}>Save and return to profile</option>
            </select>
            <div>
              <button type={"submit"}>Submit Edit</button>
            </div>
          </div>
        </Form>
      </Formik>
      <div className={`flex mt-8`}>
        <div className={`flex-auto`}></div>
        <div className={`flex flex-none max-w-lx`}>
          Billing Address:
          <div>
            <select
              name="billingaddress"
              id="billingaddress"
              onChange={(e) => {
                setBillingAddress(
                  data.currentUser.billingSet.find(
                    (a) => a.id === e.target.value
                  )
                );
              }}
            >
              {(data?.currentUser?.billingSet || []).map((d) => {
                console.log(d);
                return (
                  <option key={d.id} value={d.id}>
                    {d.address}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <div>{billingAddress?.address}</div>
            <div>{billingAddress?.city}</div>
            <div>{billingAddress?.state}</div>
          </div>
        </div>

        <div className={`flex-auto mr-4`}>
          Shipping Address:
          <select
            name="addressaddress"
            id="addressaddress"
            onChange={(e) => {
              setShippingAddress(
                data.currentUser.shippingSet.find(
                  (a) => a.id === e.target.value
                )
              );
            }}
          >
            {(data?.currentUser?.shippingSet || []).map((s) => {
              console.log(s);
              return (
                <option key={s.id} value={s.id}>
                  {s.address}
                </option>
              );
            })}
          </select>
        </div>
        <div className={`flex-auto`}>
          <div>{shippingAddress?.address}</div>
          <div>{shippingAddress?.city}</div>
          <div>{shippingAddress?.state}</div>
        </div>
        <div className={`flex-auto`}></div>
      </div>
    </div>
  );
}
