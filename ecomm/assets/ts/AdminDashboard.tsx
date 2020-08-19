import React from "react";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  return (
    <div className={`flex`}>
      <nav className={``}>
        <Link
          to={"/admindashboard"}
          className="group flex flex-initial items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
          aria-current="page"
        >
          <span className="truncate flex-initial ">Dashboard</span>
        </Link>
        <Link
          to={"/admindashboard/productadd"}
          className="mt-1 group flex  flex-initial items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
        >
          <span className="truncate flex-initial ">Add product</span>
        </Link>
        <Link
          to={"/admindashboard/productEditAllProducts"}
          className="mt-1 group flex  flex-initial items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
        >
          <span className="truncate flex-initial ">All products</span>
        </Link>
        <Link
          to={"/admindashboard/productEdit"}
          className="mt-1 group flex  flex-initial items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
        >
          <span className="truncate flex-initial ">Edit product</span>
        </Link>
      </nav>
    </div>
  );
}
