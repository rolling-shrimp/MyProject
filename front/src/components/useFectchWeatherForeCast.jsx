import { useCallback, useEffect, useMemo, useState } from "react";
import { theFunctions } from "./functions";

const useFectchWeatherForeCast = (placeToShow, countyChoosed) => {
  let getWeatherAndForeCast = async (url, type) => {
    return theFunctions
      .fetchWeather(url)
      .then((response) => {
        console.log(url);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (type === "weather") {
          let current = data[0];

          return current;
        } else {
          let forecast = data;
          return forecast;
        }
      })
      .catch((e) => {
        console.log(e);

        return "請求失敗，可能是請求數量超過上限";
      });
  };

  const [weathers, setweathers] = useState({ weatherText: "", forecast: "" });
  const theplaces = useMemo(() => {
    return placeToShow;
  }, [placeToShow]);
  const getAllData = useCallback(() => {
    const fetchData = async () => {
      let apiParam;

      try {
        for (let item of theplaces) {
          console.log(item);
          console.log(countyChoosed);
          if (countyChoosed["鄉鎮、區"]) {
            if (
              item.AdministrativeArea.LocalizedName === countyChoosed["縣市"] &&
              item.LocalizedName === countyChoosed["鄉鎮、區"]
            ) {
              apiParam = item.Key;
              console.log(apiParam);
              break;
            } else if (
              item.AdministrativeArea.LocalizedName === countyChoosed["縣市"] &&
              item.SupplementalAdminAreas[0].LocalizedName ===
                countyChoosed["鄉鎮、區"]
            ) {
              apiParam = item.Key;
              console.log(apiParam);
              break;
            }
          } else {
            if (item.LocalizedName === countyChoosed["縣市"]) {
              apiParam = item.Key;

              break;
            }
          }
        }

        let url = `https://dataservice.accuweather.com/currentconditions/v1/${apiParam}?apikey=${process.env.REACT_APP_APIKEY}&language=zh-tw&details=true`;
        let foreCastUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${apiParam}?apikey=${process.env.REACT_APP_APIKEY}&language=zh-tw&details=true&metric=true`;

        let [weatherText, forecast] = await Promise.all([
          getWeatherAndForeCast(url, "weather"),
          getWeatherAndForeCast(foreCastUrl, "forecast"),
        ]);
        console.log(weatherText);
        console.log(forecast);
        setweathers((prev) => {
          return { ...prev, weatherText: weatherText, forecast: forecast };
        });
      } catch (e) {
        console.log(e);
        setweathers((prev) => {
          return {
            ...prev,

            weatherText: "請求失敗，可能是請求數量超過上限",
            forecast: "請求失敗，可能是請求數量超過上限",
          };
        });
      }
    };
    fetchData();
  }, [theplaces, countyChoosed]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return { weathers };
};

export default useFectchWeatherForeCast;
