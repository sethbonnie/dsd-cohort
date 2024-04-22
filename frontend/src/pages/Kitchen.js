import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { InputNumber } from "primereact/inputnumber";
import { Accordion, AccordionTab } from "primereact/accordion";
// import "primereact/resources/themes/arya-orange/theme.css";
import "./kitchen.css";
import "primeicons/primeicons.css";

export default function Kitchen() {
  const [addedIngredient, setAddedIngredient] = useState({
  
  })
  console.log(addedIngredient)
  const [products, setProducts] = useState([
    
  ]);

  const onQuantityChange = (rowData, event) => {
    const updatedProducts = products.map((product) => {
      if (product.name === rowData.name) {
        return { ...product, quantity: event.value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const onServingsChange = (rowData, event) => {
    const updatedProducts = products.map((product) => {
      if (product.name === rowData.name) {
        return { ...product, servings: event.value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };
  

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
        inputClassName="quantity-input"
      />
    );
  };

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
        inputClassName="quantity-input"
      />
    );
  };

  const deleteHandler = (rowData) => {
    return <Button label="" icon="pi pi-trash" className="trash" />;
  };

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
    let _size = ["gallon", "cup", "bag", "jar"];
    setSizes(
      event.query ? [...Array().keys()].map((size) => event.query) : _size
    );
  };

  const [value2, setValue2] = useState();

  useEffect(()=>{

    setAddedIngredient({
      name: selectedItem,
      quantity: value2,
      item: "",
      size: svalue,
      category: cvalue
    })
  }
  ) 

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
              header="Item"
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
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.value)}
                //suggestions={filteredItems}
                //completeMethod={search}
                field="label"
                //optionGroupLabel="label"
                //optionGroupChildren="items"
                placeholder="enter item name"
              />

              <AutoComplete
                value={cvalue}
                suggestions={categories}
                completeMethod={search_cat}
                onChange={(e) => setCvalue(e.value)}
                dropdown
                placeholder="select category"
              />

              <AutoComplete
                value={svalue}
                suggestions={sizes}
                completeMethod={search_size}
                onChange={(e) => setSvalue(e.value)}
                dropdown
                placeholder="select size/volume"
              />

              <InputNumber
                inputId="horizontal-buttons"
                placeholder="enter item quantity"
                onValueChange={(e) => setValue2(e.value)}
                showButtons
                buttonLayout="horizontal"
                step={0.25}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
              />

              <br></br>
              <br></br>

              <Button label="Add Item" icon="pi pi-list" onClick={()=>setProducts([...products,addedIngredient])} />
            </AccordionTab>
          </Accordion>
        </div>
      </header>
    </div>
  );
}
