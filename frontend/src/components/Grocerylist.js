import { Column } from "primereact/column";
import "./grocerylist.css";
import { DataTable } from "primereact/datatable";
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

export default function Grocerylist() {
  const [list, setList] = useState([
    {
      name: "Strawberries",
      amount: 34,
    },
  ]);

  const [checked, setChecked] = useState(false);

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
          <div>Item Name</div>
          <div>Amount</div>
          <div>Check</div>
        </div>
        <div className="list-item">
          <div>Strawberries</div>
          <div>carton x1</div>
          <Checkbox
            onChange={(e) => setChecked(e.checked)}
            checked={checked}
          ></Checkbox>
        </div>
        <div className="list-item">
          <div>Bananas</div>
          <div>bunch x2</div>
          <Checkbox
            onChange={(e) => setChecked(e.checked)}
            checked={checked}
          ></Checkbox>
        </div>
      </Card>
    </div>
  );
}
