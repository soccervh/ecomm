import React, { useEffect, useState, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { FileUpload } from "./AdminFileUpload";
import QueryUser from "../queries/queryUser.graphql";
import QueryProduct from "../queries/queryProduct.graphql";
import { Field, FieldArray, Form, Formik } from "formik";
import MutationProduct from "../queries/mutationProduct.graphql";
import QueryCategories from "../queries/queryCategories.graphql";
import MutationCategory from "../queries/mutationCategory.graphql";
import { useLazyQuery } from "@apollo/client";
export function ProductEdit() {
  const { loading: lUserQuery, error: eUserQuery, data: dUserQuery } = useQuery(
    QueryUser
  );
  const {
    loading: lQueryCategories,
    error: eQueryCategories,
    data: dQueryCategories,
  } = useQuery(QueryCategories);

  let { slug } = useParams();
  const history = useHistory();
  const [getPRoduct, { loading, error, data }] = useLazyQuery(QueryProduct);

  const [mutate, { error: eMutationProduct }] = useMutation(MutationProduct);
  const [mMutationCategory, { error: eMutationCategory }] = useMutation(
    MutationCategory
  );
  const [showAddCategory, setShowAddCategory] = useState(false);
  useEffect(() => {
    if (data?.getProduct?.slug && slug !== data?.getProduct?.slug) {
      history.push(`/admindashboard/productEdit/${data?.getProduct?.slug}`);
    }
  }, [data?.getProduct?.slug]);

  useEffect(() => {
    if (slug) getPRoduct({ variables: { slug } });
  }, [slug]);

  if (loading) return <div />;

  return (
    <Formik
      initialValues={{
        product: {
          name: data?.getProduct?.name || "",
          slug: data?.getProduct?.slug || "",
          description: data?.getProduct?.description || "",
          price: data?.getProduct?.price || 0,
          qtyInStock: data?.getProduct?.qtyInStock || 0,
          skuNumber: data?.getProduct?.skuNumber || 0,
          category: data?.getProduct?.category?.id || "",
          id: data?.getProduct?.id,
          productImage: "",
        },
        addNewCategory: "",
      }}
      onSubmit={async (values) => {
        // same shape as initial values
        console.log(values);
        await mutate({
          variables: {
            input: {
              name: values.product.name,
              id: values.product.id,
              description: values.product.description,
              slug: values.product.slug,
              price: values.product.price,
              category: values.product.category,
              qtyInStock: values.product.qtyInStock,
              skuNumber: values.product.skuNumber,
              productImage: values.product.productImage,
            },
          },
        });
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="flex  justify-center m-2">
            <div className="w-64">
              <img
                alt={`${data?.getProduct?.name}`}
                src={data?.getProduct?.productPic}
              />
              <FileUpload name={"product.productImage"} />
            </div>
            <div className={`grid grid-cols-2 items-center gap-2 ml-8`}>
              <div className={`text-right`}>Name:</div>
              <Field
                type={"text"}
                className={`p-2 rounded border bg-white focus:bg-green-100 focus:border-green-400  transition ease-in-out duration-300`}
                name={"product.name"}
              />
              <div className={`text-right`}>Category:</div>
              <Field
                as="select"
                placeholder="Category"
                name={"product.category"}
              >
                {dQueryCategories?.allCategories.map((e) => {
                  return <option value={e.id}>{e.name}</option>;
                })}
              </Field>
              <button
                type={"button"}
                className={
                  "bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
                }
                onClick={(e) => {
                  setShowAddCategory(!showAddCategory);
                }}
              >
                New Category
              </button>
              {showAddCategory && (
                <Fragment>
                  <div>
                    <Field name={"addNewCategory"} type="text" />
                  </div>
                  <div />
                  <div>
                    <button
                      className={
                        "bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
                      }
                      type={"button"}
                      onClick={async (e) => {
                        // call mutation with the input value
                        await mMutationCategory({
                          variables: {
                            name: values.addNewCategory,
                          },
                          refetchQueries: [{ query: QueryCategories }],
                          awaitRefetchQueries: true,
                        });

                        // this line does not execute until refetchQueries comes back
                        setFieldValue(
                          "product.category",
                          values.addNewCategory
                        );
                        setShowAddCategory(!showAddCategory);
                      }}
                    >
                      Add new Category
                    </button>
                  </div>
                </Fragment>
              )}
              {!showAddCategory && <div />}

              <div className={`text-right`}>Price:</div>
              <Field
                type={"text"}
                className={`p-2 rounded border bg-white focus:bg-green-100 focus:border-green-400  transition ease-in-out duration-300`}
                name={"product.price"}
              />
              <div className={`text-right`}> Quantity In Stock:</div>
              <Field
                type={"text"}
                className={`p-2 rounded border bg-white focus:bg-green-100 focus:border-green-400  transition ease-in-out duration-300`}
                name={"product.qtyInStock"}
              />
              <div className={`text-right`}> Sku Number:</div>
              <Field
                type={"text"}
                className={`p-2 rounded border bg-white focus:bg-green-100 focus:border-green-400  transition ease-in-out duration-300`}
                name={"product.skuNumber"}
              />
              <div className={`text-right`}> Slug:</div>
              <Field
                type={"text"}
                className={`p-2 rounded border bg-white focus:bg-green-100 focus:border-green-400  transition ease-in-out duration-300`}
                name={"product.slug"}
              />

              <div className={`mt-4 col-span-2 flex justify-end`}>
                <button
                  className={`p-4 border bg-white rounded hover:bg-blue-200 transition ease-in-out duration-300`}
                  type={"submit"}
                >
                  Submit Changes
                </button>
              </div>
              <div className={`col-span-2`}>
                {eMutationProduct?.graphQLErrors.map(({ message }, i) => (
                  <span key={i}>{message}</span>
                ))}
              </div>
            </div>
            <div className={`text-right m-4 items-center `}>Description:</div>
            <Field
              type={"text"}
              as={"textarea"}
              className={`p-2  mt-2 rounded border bg-white focus:bg-green-100 focus:border-green-400  transition ease-in-out duration-300 h-40 w-2000  `}
              name={"product.description"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
