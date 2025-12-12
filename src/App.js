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
    <Router>
      <Menu />

      <Switch>
        <Route exact path="/" component={Home} />

        {/* List Pages */}
        <Route exact path="/characters" component={Characters} />
        <Route exact path="/locations" component={Locations} />
        <Route exact path="/episodes" component={Episodes} />

        {/* Dynamic Details */}
        <Route exact path="/:category/:id" component={DynamicDetailsPage} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
