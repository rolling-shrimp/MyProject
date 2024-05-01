import React, { useEffect, useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import { IconArray } from "./Icon";
const TheWeatherIcon = ({ num }) => {
  const thenum = useMemo(() => {
    return num;
  }, [num]);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    for (let item of IconArray) {
      if (thenum === item.num) {
        setSrc(item);
      }
    }
  }, [thenum]);

  return (
    <>
      {src ? (
        <img style={{ objectFit: "cover" }} alt="weather icon" src={src.img} />
      ) : (
        <Spinner></Spinner>
      )}
    </>
  );
};

export default TheWeatherIcon;
