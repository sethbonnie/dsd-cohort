import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { InputNumber } from "primereact/inputnumber";
import { Accordion, AccordionTab } from "primereact/accordion";
import "primereact/resources/themes/arya-orange/theme.css";
import "./kitchen.css";
import "primeicons/primeicons.css";

export default function Kitchen() {
  const [products, setProducts] = useState([
    {
      name: "Strawberries",
      category: "fruit",
      size: "small carton",
      quantity: 34,
      servings: 1,
    },
    {
      name: "Bananas",
      category: "fruit",
      size: "medium",
      quantity: 14,
      servings: 1,
    },
    {
      name: "1Carrot",
      category: "vegetable",
      size: "medium",
      quantity: 67,
      servings: 1,
    },
    {
      name: "9Spinach",
      category: "greens",
      size: "bunch",
      quantity: 67,
      servings: 1,
    },
    {
      name: "Kale",
      category: "greens",
      size: "bunch",
      quantity: 67,
      servings: 1,
    },
    {
      name: "0Avocado",
      category: "vegetable",
      size: "medium",
      quantity: 67,
      servings: 1,
    },
    {
      name: "Honey",
      category: "sweetener",
      size: "16oz bottle",
      quantity: 67,
      servings: 1,
    },
    {
      name: "Greek yogurt",
      category: "dairy",
      size: "16oz tub",
      quantity: 67,
      servings: 1,
    },
    {
      name: "Espresso",
      category: "flavoring",
      size: "2oz can",
      quantity: 67,
      servings: 1,
    },
    {
      name: "Whipped Cream",
      category: "dairy",
      size: "160oz tub",
      quantity: 67,
      servings: 1,
    },
    {
      name: "Cinnamon",
      category: "spice",
      size: "2oz shaker",
      quantity: 67,
      servings: 1,
    },
    {
      name: "Milk",
      category: "dairy",
      size: "half-gallon",
      quantity: 67,
      servings: 1,
    },
    {
      name: "Nutmeg",
      category: "spice",
      size: "2oz shaker",
      quantity: 67,
      servings: 1,
    },
    {
      name: "Ginger",
      category: "spice",
      size: "2oz shaker",
      quantity: 67,
      servings: 1,
    },
    {
      name: "Sugar",
      category: "sweetener",
      size: "2lb bag",
      quantity: 3,
      servings: 1,
    },
    // Add more products as needed
  ]);

  //--------------STATIC ARRAY OF HARDCODED DATA FOR TABLE (eventually transplant to .json file)--------------

  //--------------FUNCTION FOR TABLE QUANTITY INPUT FIELD--------------

  const onQuantityChange = (rowData, event) => {
    const updatedProducts = products.map((product) => {
      if (product.name === rowData.name) {
        return { ...product, quantity: event.value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  //--------------FUNCTION FOR TABLE QUANTITY INPUT FIELD--------------

  //--------------FUNCTION FOR TABLE QUANTITY INPUT FIELD--------------

  const onServingsChange = (rowData, event) => {
    const updatedProducts = products.map((product) => {
      if (product.name === rowData.name) {
        return { ...product, servings: event.value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  //--------------FUNCTION FOR TABLE QUANTITY INPUT FIELD--------------

  //--------------FUNCTION FOR TABLE QUANTITY TEMPLATE--------------

  const quantityEditor = (rowData) => {
    return (
      <InputNumber
        value={rowData.quantity}
        onValueChange={(e) => onQuantityChange(rowData, e)}
        showButtons
        buttonLayout="horizontal"
        step={0.25}
        decrementButtonClassName="p-button-danger"
        incrementButtonClassName="p-button-success"
        inputClassName="quantity-input" // Apply custom class for input field
      />
    );
  };

  //--------------FUNCTION FOR TABLE QUANTITY TEMPLATE--------------

  //--------------FUNCTION FOR TABLE SERVINGS TEMPLATE--------------

  const servingsEditor = (rowData) => {
    return (
      <InputNumber
        value={rowData.servings}
        onValueChange={(e) => onServingsChange(rowData, e)}
        showButtons
        buttonLayout="horizontal"
        step={1}
        decrementButtonClassName="p-button-danger"
        incrementButtonClassName="p-button-success"
        inputClassName="quantity-input" // Apply custom class for input field
      />
    );
  };

  //--------------FUNCTION FOR TABLE SERVINGS TEMPLATE--------------

  //--------------FUNCTION FOR DELETE HANDLER TEMPLATE--------------

  const deleteHandler = (rowData) => {
    return <Button label="" icon="pi pi-trash" className="trash" />;
  };

  //--------------FUNCTION FOR DELETE HANDLER TEMPLATE--------------

  //--------------dummy data used for autocomplete item name field--------------

  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const groupedItems = [
    {
      label: "Fruit",
      code: "ft",
      items: [
        { label: "Banana", value: "Banana" },
        { label: "Strawberry", value: "Strawberry" },
        { label: "Apple", value: "Apple" },
        { label: "Orange", value: "Orange" },
      ],
    },
    {
      label: "Vegetable",
      code: "vt",
      items: [
        { label: "Kale", value: "Kale" },
        { label: "Carrot", value: "Carrot" },
        { label: "Avocado", value: "Avocado" },
        { label: "Spinach", value: "Spinach" },
      ],
    },
  ];

  const search = (event) => {
    let query = event.query;
    let _filteredItems = [];

    for (let country of groupedItems) {
      let filteredItems = country.items.filter(
        (item) => item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );

      if (filteredItems && filteredItems.length) {
        _filteredItems.push({ ...country, ...{ items: filteredItems } });
      }
    }

    setFilteredItems(_filteredItems);
  };

  //--------------dummy data used for autocomplete item name field--------------

  //--------------data and functions for category and size drop downs--------------

  const [cvalue, setCvalue] = useState("");
  const [svalue, setSvalue] = useState("");
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  const search_cat = (event) => {
    let _categories = [
      "fruit",
      "vegetable",
      "greens",
      "sweetener",
      "dairy",
      "flavoring",
      "spice",
    ];
    setCategories(
      event.query
        ? [...Array().keys()].map((category) => event.query)
        : _categories
    );
  };

  const search_size = (event) => {
    let _size = ["small", "medium", "large"];
    setSizes(
      event.query ? [...Array().keys()].map((size) => event.query) : _size
    );
  };

  //--------------data and functions for category and size drop downs--------------

  const [value2, setValue2] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <a>
          <Button label="My Kitchen" />
        </a>
        <div className="card">
          <DataTable
            value={products}
            showGridlines
            removableSort
            tableStyle={{ minWidth: "50rem" }}
            rows={5}
            inline
            scrollHeight="640px"
            breakpoint="10px"
          >
            <Column
              field="name"
              header="Item Name"
              sortable
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="category"
              header="Category"
              sortable
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="size"
              header="Size"
              sortable
              style={{ width: "10%" }}
            ></Column>
            <Column
              field="quantity"
              header="Quantity"
              body={quantityEditor}
              sortable
              style={{ width: "10%" }}
            ></Column>
            <Column
              field="servings"
              header="Servings"
              body={servingsEditor}
              sortable
              style={{ width: "10%" }}
            ></Column>
            <Column
              field="delete"
              header="Delete"
              body={deleteHandler}
              style={{ width: "10%" }}
            ></Column>
          </DataTable>
        </div>
        <div className="card">
          <Accordion activeIndex={0} collapseIcon expandIcon>
            <AccordionTab header="Enter New Item">
              <AutoComplete
                //--------------TEXT FIELD FOR ITEM NAME WITH AUTOCOMPLETE--------------
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.value)}
                suggestions={filteredItems}
                completeMethod={search}
                field="label"
                optionGroupLabel="label"
                optionGroupChildren="items"
                // optionGroupTemplate={groupedItemTemplate}
                placeholder="enter item name"
                //--------------TEXT FIELD FOR ITEM NAME WITH AUTOCOMPLETE--------------
              />

              <AutoComplete
                //--------------DROP DOWN FOR ITEM CATEGORY--------------
                value={cvalue}
                suggestions={categories}
                completeMethod={search_cat}
                onChange={(e) => setCvalue(e.value)}
                dropdown
                placeholder="select category"
                //--------------DROP DOWN FOR ITEM CATEGORY--------------
              />

              <AutoComplete
                //--------------DROP DOWN FOR ITEM SIZE/VOLUME--------------
                value={svalue}
                suggestions={sizes}
                completeMethod={search_size}
                onChange={(e) => setSvalue(e.value)}
                dropdown
                placeholder="select size/volume"
                //--------------DROP DOWN FOR ITEM SIZE/VOLUME--------------
              />

              <InputNumber
                //--------------INPUT FIELD FOR ITEM QUANTITY--------------
                inputId="horizontal-buttons"
                placeholder="enter item quantity"
                onValueChange={(e) => setValue2(e.value)}
                showButtons
                buttonLayout="horizontal"
                step={0.25}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"

                // incrementButtonIcon="+"
                // decrementButtonIcon="-"
                // mode="currency"
                // currency="USA"
                //--------------INPUT FIELD FOR ITEM QUANTITY--------------
              />

              <br></br>
              <br></br>

              <Button label="Add Item" icon="pi pi-list" />
            </AccordionTab>
          </Accordion>
        </div>
      </header>
    </div>
  );
}
