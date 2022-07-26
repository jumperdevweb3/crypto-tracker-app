import { Route } from "react-router-dom";
import "./App.scss";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./components/Pages/Home";
import { Watchlist } from "./components/Pages/Watchlist";

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/watchlist">
          <Watchlist />
        </Route>
      </Layout>
    </div>
  );
}

export default App;
