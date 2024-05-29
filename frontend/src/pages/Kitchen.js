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
import Grocerylist from "../components/Grocerylist";
import handleRecipeConversion from "../lib/helper";
import shoppingMeasures from "../data/shopping_measures.json";

export default function Kitchen(props) {
  const [addedIngredient, setAddedIngredient] = useState({});

  const [ingredients, setIngredients] = useState([]);

  const [shoppingList, setShoppingList] = useState(
    handleRecipeConversion(props.weeklySmoothies, ingredients)
  );
  function handleAddToKitchen(groceryItems) {
    groceryItems.forEach((groceryItem) => {
      let shopping = shoppingMeasures[groceryItem.name];
      let newServing = groceryItem.quantity * shopping.conversionRate;

      setAddedIngredient({
        name: groceryItem.name,
        servings: newServing,
        size: shopping.ingredient.measure,
      });

      const newIngredients = [...ingredients, addedIngredient];
      setIngredients(newIngredients);
    });
    console.log("handle add to kitchen", ingredients);

    /**list newingredients =[]
     * loop through groceryItems
     *    convert each groceryItem to an ingredient
     *    add to newIngredients
     * combine ingredients and newIngredients and pass to setIngredients
     */
  }

  const onServingsChange = (rowData, event) => {
    const updatedIngredients = ingredients.map((ingredient) => {
      if (ingredient.name === rowData.name) {
        return { ...ingredient, servings: event.value };
      }
      return ingredient;
    });
    setIngredients(updatedIngredients);
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
        inputClassName="serving-input"
      />
    );
  };

  const deleteHandler = (rowData) => {
    return <Button label="" icon="pi pi-trash" className="trash" />;
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  const [size, setSize] = useState("");

  const [sizes, setSizes] = useState([]);

  const search_size = (event) => {
    let _size = ["gallon", "cup", "bag", "jar"];
    setSizes(
      event.query ? [...Array().keys()].map((size) => event.query) : _size
    );
  };

  const [servings, setServings] = useState();

  useEffect(() => {
    setAddedIngredient({
      name: selectedItem,
      servings: servings,
      size: size,
    });
  }, [selectedItem, size, servings]);

  function handleAddItem() {
    const newIngredients = [...ingredients, addedIngredient];
    setIngredients(newIngredients);
    setShoppingList(
      handleRecipeConversion(props.weeklySmoothies, newIngredients)
    );
  }

  return (
    <div className="kitchen-container">
      <header className="datatable-container">
        <a>
          <Button label="My Kitchen" />
        </a>
        <div className="card">
          <DataTable
            value={ingredients}
            showGridlines
            removableSort
            tableStyle={{ minWidth: "30rem" }}
            rows={5}
            inline
            scrollHeight="640px"
            breakpoint="10px"
          >
            <Column field="name" header="Item Name" sortable></Column>

            <Column
              field="servings"
              header="Servings"
              body={servingsEditor}
              sortable
            ></Column>
            <Column field="size" header="Size" sortable></Column>
            <Column
              field="delete"
              header="Delete"
              body={deleteHandler}
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
              <InputNumber
                inputId="horizontal-buttons"
                placeholder="enter servings"
                onValueChange={(e) => setServings(e.value)}
                showButtons
                buttonLayout="horizontal"
                step={0.25}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
              />
              <AutoComplete
                value={size}
                suggestions={sizes}
                completeMethod={search_size}
                onChange={(e) => setSize(e.value)}
                dropdown
                placeholder="select size/volume"
              />

              <br></br>
              <br></br>

              <Button
                label="Add Item"
                icon="pi pi-list"
                onClick={() => handleAddItem()}
              />
            </AccordionTab>
          </Accordion>
        </div>
      </header>
      <Grocerylist
        onAddGroceryItems={handleAddToKitchen}
        shoppingList={shoppingList}
      />
    </div>
  );
}
