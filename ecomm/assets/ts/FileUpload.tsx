import React from "react";
import MutationProductImage from "./queries/MutationProductImage.graphql";
import { useMutation } from "@apollo/react-hooks";
export const FileUpload = ({ productId }) => {
  const [mutate] = useMutation(MutationProductImage);
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
