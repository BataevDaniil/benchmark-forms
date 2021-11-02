import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import { FinalForm } from "./FinalForm"
import { FormikForm } from "./Formik"

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
        <Route path="/formik">
          <FormikForm />
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
        <li>
          <Link to="/formik">formik</Link>
        </li>
      </ul>
    </nav>
  )
}

export default App
