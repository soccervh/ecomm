import React from "react";
import { render } from "react-dom";
import { Router } from "./Router";
function App() {
  return (
    <div className={"bg-gray-300"}>
      <Router />
    </div>
  );
}
render(<App />, document.getElementById("app"));
