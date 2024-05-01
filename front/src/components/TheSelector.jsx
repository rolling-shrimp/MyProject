import React, { useMemo } from "react";
import { Form } from "react-bootstrap";
import GetData from "./GetData";
const TheSelector = ({ type, url, item, itemName, itemCode, changePlace }) => {
  function getXml(setState, apiurl, item, itemName, itemCode) {
    var xml = new XMLHttpRequest();
    xml.onload = function () {
      var xmldom = new DOMParser();
      var data = xmldom.parseFromString(this.responseText, "text/xml");

      let list = Array.from(data.getElementsByTagName(item)).map((item) => {
        let Code =
          itemCode == null
            ? null
            : item.getElementsByTagName(itemCode)[0].textContent;
        let Name = item.getElementsByTagName(itemName)[0].textContent;
        return itemCode == null ? { Name } : { Code, Name };
      });

      setState(list);
    };
    xml.open("GET", apiurl);
    xml.send();
  }
  const theurl = useMemo(() => {
    return url;
  }, [url]);
  const { datas } = GetData(getXml, theurl, item, itemName, itemCode);

  return (
    <Form.Select onChange={changePlace} name={type}>
      <option value={null}>{type}</option>
      {Array.isArray(datas) &&
        datas.map((item) => (
          <option
            key={type === "里" ? item.Name : item.Code}
            value={type === "里" ? item.Name : item.Code + item.Name}
            style={{ textAlign: "center" }}
          >
            {item.Name}
          </option>
        ))}
    </Form.Select>
  );
};

export default TheSelector;
