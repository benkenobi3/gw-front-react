import React from "react"
import {Navigate} from "react-router-dom"

function Protected({children}) {
  const token = localStorage.getItem("a")

  if (token) {
    return children
  }

  return <Navigate to={`/login?next=${window.location.pathname}`} replace={true}/>
}

export default Protected