import React from "react";

import gql from "graphql-tag";
const MUTATION = gql`
  mutation($id: ID!, $file: Upload!) {
    uploadProfilePicture(file: $file, id: $id) {
      product {
        id
        profilePic
      }
    }
  }
`;
import { useMutation } from "@apollo/react-hooks";
export const FileUpload = ({ productId }) => {
  const [mutate] = useMutation(MUTATION);
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    if (validity.valid) mutate({ variables: { id: productId, file } });
  };
  return <input type="file" required onChange={onChange} />;
};
// import React from "react";
//
// import gql from "graphql-tag";
//
// import { useMutation } from "@apollo/react-hooks";
//
// const MUTATION = gql`
//   mutation($file: Upload!, $id: ID!) {
//     uploadProfilePicture(file: $file, id: $id) {
//       success
//     }
//   }
// `;
//
// export function FileUpload({ productId }) {
//   // const [mutate] = useMutation(MUTATION);
//   //
//   // function onChange({
//   //   target: {
//   //     validity,
//   //     files: [file],
//   //   },
//   // }: any) {
//   // if (validity.valid) mutate({ variables: { id: 3 } });
// }
//
// return <input type="file" required onChange={onChange} />;
// }
