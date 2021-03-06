import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import QueryUser from "../queries/queryUser.graphql";
import QueryCart from "../queries/queryCart.graphql";
import { useHistory } from "react-router-dom";

const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      currentUser {
        id
        username
      }
    }
  }
`;

export const SignOut = ({ setDropDownOpen }) => {
  const [signOut, { data }] = useMutation(SIGN_OUT);
  const history = useHistory();
  return (
    <div>
      <button
        className={`w-full text-left`}
        onClick={(e) => {
          e.preventDefault();
          setDropDownOpen(false);
          signOut({
            update(
              cache,
              {
                data: {
                  signOut: { currentUser },
                },
              }
            ) {
              cache.writeQuery({
                query: QueryUser,
                data: { currentUser: currentUser },
              });
              history.push(`/products`);
            },
            refetchQueries: [
              {
                query: QueryCart,
              },
              {
                query: QueryUser,
              },
            ],
          });
        }}
      >
        SignOut
      </button>
    </div>
  );
};
