import React from "react";
import SelectPlace from "./components/SelectPlace";
import { Modal } from "react-bootstrap";
import Weather from "./components/Weather";
import { useState, useEffect } from "react";
import { theFunctions } from "./components/functions";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [countyChoosed, setcountyChoosed] = useState(
    theFunctions.getLocalStorage() || {
      縣市: "彰化縣",
      "鄉鎮、區": "彰化市",
    }
  );
  const [openOrnot, setOpenOrNot] = useState(false);
  const open = () => {
    setOpenOrNot(true);
  };
  const close = () => {
    setOpenOrNot(false);
  };
  useEffect(() => {
    if (theFunctions.getLocalStorage()) {
      setcountyChoosed(theFunctions.getLocalStorage());
    }
  }, []);

  return (
    <div className="App">
      <Modal size="lg" show={openOrnot} onHide={close}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <SelectPlace
            key="add"
            type="add"
            setcountyChoosed={setcountyChoosed}
          />
        </Modal.Body>
      </Modal>
      <SelectPlace
        type="choose"
        setcountyChoosed={setcountyChoosed}
        open={open}
      />
      <Weather countyChoosed={countyChoosed} type="getPlaceCode" />
    </div>
  );
}

export default App;
