import { useCallback, useEffect, useState } from "react";

const GetData = (fs, url, item, itemName, itemCode) => {
  const [datas, setDatas] = useState("");
  const executeFetch = useCallback(() => {
    fs(setDatas, url, item, itemName, itemCode);
  }, [url, item, itemName, itemCode]);
  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return { datas };
};

export default GetData;
