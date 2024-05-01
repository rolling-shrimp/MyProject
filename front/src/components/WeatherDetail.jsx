import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import TheWeatherIcon from "./TheWeatherIcon";
const WeatherDetail = ({ weather }) => {
  const {
    WeatherText,
    Temperature,
    UVIndex,
    UVIndexText,
    CloudCover,
    Visibility,
    WindGust,
    Wind,
    Pressure,
    IndoorRelativeHumidity,
    RealFeelTemperature,
    WeatherIcon,
  } = weather;

  return (
    <>
      <Card.Text className="d-flex flex-row align-items-center justify-content-center">
        <TheWeatherIcon num={WeatherIcon} />
      </Card.Text>
      <Card.Title className="d-flex flex-row align-items-center justify-content-center">
        <h1>{` ${Temperature.Metric.Value}° ${Temperature.Metric.Unit}`}</h1>
      </Card.Title>
      <Card.Title className="d-flex flex-row align-items-center justify-content-center">
        <h5>{`${WeatherText} `}</h5>
      </Card.Title>
      <Card.Title className="d-flex flex-row align-items-center justify-content-center">
        <p style={{ fontSize: "12px" }}>
          體感溫度:{" "}
          {`${RealFeelTemperature.Metric.Value}° ${RealFeelTemperature.Metric.Unit}, ${RealFeelTemperature.Metric.Phrase}`}
        </p>
      </Card.Title>
      <Card.Text>
        <Container>
          <Row>
            <Col md={6}>
              {" "}
              <p
                style={{ borderBottom: "gray solid 1px" }}
              >{`最大紫外線數 : ${UVIndex} ${UVIndexText}`}</p>
              <p
                style={{ borderBottom: "gray solid 1px" }}
              >{`雲量 : ${CloudCover}%`}</p>
              <p
                style={{ borderBottom: "gray solid 1px" }}
              >{`能見度 : ${Visibility.Metric.Value} ${Visibility.Metric.Unit}`}</p>
              <p
                style={{ borderBottom: "gray solid 1px" }}
              >{`陣風 : ${WindGust.Speed.Metric.Value} ${WindGust.Speed.Metric.Unit}`}</p>
            </Col>
            <Col md={6}>
              <p
                style={{ borderBottom: "gray solid 1px" }}
              >{`風 : ${Wind.Direction.Localized}, ${Wind.Speed.Metric.Value}${Wind.Speed.Metric.Unit}`}</p>
              <p
                style={{ borderBottom: "gray solid 1px" }}
              >{`氣壓 : ${Pressure.Metric.Value} ${Pressure.Metric.Unit}`}</p>
              <p
                style={{ borderBottom: "gray solid 1px" }}
              >{`濕度 : ${IndoorRelativeHumidity}%`}</p>
            </Col>
          </Row>
        </Container>
      </Card.Text>
    </>
  );
};

export default WeatherDetail;
