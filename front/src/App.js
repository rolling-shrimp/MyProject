import { Route, Routes } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Hompage from "./pages/Hompage";
function App() {
  return (
    <div className="App">
      <header>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            第三題的導列
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>

      <Routes>
        <Route path="/" element={<Hompage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
