import React from "react";
import { render } from "react-dom";
import { Router } from "./Router";
function App() {
  return (
    <div>
      <Router />
    </div>
  );
}
render(<App />, document.getElementById("app"));
