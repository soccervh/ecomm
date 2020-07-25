import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import UserQuery from "./queries/currentUser.graphql";

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
                query: UserQuery,
                data: { currentUser: currentUser },
              });
            },
          });
        }}
      >
        SignOut
      </button>
    </div>
  );
};
