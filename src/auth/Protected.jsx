import React from "react"
import { Navigate} from "react-router-dom"

function Protected({redirect, children}) {
  const token = localStorage.getItem("a")

  if (token) {
    return children
  }

  return <Navigate to={redirect} replace={true}/>
}

export default Protected