import { useCallback, useEffect, useState, useMemo } from "react";
import { theFunctions } from "./functions";

const useFetchCityCode = (placeToshow) => {
  const [citycode, setCitycode] = useState({ code: "", place: {} });

  const theplaces = useMemo(() => {
    return placeToshow;
  }, [placeToshow]);

  const fetch = useCallback(() => {
    const getCityCodes = async () => {
      console.log(theplaces);
      let apiParam;

      if (theplaces["里"]) {
        apiParam = theplaces["里"];
      } else if (theplaces["鄉鎮、區"]) {
        apiParam = theplaces["鄉鎮、區"];
      } else {
        apiParam = theplaces["縣市"];
      }
      console.log(apiParam);

      let url = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.REACT_APP_APIKEY}&q=${apiParam}&language=zh-tw`;
      console.log(url);
      try {
        let response = await theFunctions.fetchWeather(url);
        let data = await response.json();
        setCitycode((prev) => {
          return {
            ...prev,

            code: data,
            place: theplaces,
          };
        });
      } catch (e) {
        console.log(e);
        setCitycode((prev) => {
          return {
            ...prev,

            code: "請求失敗，可能是請求數量超過上限",
            place: theplaces,
          };
        });
      }
    };
    getCityCodes();
  }, [theplaces]);
  useEffect(() => {
    fetch();
  }, [fetch]);

  return { citycode };
};

export default useFetchCityCode;
