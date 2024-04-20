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
      <Button label="Add to Kitchen" icon="pi pi-check" />
    </>
  );
  return (
    <header className="App-header">
      <div className="card flex justify-content-center">
        <Card title="Grocery List" footer={footer} className="md:w-25rem">
          <p className="m-0">
            <Checkbox
              onChange={(e) => setChecked(e.checked)}
              checked={checked}
            ></Checkbox>
            Strawberries............................1 large carton
          </p>
          <p className="m-0">
            <Checkbox
              onChange={(e) => setChecked(e.checked)}
              checked={checked}
            ></Checkbox>
            Bananas............................1 bunch
          </p>
        </Card>
      </div>
    </header>
  );
}
