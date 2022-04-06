import {
  Link,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom"
import React from "react"
import './App.css'
import { Row } from "antd"

function App() {
  return (
    <Router>
      <Row>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
      </Row>
      <Row>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/panel" element={<Panel />}/>
        </Routes>
      </Row>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>
}

function Login() {
  return <h2>Login</h2>
}

function Panel() {
  return <h2>Panel</h2>
}

export default App