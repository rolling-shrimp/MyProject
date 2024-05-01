import React from "react";
import useFetchCityCode from "./useFetchCityCode";
import DataWeather from "./DataWeather";
import { Container, Col, Row, Spinner } from "react-bootstrap";
const Weather = ({ countyChoosed }) => {
  const { citycode } = useFetchCityCode(countyChoosed);

  return (
    <Container fluid>
      <Row>
        <Col md={2}></Col>
        <Col
          className="pt-5 d-flex flex-column align-items-center justify-content-evenly"
          style={
            citycode.code === "請求失敗，可能是請求數量超過上限"
              ? { minHeight: "50vh" }
              : { minHeight: "250vh" }
          }
          md={8}
        >
          {citycode.place && (
            <div>
              {/* {citycode.place["里"] && (
                <h3 className="text-white">{citycode.place["里"]}</h3>
              )} */}

              <h3 className="text-white" style={{ textAlign: "center" }}>
                {citycode.place["縣市"]}{" "}
                {citycode.place["鄉鎮、區"] && (
                  <span>{citycode.place["鄉鎮、區"]}</span>
                )}{" "}
                {citycode.place["里"] && <span>{citycode.place["里"]}</span>}
              </h3>
            </div>
          )}
          {citycode.code.length !== 0 ? (
            <>
              {citycode.code === "請求失敗，可能是請求數量超過上限" ? (
                <h1>{citycode.code}</h1>
              ) : (
                <DataWeather
                  type="catchWeather"
                  countyChoosed={countyChoosed}
                  placeToShow={citycode.code}
                />
              )}
            </>
          ) : (
            <Spinner></Spinner>
          )}
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
};

export default Weather;
