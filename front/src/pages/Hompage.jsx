import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { friuts } from "../fruits";

const Hompage = () => {
  const [formvalue, setFormvalue] = useState({
    Name: "",
    Gender: "",

    County: "",
  });
  const [check, setCheck] = useState([]);
  const changeArray = (e) => {
    let { value, checked } = e.target;
    if (checked) {
      setCheck([...check, value]);
    } else {
      let oldArr = check;
      let newArr = oldArr.filter((item) => item !== value);
      setCheck(newArr);
    }
  };
  const grape = useRef();
  const changeValue = (e) => {
    let { name, value, checked } = e.target;
    console.log(checked);
    if (checked) {
      setFormvalue({ ...formvalue, [name]: value });
    } else {
      setFormvalue({ ...formvalue, [name]: "" });
    }
    setFormvalue({ ...formvalue, [name]: value });
  };
  useEffect(() => {
    for (let item of check) {
      if (item === "葡萄") {
        alert("目前缺貨中");
        grape.current.checked = false;
        let oldArr = check;
        let newArr = oldArr.filter((item) => item !== "葡萄");
        setCheck(newArr);
      }
    }
  }, [check]);
  // useEffect(() => {
  //   for (let item of check) {
  //     if (item === "葡萄") {
  //       return;
  //     }
  //   }
  //   grape.current.checked = false;
  // }, [grape]);
  return (
    <>
      <Form className="w-50">
        <Form.Control
          name="Name"
          type="text"
          placeholder="請輸入姓名"
          vlaue={formvalue.Name}
          onChange={changeValue}
        ></Form.Control>
        <Form.Group>
          <Form.Label>男</Form.Label>
          <Form.Control
            value="男"
            onChange={changeValue}
            name="Gender"
            type="radio"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>女</Form.Label>
          <Form.Control
            value="女"
            onChange={changeValue}
            name="Gender"
            type="radio"
          />
        </Form.Group>

        {friuts.map((item) => (
          <Form.Group>
            <Form.Label>{item}</Form.Label>
            <Form.Check
              ref={grape}
              value={item}
              onChange={changeArray}
              name="Fruit"
            />
          </Form.Group>
        ))}
        <select value={formvalue.County} onChange={changeValue} name="County">
          <option name="county" value="台中市">
            {" "}
            台中市
          </option>
        </select>
      </Form>
    </>
  );
};

export default Hompage;
