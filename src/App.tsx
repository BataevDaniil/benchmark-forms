import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import { FinalForm } from "./FinalForm"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navigation />
        </Route>
        <Route path="/final-form">
          <FinalForm />
        </Route>
      </Switch>
    </Router>
  )
}

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/final-form">final-form</Link>
        </li>
      </ul>
    </nav>
  )
}

export default App
