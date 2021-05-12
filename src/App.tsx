import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import addStudent from "./components/add.component";
import editStudent from "./components/edit.component";
import studentTable from "./components/table.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav style={{display: "flex", justifyContent:"space-between", width:"100%", paddingLeft: "40px", paddingRight: "40px"}} className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/students" className="navbar-brand">
            Laureate
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Student
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/students"} className="nav-link">
                Student List
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/add" component={addStudent} />
            <Route exact path="/edit/:id" component={editStudent} />
            <Route exact path={["/", "/students"]} component={studentTable} />
            {/*<Route path="/student/:id" component={student} />*/}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;