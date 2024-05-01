import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import TheWeatherIcon from "./TheWeatherIcon";
const ForeCastDetail = ({ forecast }) => {
  const { Headline, DailyForecasts } = forecast;
  return (
    <>
      <Card.Title className="d-flex flex-row align-items-center justify-content-center">
        <h1>未來天氣預報</h1>
      </Card.Title>
      {Headline && (
        <Card.Title className="d-flex flex-row align-items-center justify-content-center">
          <h3>{Headline.Text}</h3>
        </Card.Title>
      )}

      <br></br>
      {DailyForecasts && (
        <>
          {" "}
          {DailyForecasts.map((item) => (
            <>
              <Card.Text style={{ backgroundColor: "black", color: "white" }}>
                <Container className="p-3">
                  <Row>
                    <Col>
                      <p>{item.Date.split("T")[0]}</p>
                    </Col>
                    <Col>
                      <TheWeatherIcon num={item.Day.Icon} />
                    </Col>
                    <Col md={4}>
                      <div className="d-flex flex-row align-items-center">
                        <p style={{ textAlign: "center" }}>
                          <span style={{ fontSize: "2rem" }}>
                            {" "}
                            {item.Temperature.Maximum.Value}° /
                          </span>
                          {`${item.Temperature.Minimum.Value}°`}
                        </p>
                      </div>
                    </Col>
                    <Col>
                      <p>
                        <i
                          style={{ color: " #cdd5da" }}
                          className="fa-solid fa-droplet"
                        ></i>{" "}
                        {`${item.Day.RainProbability} %`}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>{item.Day.IconPhrase}</p>
                    </Col>
                  </Row>
                </Container>
              </Card.Text>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default ForeCastDetail;
