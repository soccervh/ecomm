import React, { useState } from "react";
import AllProduct from "./queries/allProducts.graphql";

export function Filter() {
  return (
    <div>
      <input placeholder={"search"} />
    </div>
  );
}
