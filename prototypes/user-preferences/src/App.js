import "./App.css";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
//import { Splitter, SplitterPanel } from 'primereact/splitter';
import React, { useState, useLayoutEffect } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import "primereact/resources/themes/lara-dark-purple/theme.css";

function App() {
  const [value1, setValue1] = useState(60);
  const [value2, setValue2] = useState(20);
  const [value3, setValue3] = useState(1600);
  const [value4, setValue4] = useState(150);
  const [value5, setValue5] = useState(180);

  const [selectedRestriction, setSelectedRestriction] = useState(null);
  const restrictions = [
    { name: "gluten free", code: "GF" },
    { name: "dairy free", code: "DF" },
    { name: "nut free", code: "NF" },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <Panel header="Macro Goals">
          <p className="m-0">
            <label>Protein:</label>{" "}
            <InputNumber
              inputId="stacked-buttons"
              value={value1}
              onValueChange={(e) => setValue1(e.value)}
              inputClassName="quantity-input"
            />{" "}
            grams
          </p>
          <p className="m-0">
            <label>Carbs:</label>{" "}
            <InputNumber
              inputId="stacked-buttons"
              value={value2}
              onValueChange={(e) => setValue2(e.value)}
              inputClassName="quantity-input"
            />{" "}
            grams
          </p>
          <p className="m-0">
            <label>Fat:</label>{" "}
            <InputNumber
              inputId="stacked-buttons"
              value={value1}
              onValueChange={(e) => setValue1(e.value)}
              inputClassName="quantity-input"
            />{" "}
            grams
          </p>
          <p className="m-0">
            <label>Calories:</label>{" "}
            <InputNumber
              inputId="stacked-buttons"
              value={value3}
              onValueChange={(e) => setValue3(e.value)}
              inputClassName="quantity-input"
            />{" "}
            kcals
          </p>
        </Panel>
        <Panel header="Dietary Restrictions">
          <p className="m-0">
            {/* 
          TO IMPLEMENT IDEAL FUNCTIONALITY FOR DIETARY RESTRICTION CARD

          -You have a list of selected items that render like the orange parts. Each would have an x to remove it from that selected items list.
          -Next you have a dropdown that contains all the restrictions. When you select one, you add it to the selected items list

          -Create a restrictions array that generates the orange tags for you.
          -for each item in that array, add a button that removes it from the array
          -Then add an autocomplete to append stuff to the array whenever an item from the autocomplete is selected 
          
          */}

            {/* <AutoComplete
              field="name"
              multiple
              value={selectedRestriction}
              // suggestions={filteredCountries}
              // completeMethod={search}
              onChange={(e) => setSelectedRestriction(e.value)}
            /> */}
            <Dropdown
              value={selectedRestriction}
              onChange={(e) => setSelectedRestriction(e.value)}
              options={restrictions}
              optionLabel="name"
              placeholder="gluten free"
              className="w-full md:w-14rem"
              checkmark={true}
              highlightOnSelect={true}
            />
          </p>
          <p className="m-0">
            <Dropdown
              value={selectedRestriction}
              onChange={(e) => setSelectedRestriction(e.value)}
              options={restrictions}
              optionLabel="name"
              placeholder="dairy free"
              className="w-full md:w-14rem"
              checkmark={true}
              highlightOnSelect={true}
            />
          </p>
          <p className="m-0">
            <Dropdown
              value={selectedRestriction}
              onChange={(e) => setSelectedRestriction(e.value)}
              options={restrictions}
              optionLabel="name"
              placeholder="nut free"
              className="w-full md:w-14rem"
              checkmark={true}
              highlightOnSelect={true}
            />
          </p>
        </Panel>
        <Panel header="Weight Goals">
          <p className="m-0">
            <label>Current:</label>{" "}
            <InputNumber
              inputId="stacked-buttons"
              value={value4}
              onValueChange={(e) => setValue4(e.value)}
              inputClassName="quantity-input"
            />{" "}
            lbs
          </p>
          <p className="m-0">
            <label>Target:</label>{" "}
            <InputNumber
              inputId="stacked-buttons"
              value={value5}
              onValueChange={(e) => setValue5(e.value)}
              inputClassName="quantity-input"
            />{" "}
            lbs
          </p>
        </Panel>
      </header>
    </div>
  );
}

export default App;
