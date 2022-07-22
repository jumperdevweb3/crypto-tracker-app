import "./App.scss";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./components/Pages/Home";

function App() {
  return (
    <div className="App">
      <Layout>
        <Home />
      </Layout>
    </div>
  );
}

export default App;
