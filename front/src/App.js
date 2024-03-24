import { Route, Routes } from "react-router-dom";
import Hompage from "./pages/Hompage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hompage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
