import React from "react";
import MutationProductImage from "../queries/MutationProductImage.graphql";
import { useMutation } from "@apollo/react-hooks";
import { Field, useField } from "formik";
export const FileUpload = ({ name }) => {
  const [mutate] = useMutation(MutationProductImage);
  const [field, meta, helpers] = useField(name);
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    if (validity.valid) {
      helpers.setValue(file);
    }
  };
  return <input type="file" onChange={onChange} />;
};
