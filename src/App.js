import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import Characters from "./pages/Characters";
import Locations from "./pages/Locations";
import Episodes from "./pages/Episodes";
import DynamicDetailsPage from "./pages/DynamicDetails";

function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/characters">
            <Characters />
          </Route>
          <Route path="/locations">
            <Locations />
          </Route>
          <Route path="/episodes">
            <Episodes />
          </Route>
          <Route path="/:category/:id">
            <DynamicDetailsPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
