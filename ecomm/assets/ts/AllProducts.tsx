import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FuzzySearch from "fuzzy-search";
import classNames from "classnames";
import QueryAllProduct from "./queries/queryAllProducts.graphql";
import { AddOneToCart } from "./cartComponents/AddOneToCart";
import { useCart } from "./hooks/useCart";
import QueryUser from "./queries/queryUser.graphql";
import QueryAllCategories from "./queries/queryCategories.graphql";
import { useParams } from "react-router-dom";
import QueryProduct from "./queries/queryProduct.graphql";
import { useLazyQuery } from "@apollo/client";

export function AllProducts() {
  // @ts-ignore
  let { categorySlug } = useParams();
  const {
    loading: lQueryAllCategories,
    error: eQueryAllCategories,
    data: dQueryAllCategories,
  } = useQuery(QueryAllCategories);
  const [
    queryAllProduct,
    { loading, error, data: dataQueryAllProducts },
  ] = useLazyQuery(QueryAllProduct);

  useEffect(() => {
    queryAllProduct({ variables: { categorySlug: categorySlug } });
  }, [categorySlug]);

  const history = useHistory();
  const { cartData, cartError, cartLoading } = useCart();
  const [productFilter, setProductFilter] = useState("");

  // @ts-ignore

  if ( loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const searcher = new FuzzySearch(
      dataQueryAllProducts?.allProducts || [],
      ["name", "description"],
      {
        caseSensitive: false,
      }
  );

  return (
    <div>
      <div className={`flex`}>
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
          <div
              className={`flex`}>
            <Link
                to={`/products/`}
                className={`p-1 h-8 mr-3 mt-5 px-3 bg-white rounded hover:bg-gray-200 active:bg-blue-200 align-center text-center appearance-none leading-normal`}
            >
              All
            </Link>
          </div>
          {dQueryAllCategories?.allCategories.map(({ id, name, slug }) => {
            return (
              <div
                  key={id}
                  className={`flex`}>
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
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
        {searcher
          .search(productFilter)
          .map(
            ({
              id,
              name,
              price,
              description,
              qtyInStock,
              productPic,
              skuNumber,
              slug,
            }) => {
              const foundProduct = cartData?.cart?.products?.find((product) => {
                return product.product.id === id;
              });
              return (
                <div key={id}>
                  <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
                    <div className="flex-1 flex flex-col p-8">
                      <Link to={`/product/${slug}`}>
                        <img
                          className=" h-32 flex-shrink-0 mx-auto bg-black"
                          src={productPic}
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
                          <AddOneToCart
                            productId={id}
                            productQtyInStock={qtyInStock}
                          />
                        </dd>
                      </dl>
                    </div>
                    <div className="border-t border-gray-200">
                      <div className="-mt-px flex">
                        <div className="w-0 flex-1 flex border-r border-gray-200">
                          <a
                            href="#"
                            className={classNames({
                              "relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm": true,
                              "leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500": true,
                              "focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150": true,

                              "bg-red-200": qtyInStock <= 10 && qtyInStock >= 1,
                              "bg-gray-200": qtyInStock < 1,
                            })}
                          >
                            <span className="ml-3">
                              {qtyInStock < 1
                                ? "Out of Stock"
                                : `${qtyInStock} left in stock`}
                            </span>
                          </a>
                        </div>
                        <div className="-ml-px w-0 flex-1 flex">
                          <a
                            href="#"
                            className="relative bg-blue-200 w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
                          >
                            <span className="ml-3">${price}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              );
            }
          )}
      </ul>
    </div>
  );
}
