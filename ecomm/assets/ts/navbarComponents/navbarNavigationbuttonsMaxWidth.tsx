import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";
import { SignOut } from "../Signout";
import { useQuery } from "@apollo/react-hooks";
import QueryCart from "../queries/queryCart.graphql";

import QueryUser from "../queries/queryUser.graphql";
import useClickAway from "../hooks/useClickAway";
import { AdminDashboard } from "../AdminDashboard";
function UserName() {
  const { loading, error, data } = useQuery(QueryUser);

  return (
    <div className={"capitalize"}>
      {data?.currentUser?.isSuperuser ? (
        <Link to={"/admindashboard"}>Admin Dashboard</Link>
      ) : data?.currentUser?.username ? (
        data?.currentUser?.username
      ) : (
        signIn
      )}
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
export function NavbarNavigationbuttonsMaxWidth() {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dropDownCartOpen, setDropDownCartOpen] = useState(false);
  const { data: userData } = useQuery(QueryUser);

  const { loading, error, data } = useQuery(QueryCart);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let cartItemTotal = 0;
  data.cart?.products?.forEach(({ quantity }) => {
    cartItemTotal += quantity;
  });
  const CartToggle = ({ handleClose }) => {
    const cartToggleRef = useRef();
    useClickAway({ ref: cartToggleRef, handleClick: handleClose });
    return (
      <div ref={cartToggleRef}>
        <div
          id={"myDropdown-"}
          className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg
                `}
        >
          <div
            className="py-1 px-2 rounded-md bg-white shadow-xs relative"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <Cart />
          </div>
        </div>
      </div>
    );
  };
  const UserToggle = ({ handleClose }) => {
    const UserToggleRef = useRef();
    useClickAway({ ref: UserToggleRef, handleClick: handleClose });
    return (
      <div className={"absolute mt-1"} ref={UserToggleRef}>
        <div
          id={"myDropdown------------------------------------"}
          className={`  w-48 rounded-md shadow-lg`}
        >
          <div
            className="py-1 rounded-md bg-white shadow-xs"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <Link
              to="/userprofile"
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
              role="menuitem"
            >
              Your Profile
            </Link>
            <a
              href="#"
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
              role="menuitem"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
              role="menuitem"
            >
              <SignOut setDropDownOpen={setDropDownOpen} />
            </a>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex">
          <div className="-ml-2 mr-2 flex items-center md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
            >
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-shrink-0 flex items-center">
            <img className="" src="../img/logo_size.jpg" alt="Lorenz logo" />
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            <Link
              to={"/products"}
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Products
            </Link>
            <a
              href="#"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Projects
            </a>
            <a
              href="#"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Calendar
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="rounded-md shadow-sm">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-600 active:bg-indigo-600 transition duration-150 ease-in-out"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>New Job</span>
              </button>
            </span>
          </div>
          <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
            <div className="ml-3 relative ">
              <div id="cart">
                <button
                  onClick={() => setDropDownCartOpen(true)}
                  className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-300 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {cartItemTotal > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 transform -translate-y-1 translate-x-1 rounded-full text-white text-xs shadow-solid bg-blue-700">
                      {cartItemTotal}
                    </span>
                  )}
                  {dropDownCartOpen && (
                    <CartToggle
                      handleClose={() => setDropDownCartOpen(false)}
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="ml-3 relative">
              <div id="navbar" className={`relative`}>
                <button
                  onClick={() => setDropDownOpen(true)}
                  className="flex  text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <div
                    className={
                      "capitalize rounded-full h-10 w-10 flex items-center justify-center bg-gray-200 ml-2 text-2xl"
                    }
                  >
                    {userData?.currentUser?.username.charAt(0)}
                  </div>
                </button>
                {dropDownOpen && (
                  <UserToggle handleClose={() => setDropDownOpen(false)} />
                )}
              </div>
            </div>
          </div>
          <span className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 border-solid border-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
            <UserName />
          </span>
        </div>
      </div>
    </div>
  );
}
