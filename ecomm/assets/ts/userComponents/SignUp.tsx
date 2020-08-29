import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import QueryUser from "../queries/queryUser.graphql";
import { useMutation } from "@apollo/react-hooks";
import SignUpMutation from "../queries/mutationSignUp.graphql";
import { Field, Form, Formik } from "formik";
import { useHistory } from "react-router";
import QueryCart from "../queries/queryCart.graphql";

export function SignUp() {
  const [mSignUpMutation] = useMutation(SignUpMutation);
  const history = useHistory();
  return (
    <div>
      <Formik
        initialValues={{
          user: {
            userName: ``,
            password: ``,
            firstName: ``,
            lastName: ``,
            email: ``,
          },
        }}
        onSubmit={async (values) => {
          console.log(values);
          // same shape as initial values
          await mSignUpMutation({
            variables: {
              input: {
                firstName: values.user.firstName,
                lastName: values.user.lastName,
                email: values.user.email,
                username: values.user.userName,
                password: values.user.password,
              },
            },
            refetchQueries: [
              {
                query: QueryUser,
              },
            ],
          });
          history.push("/products");
        }}
      >
        <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6">
          <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
            <div className="px-4 py-8 sm:px-10">
              <div>
                <p className="text-sm leading-5 font-medium text-gray-700 text-center">
                  Sign in with
                </p>

                <div className="mt-1 grid grid-cols-3 gap-3">
                  <div>
                    <span className="w-full inline-flex rounded-md shadow-sm">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                        aria-label="Sign in with Facebook"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>

                  <div>
                    <span className="w-full inline-flex rounded-md shadow-sm">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                        aria-label="Sign in with Twitter"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </button>
                    </span>
                  </div>

                  <div>
                    <span className="w-full inline-flex rounded-md shadow-sm">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                        aria-label="Sign in with GitHub"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm leading-5">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="space-y-6">
                  <Form>
                    <div>
                      <label form="firstName" className="sr-only">
                        First Name
                      </label>
                      <div className="rounded-md shadow-sm">
                        <Field
                          type="text"
                          name="user.firstName"
                          placeholder="First name"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        />
                      </div>
                      <label form="lastName" className="sr-only">
                        Last Name
                      </label>
                      <div className="rounded-md shadow-sm">
                        <Field
                          type="text"
                          name="user.lastName"
                          placeholder="Last name"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        />
                      </div>

                      <div>
                        <label form="email" className="sr-only">
                          Email
                        </label>
                        <div className="rounded-md shadow-sm">
                          <Field
                            type="email"
                            name="user.email"
                            placeholder="email"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          />
                        </div>
                        <label form="userName" className="sr-only">
                          User Name
                        </label>
                        <div className="rounded-md shadow-sm">
                          <Field
                            type="text"
                            name="user.userName"
                            placeholder="User name"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          />
                        </div>
                        <div>
                          <label form="password" className="sr-only">
                            Password
                          </label>
                          <div className="rounded-md shadow-sm">
                            <Field
                              type="password"
                              name="user.password"
                              placeholder="Password"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            />
                          </div>

                          <div>
                            <span className="block w-full rounded-md shadow-sm">
                              <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                              >
                                Create your account
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                  <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
                    <p className="text-xs leading-5 text-gray-500">
                      By creating this account, you agree to our{" "}
                      <a
                        href="#"
                        className="font-medium text-gray-900 hover:underline"
                      >
                        Terms
                      </a>
                      ,{" "}
                      <a
                        href="#"
                        className="font-medium text-gray-900 hover:underline"
                      >
                        Data Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="font-medium text-gray-900 hover:underline"
                      >
                        Cookies Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </div>
  );
}
