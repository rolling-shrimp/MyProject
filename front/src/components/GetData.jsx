import { useCallback, useEffect, useState } from "react";

const GetData = (url, item, itemName, itemCode) => {
  const [datas, setDatas] = useState("");
  const executeFetch = useCallback(() => {
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
    getXml(setDatas, url, item, itemName, itemCode);
  }, [url, item, itemName, itemCode]);
  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return { datas };
};

export default GetData;
