import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar } from "./navbar";
import { ProductDetail } from "./ProductDetail";
import { SigninForm } from "./userComponents/Signinform";
import { UserProfile } from "./userComponents/UserProfile";
import { createUploadLink } from "apollo-upload-client";
import Cookie from "universal-cookie";
import { ApolloLink } from "apollo-link";
import { AllProducts } from "./AllProducts";
import { HomePage } from "./HomePage";
import { CartPage } from "./cartComponents/CartPage";
import { BillingShippingPage } from "./BillingShippingPage";
import { Payment } from "./Payment";
import { ProductFilterProvider, ShippingBillingProvider } from "./context";
import { ThankYou } from "./ThankYou";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UserProfileEdit } from "./userComponents/UserProfileEdit";
import { AddressBook } from "./userComponents/AddressBook";
import { AdminDashboard } from "./AdminDashboard";
import { ProductAdd } from "./adminComponents/ProductAdd";
import { ProductEditAllProducts } from "./adminComponents/ProductEditAllProducts";
import { ProductEdit } from "./adminComponents/ProductEdit";
import { SignUp } from "./userComponents/SignUp";
import { CategoryFilter } from "./CategoryFilter";
import { CartWidget } from "./cartComponents/CartWidget";

const cookies = new Cookie();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: "/graphql/",
    credentials: "same-origin",
    headers: {
      "x-csrftoken": cookies.get("csrftoken"),
    },
  }),
});

export function Router() {
  return (
    <div>
      <ShippingBillingProvider>
        <ProductFilterProvider>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <Navbar />
              <Route path="/products(/)?:categorySlug?">
                <CategoryFilter />
                <div className={`flex`}>
                  <div className={``}>
                    <AllProducts />
                  </div>
                  <div className={`text-center w-64 justify-center`}>
                    <CartWidget />
                  </div>
                </div>
              </Route>
              <Route path={"/product/:slug"}>
                <ProductDetail />
              </Route>
              <Route path={"/"} exact={true}>
                <HomePage />
              </Route>
              <Route path={"/cartpage"}>
                <CartPage />
              </Route>
              <Route path={"/checkout"}>
                <BillingShippingPage />
              </Route>
              <Route path={"/payment"}>
                <Payment />
              </Route>
              <Route path={"/thankyou"}>
                <ThankYou />
              </Route>
              <Route path="/login">
                <SigninForm />
              </Route>{" "}
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path={"/addressbook"}>
                <AddressBook />
                <Route path={"/userprofile"}>
                  <UserProfile />
                </Route>
                <Route path={"/userprofileEdit"}>
                  <UserProfileEdit />
                </Route>
              </Route>
              <Route
                path="/admindashboard"
                render={({ match: { url } }) => (
                  <div className={`flex`}>
                    <AdminDashboard />

                    <Route path={`${url}/productadd`}>
                      <ProductAdd />
                    </Route>
                    <Route path={`${url}/productEditAllProducts`}>
                      <ProductEditAllProducts />
                    </Route>
                    <Route path={`${url}/productEdit/:slug`}>
                      <ProductEdit />
                    </Route>
                  </div>
                )}
              />
            </BrowserRouter>
          </ApolloProvider>
        </ProductFilterProvider>
      </ShippingBillingProvider>
    </div>
  );
}
