import React from "react";
import useFectchWeatherForeCast from "./useFectchWeatherForeCast";
import { Card, Spinner } from "react-bootstrap";

import WeatherDetail from "./WeatherDetail";
import ForeCastDetail from "./ForeCastDetail";
const DataWeather = ({ placeToShow, countyChoosed }) => {
  const { weathers } = useFectchWeatherForeCast(placeToShow, countyChoosed);
  console.log(weathers);
  return (
    <>
      <Card className="w-75">
        <Card.Body>
          {weathers.weatherText ? (
            <>
              {weathers.weatherText === "請求失敗，可能是請求數量超過上限" ? (
                <h1>{weathers.weatherText}</h1>
              ) : (
                <WeatherDetail weather={weathers.weatherText} />
              )}
            </>
          ) : (
            <Spinner animation="border" />
          )}
        </Card.Body>
      </Card>

      <Card className="w-75">
        <Card.Body>
          {weathers.forecast ? (
            <>
              {weathers.forecast === "請求失敗，可能是請求數量超過上限" ? (
                <h1>{weathers.forecast}</h1>
              ) : (
                <ForeCastDetail forecast={weathers.forecast} />
              )}
            </>
          ) : (
            <Spinner animation="border" />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default DataWeather;
