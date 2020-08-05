import React, { useState } from "react";
import { SignOut } from "./Signout";
import { Link, Route } from "react-router-dom";
import useClickAway from "react-use-click-away";
import { Simulate } from "react-dom/test-utils";
import drop = Simulate.drop;
import { useQuery } from "@apollo/react-hooks";
import { SigninForm } from "./Signinform";
import UserQuery from "./queries/currentUser.graphql";
import { Cart } from "./Cart";
import CartQuery from "./queries/cartQuery.graphql";
import CART from "./queries/cartQuery.graphql";
import useClickAway1 from "./hooks/useClickAway";
import { NavbarNavigationbuttonsMaxWidth } from "./navbarComponents/navbarNavigationbuttonsMaxWidth";

function UserName() {
  const { loading, error, data } = useQuery(UserQuery);
  return (
    <div>
      {data?.currentUser?.username ? data?.currentUser?.username : signIn}
    </div>
  );
}
const signIn = <Link to={"/login"}>SignIn</Link>;
function MenuItem({ children }) {
  return (
    <a
      href="#"
      className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
    >
      {children}
    </a>
  );
}

export function Navbar() {
  return (
    <div>
      <nav className="bg-gray-800">
        <NavbarNavigationbuttonsMaxWidth />

        <div className="hidden md:hidden">
          <div className="px-2 pt-2 pb-3 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Team
            </a>
            <a
              href="#"
              className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Projects
            </a>
            <a
              href="#"
              className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Calendar
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5 sm:px-6">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-6 text-white">
                  Tom Cook
                </div>
                <div className="text-sm font-medium leading-5 text-gray-400">
                  tom@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 sm:px-3">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              >
                Settings
              </a>
              <a
                href="#"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              >
                SignOut
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
