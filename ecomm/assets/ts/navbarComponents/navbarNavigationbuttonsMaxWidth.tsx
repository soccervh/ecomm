import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CartWidget } from "../cartComponents/CartWidget";
import { SignOut } from "../userComponents/Signout";
import { useQuery } from "@apollo/react-hooks";
import QueryCart from "../queries/queryCart.graphql";

import QueryUser from "../queries/queryUser.graphql";
import useClickAway from "../hooks/useClickAway";
import { AdminDashboard } from "../AdminDashboard";
const signIn = <Link to={"/login"}>SignIn</Link>;

function UserName() {
  const { loading: lQueryUser, error, data } = useQuery(QueryUser);
  if (lQueryUser) return <p>Loading...</p>;
  return (
    <div className={"capitalize"}>
      {data?.currentUser?.isSuperuser ? (
        <Link to={"/admindashboard"}>
          <span className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 border-solid border-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
            Admin Dashboard
          </span>
        </Link>
      ) : (
        <div />
      )}
      {data?.currentUser?.username.length < 30 ? (
        <div />
      ) : (
        <Link to={"/login"}>
          <span className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 border-solid border-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
            SignIn
          </span>
        </Link>
      )}
    </div>
  );
}

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

  const { loading, error, data: cartData } = useQuery(QueryCart);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let cartItemTotal = 0;
  cartData.cart?.products?.forEach(({ quantity }) => {
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
            <CartWidget />
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
            <img
              className=""
              src="../img/LorenzEnterprisesLogo.png"
              alt="Lorenz logo"
            />
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            <Link
              to={"/products"}
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Products
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="rounded-md shadow-sm" />
          </div>
          <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
            <div className="ml-3 relative ">
              <div id="cart">
                <button
                  onClick={() => setDropDownCartOpen(true)}
                  className="p-1 border-2 border-transparent text-gray-400 rounded-full  focus:outline-none "
                  aria-label="cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="whitesmoke"
                    width="36px"
                    height="36px"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M15.55 11l2.76-5H6.16l2.37 5z" opacity=".3" />
                    <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
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
              {userData?.currentUser?.isActive ? (
                <div id="navbar" className={`relative`}>
                  <button
                    onClick={() => setDropDownOpen(true)}
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                  >
                    <div
                      className={
                        "capitalize rounded-full h-10 w-10 flex items-center justify-center bg-gray-200 ml-2 text-2xl"
                      }
                    >
                      {userData?.currentUser?.username.length < 30
                        ? userData?.currentUser?.username.charAt(0)
                        : ""}
                    </div>
                  </button>
                  {dropDownOpen && (
                    <UserToggle handleClose={() => setDropDownOpen(false)} />
                  )}
                </div>
              ) : (
                <div className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out capitalize rounded-full h-10 w-10 flex items-center justify-center bg-gray-200 ml-2 text-2xl" />
              )}
            </div>
          </div>
          <UserName />
        </div>
      </div>
    </div>
  );
}
