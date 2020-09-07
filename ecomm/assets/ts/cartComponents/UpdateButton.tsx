import React from "react";

export function UpdateButton(props: { onClick: (e) => void }) {
  return (
    <button
      className={`px-4 py-2 ml-2 border-solid border-2 rounded text-green-700 
      uppercase text-sm font-bold
      tracking-wider border-green-300 bg-green-300 hover:border-green-500`}
      type={"button"}
      onClick={props.onClick}
    >
      Update
    </button>
  );
}
