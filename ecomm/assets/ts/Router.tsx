import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar } from "./navbar";
import { ProductDisplay } from "./product";
import { SigninForm } from "./Signinform";
import { ApolloProvider } from "@apollo/react-hooks";
import { UserProfile } from "./Userprofile";
import { createUploadLink } from "apollo-upload-client";
import Cookie from "universal-cookie";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { AllProducts } from "./AllProducts";
import { HomePage } from "./HomePage";
import { Cart } from "./Cart";
import { CartPage } from "./CartPage";
import { CheckOutPage } from "./CheckOutPage";
const cookies = new Cookie();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    createUploadLink({
      uri: "/graphql/",
      credentials: "same-origin",
      headers: {
        "x-csrftoken": cookies.get("csrftoken"),
      },
    }),
  ]),
});

export function Router() {
  return (
    <div>
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
          <Route path={"/"}>
            <HomePage />
          </Route>
          <Route path={"/cartpage"}>
            <CartPage />
          </Route>
          <Route path={"/checkout"}>
            <CheckOutPage />
          </Route>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}
