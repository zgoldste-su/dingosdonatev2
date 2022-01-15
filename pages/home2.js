import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from "./Home";
import NoPage from "./NoPage";


export default function App() {
  return (
    <Router>
      <Route index element={<Home />} />
      <Route path="*" element={<NoPage />} />
    </Router>
  );
}

if (typeof window !== 'undefined') {
  ReactDOM.render(<App />, document.getElementById("root"));
}