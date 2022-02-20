import { Suspense } from "react";
import "./App.css";
import Routes from "./Routes";
function App() {
  return (
    <Suspense fallback={null}>
      <div className="App">
        <Routes />
      </div>
    </Suspense>
  );
}

export default App;
