import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar } from "./navbar";
import { ProductDisplay } from "./product";
import { SigninForm } from "./Signinform";
import { UserProfile } from "./Userprofile";
import { createUploadLink } from "apollo-upload-client";
import Cookie from "universal-cookie";
import { ApolloLink } from "apollo-link";
import { AllProducts } from "./AllProducts";
import { HomePage } from "./HomePage";
import { CartPage } from "./CartPage";
import { CheckOutPage } from "./CheckOutPage";
import { Payment } from "./Payment";
import { ShippingBillingProvider } from "./context";
import { ThankYou } from "./ThankYou";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UserProfileEdit } from "./UserProfileEdit";
import { AddressBook } from "./AddressBook";
import { AdminDashboard } from "./AdminDashboard";
import { ProductAdd } from "./admin/ProductAdd";
import { ProductEdit } from "./admin/ProductEdit";

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
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Navbar />
            <Route path="/products">
              <AllProducts />
            </Route>
            <Route path="/login">
              <SigninForm />
            </Route>
            <Route path={"/product/:slug"}>
              <ProductDisplay />
            </Route>
            <Route path={"/userprofile"}>
              <UserProfile />
            </Route>
            <Route path={"/userprofileEdit"}>
              <UserProfileEdit />
            </Route>
            <Route path={"/"} exact={true}>
              <HomePage />
            </Route>
            <Route path={"/cartpage"}>
              <CartPage />
            </Route>
            <Route path={"/checkout"}>
              <CheckOutPage />
            </Route>
            <Route path={"/payment"}>
              <Payment />
            </Route>
            <Route path={"/thankyou"}>
              <ThankYou />
            </Route>
            <Route path={"/addressbook"}>
              <AddressBook />
            </Route>
            <Route
              path="/admindashboard"
              render={({ match: { url } }) => (
                <div className={`flex`}>
                  <AdminDashboard />

                  <Route path={`${url}/productadd`}>
                    <ProductAdd />
                  </Route>
                  <Route path={`${url}/productedit`}>
                    <ProductEdit />
                  </Route>
                </div>
              )}
            />
          </BrowserRouter>
        </ApolloProvider>
      </ShippingBillingProvider>
    </div>
  );
}
