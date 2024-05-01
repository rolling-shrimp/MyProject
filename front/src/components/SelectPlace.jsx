import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TheSelector from "./TheSelector";
import { addOrsearch } from "./functions";

import Swal from "sweetalert2";
const SelectPlace = ({ type, setcountyChoosed, open }) => {
  const [place, setPlace] = useState({
    縣市: "",
    "鄉鎮、區": "",
    里: "",
  });
  const changePlace = (e) => {
    const { name, value } = e.target;
    if (name === "縣市") {
      setPlace({
        ...place,
        [name]: value === name ? "" : value,
        "鄉鎮、區": "",
        里: "",
      });
    } else if (name === "鄉鎮、區") {
      setPlace({ ...place, [name]: value === name ? "" : value, 里: "" });
    } else {
      setPlace({ ...place, [name]: value === name ? "" : value });
    }
  };

  return (
    <Container
      style={type === "choose" ? { backgroundColor: "black" } : {}}
      fluid
    >
      <Row className="pb-1" md={12}>
        {type === "choose" && (
          <Col md={3}>
            <div
              className="pl-2 pr-2 p-1 d-flex flex-column align-items-center justify-content-center"
              style={{ height: "20vh" }}
            >
              <i
                className="fa-solid fa-cloud"
                style={{ color: " #cdd5da", fontSize: "6rem" }}
              ></i>
            </div>
          </Col>
        )}
        <Col
          className="pl-2 pr-2 pb-1 pt-1 d-flex flex-column align-items-center justify-content-center"
          md={type === "choose" ? 2 : 3}
        >
          <TheSelector
            type={"縣市"}
            url="https://api.nlsc.gov.tw/other/ListCounty"
            item={"countyItem"}
            itemName={"countyname"}
            itemCode={"countycode"}
            changePlace={changePlace}
          />
        </Col>
        <Col
          className="pl-2 pr-2 pb-1 pt-1 d-flex flex-column align-items-center justify-content-center"
          md={type === "choose" ? 2 : 3}
        >
          <TheSelector
            id="region"
            type={"鄉鎮、區"}
            url={`https://api.nlsc.gov.tw/other/ListTown/${place["縣市"].slice(
              0,
              1
            )}`}
            item={"townItem"}
            itemName={"townname"}
            itemCode={"towncode"}
            changePlace={changePlace}
          />
        </Col>
        <Col
          className="pl-2 pr-2 pb-1 pt-1 d-flex flex-column align-items-center justify-content-center"
          md={type === "choose" ? 2 : 3}
        >
          <TheSelector
            id="village"
            type={"里"}
            url={`https://api.nlsc.gov.tw/other/ListVillage/${place[
              "縣市"
            ].slice(0, 1)}/${place["鄉鎮、區"].slice(0, 3)}`}
            item={"village"}
            itemName={"villageName"}
            itemCode={null}
            changePlace={changePlace}
          />
        </Col>

        <Col
          className="pl-2 pr-2 pb-1 pt-1 d-flex flex-column align-items-center justify-content-center"
          md={type === "choose" ? "auto" : 3}
        >
          {type === "choose" ? (
            <Button
              className="w-100"
              variant="secondary"
              type="submit"
              onClick={() => {
                addOrsearch(place, setcountyChoosed, Swal, "search");
              }}
            >
              搜尋
            </Button>
          ) : (
            <Button
              onClick={() => {
                addOrsearch(place, setcountyChoosed, Swal, "add");
              }}
              className="w-100"
              variant="dark"
              type="button"
            >
              儲存
            </Button>
          )}
        </Col>
        {type === "choose" && (
          <>
            {" "}
            <Col
              md={"auto"}
              className=" pl-2 pr-2 pb-1 pt-1 d-flex flex-column align-items-center justify-content-center"
            >
              <Button className="w-100" onClick={open} variant="secondary">
                <i
                  className="fa-solid fa-gear"
                  style={{ color: "#fafafa" }}
                ></i>
              </Button>
            </Col>
            <Col md={2}></Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default SelectPlace;
