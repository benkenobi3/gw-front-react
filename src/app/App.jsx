import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom"
import React from "react"
import Protected from "../components/Protected"

import "./App.sass"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Panel from "../pages/Panel"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="login" element={<Login />}/>
        <Route path="panel/*"
          element={
            <Protected>
              <Panel />
            </Protected>
          }
        />
      </Routes>
    </Router>
  );
}

export default App