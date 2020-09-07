import { Link } from "react-router-dom";
import React from "react";

export function CheckOutButton() {
  return (
    <Link
      className={`py-2 px-4 border rounded border-orange-500 bg-yellow-200 hover:bg-yellow-100`}
      to={"/checkout"}
    >
      Proceed to Check out!
    </Link>
  );
}
