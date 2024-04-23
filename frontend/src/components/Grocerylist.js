import { Column } from "primereact/column";
import "./grocerylist.css";
import { DataTable } from "primereact/datatable";
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";


export default function Grocerylist(props) {
  // console.log("shopping list from props", props.shoppingList)
  const shoppingList = props.shoppingList

  const footer = (
    <>
      <Button label="Add to My Kitchen" icon="pi pi-check" />
    </>
  );
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
       { shoppingList.map((item) => {
          return <li>{item.quantity} {item.item} {item.name} <input type="checkbox"></input></li> 
        })}
        </ul>
      </Card>
    </div>
  );
}
