import React from "react";

export function DeleteButton(props: { onClick: (e) => void }) {
  return (
    <button
      className={`p-2 ml-2 border-solid border rounded border-red-300 bg-red-300 hover:border-red-500 uppercase text-sm font-bold text-red-700`}
      onClick={props.onClick}
    >
      Delete
    </button>
  );
}
