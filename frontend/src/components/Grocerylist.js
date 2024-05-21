import { Column } from "primereact/column";
import "./grocerylist.css";
import { DataTable } from "primereact/datatable";
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export default function Grocerylist(props) {
  // console.log("shopping list from props", props.shoppingList)
  const shoppingList = props.shoppingList;
  console.log("shopping list" + props.shoppingList);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);

  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  var checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  const handleCheck = (event) => {
    var updatedList = [...checked];
    console.log(event.target.value);
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const footer = (
    <>
      <Button
        onClick={handleAddIngredientsToKitchen}
        label="Add to My Kitchen"
        icon="pi pi-check"
      />
    </>
  );

  function handleAddIngredientsToKitchen() {
    console.log("add to kitcken");
  }

  return (
    <div className="grocery-list-container">
      <Card
        title="..................Grocery List.................."
        footer={footer}
        className="md:w-25rem"
      >
        <div className="list-item">
          <div>Amount</div>
          <div>Item Name</div>
        </div>
        <ul>
          {shoppingList.map((item, index) => (
            <li className={isChecked(item)} type="checkbox">
              {item.quantity} {item.item} {item.name}
              {index}{" "}
              <input
                value={item.name}
                onChange={handleCheck}
                type="checkbox"
              ></input>
              {console.log(item)}
            </li>
          ))}
        </ul>
        <div>{`checked items: ${checkedItems}`}</div>
        <div>{props.handleCallback(checkedItems)}</div>
        {console.log("props callback" + props.handleCallback(checkedItems))}
      </Card>
    </div>
  );
}
