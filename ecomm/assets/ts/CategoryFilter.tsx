import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import QueryAllCategories from "./queries/queryCategories.graphql";
import {ProductFilterContext} from "./context";

export const CategoryFilter = () => {

    const {
        loading: lQueryAllCategories,
        error: eQueryAllCategories,
        data: dQueryAllCategories,
    } = useQuery(QueryAllCategories);

    const {setProductFilter} = useContext(ProductFilterContext)
  return (<div className={`flex`}>
      <input
          className={
              "bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-lg appearance-none leading-normal m-4"
          }
          placeholder={"search"}
          onChange={(e) => {
              setProductFilter(e.target.value);
          }}
      />
      <div className={`flex`}>
          <div className={`flex`}>
              <Link
                  to={`/products/`}
                  className={`p-1 h-8 mr-3 mt-5 px-3 bg-white rounded hover:bg-gray-200 active:bg-blue-200 align-center text-center appearance-none leading-normal`}
              >
                  All
              </Link>
          </div>
          {dQueryAllCategories?.allCategories.map(({ id, name, slug }) => {
              return (
                  <div key={id} className={`flex`}>
                      <Link
                          to={`/products/${slug}`}
                          className={`p-1 h-8 mr-3 mt-5 px-3 bg-white rounded hover:bg-gray-200 active:bg-blue-200 align-center text-center appearance-none leading-normal`}
                      >
                          {name}
                      </Link>
                  </div>
              );
          })}
      </div>
  </div>
  );
}
