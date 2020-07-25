import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import FuzzySearch from "fuzzy-search";

import AllProduct from "./queries/allProducts.graphql";
import { AddOneToCart } from "./AddOneToCart";

export const USER = gql`
  query currentUserQuery {
    currentUser {
      id
      username
      firstName
      lastName
      email
      dateJoined
    }
  }
`;

export function AllProducts() {
  const { loading, error, data } = useQuery(AllProduct);
  const { loading: l, error: e, data: d, refetch } = useQuery(USER);
  const history = useHistory();
  const [filter, setFilter] = useState("");
  if (loading || l) return <p>Loading...</p>;
  if (error || e) return <p>Error :(</p>;

  if (!d.currentUser) {
    history.push("/login");
  }
  const searcher = new FuzzySearch(
    data?.allProducts || [],
    ["name", "description"],
    {
      caseSensitive: false,
    }
  );
  return (
    <div>
      <input
        placeholder={"search"}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {searcher
          .search(filter)
          .map(
            ({
              id,
              name,
              price,
              description,
              qtyInStock,
              profilePic,
              skuNumber,
              slug,
            }) => (
              <div key={id}>
                <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
                  <div className="flex-1 flex flex-col p-8">
                    <Link to={`/product/${slug}`}>
                      <img
                        className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-top"
                        src={profilePic}
                        alt=""
                      />
                      <h3 className="mt-6 text-gray-900 text-sm leading-5 font-medium">
                        {name}
                      </h3>
                    </Link>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                      <dt className="sr-only">Title</dt>
                      <dd className="text-gray-500 text-sm leading-5">
                        {description}
                      </dd>
                      <dt className="sr-only">Role</dt>
                      <dd className="mt-3">
                        <AddOneToCart productId={id} />
                      </dd>
                    </dl>
                  </div>
                  <div className="border-t border-gray-200">
                    <div className="-mt-px flex">
                      <div className="w-0 flex-1 flex border-r border-gray-200">
                        <a
                          href="#"
                          className={`relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150
                        ${qtyInStock <= 10 ? "bg-red-200" : ""}`}
                        >
                          <span className="ml-3">
                            {qtyInStock} left in stock
                          </span>
                        </a>
                      </div>
                      <div className="-ml-px w-0 flex-1 flex">
                        <a
                          href="#"
                          className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
                        >
                          <span className="ml-3">${price}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            )
          )}
      </ul>
    </div>
  );
}
