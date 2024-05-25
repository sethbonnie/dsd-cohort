import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function Checkbox() {
  // State with list of all checked item
  const [checked, setChecked] = useState([]);
  const checkList = [
    { category: "fruit", name: "Apple" },
    { category: "fruit", name: "Banana" },
  ];

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      console.log(event.target.value);
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";
  //total is accumulator

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <div className="app">
      <div className="checkList">
        <div className="title">Your CheckList:</div>
        <div className="list-container">
          {checkList.map((item, index) => (
            <div key={index}>
              <input value={item.name} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item.name)}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>{`Items checked are: ${checkedItems}`}</div>
    </div>
  );
}
