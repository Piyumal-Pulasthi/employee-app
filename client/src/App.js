import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Employee from "./components/EmployeeView";
import ListEmployee from "./components/ListEmployee";
import Departments from "./components/Departments";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        {/* <Route path="/dashboard">
          <Navbar />
          <Dashboard />
          <Footer />
        </Route> */}
        <Route path="/employee">
          <Navbar />
          <Employee />
        </Route>
        <Route path="/list-employee">
          <Navbar />
          <ListEmployee />
        </Route>
        <Route path="/update-employees/:employeeId">
          <Navbar />
          <Employee />
        </Route>
        <Route path="/departments">
          <Navbar />
          <Departments />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
