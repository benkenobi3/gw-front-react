import "./App.sass"
import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom"
import React from "react"
import Home from "./Home"
import Login from "./Login"
import Panel from "./Panel"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/panel" element={<Panel />}/>
      </Routes>
    </Router>
  );
}

export default App