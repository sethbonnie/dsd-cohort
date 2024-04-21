import { useState } from "react";
import "../App.css";
import { DndContext } from "@dnd-kit/core";

import { Draggable } from "../components/Draggable";
import { Droppable } from "../components/Droppable";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import NutritionFacts from "../components/NutritionFacts";
import ingredients from "../data/ingredients.json"
import { Tooltip } from "primereact/tooltip";
import './Recipes.css';


function Recipes() {
  const containers = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [days, setDays] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const [isDragging, setIsDragging] = useState(false);


  const recipes = (ingredients["ingredients by recipe"])
  const smoothiesShown = Object.keys(recipes).map((recipe, index) => {
      return {
        id: index,
        text: recipe,
        img: recipes[recipe]["imageURL"]
      }
    }
)

  function Header(props) {
    return (
      <img src={props.src} alt={props.text} />
    )
  }

  const draggableMarkup = smoothiesShown.map((smoothie) => (
    <div>
      {!isDragging && (
        <Tooltip target={`.smoothie-${smoothie.id}`}>
          <NutritionFacts recipe={smoothie.text}></NutritionFacts>
        </Tooltip>
      )}
      <div className="smoothieDiv">
        <Draggable id={smoothie.id} key={smoothie.id}>
          <Card title={smoothie.text} header={<Header src={smoothie.img} />} className={`smoothieCard drag smoothie-${smoothie.id}`}>
          </Card>
        </Draggable>
      </div>
      <br></br>
    </div>
  ));

  return (
    <div>
      <Tooltip target=".custom-target-icon" />
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Splitter style={{ height: "300px" }}>
          <div className="recipesList">
            {draggableMarkup}
          </div>
          <SplitterPanel className="flex align-items-center justify-content-center">
            {containers.map((id) => (
              <Droppable id={id}>
                {days[id].length == 0
                  ? id
                  : days[id].map((recipe, i) => (
                    <div
                      style={{
                        borderStyle: "solid",
                        borderRadius: "25px",
                        fontWeight: "bold",
                        padding: "1px",
                      }}
                    >
                      <span>{recipe} </span>

                      {console.log("nutri facts:")}
                      {console.log(recipe)}
                      <span
                        onClick={() => handleRemove(id, i)}
                        style={{ color: "red" }}
                      >
                        (X)
                      </span>
                    </div>
                  ))}
              </Droppable>
            ))}
          </SplitterPanel>
        </Splitter>
      </DndContext>
    </div>
  );

  function handleRemove(day, index) {
    setDays({
      ...days,
      [day]: days[day].filter((v, i) => index != i),
    });
  }

  function handleDragStart() {
    setIsDragging(true);
  }
  function handleDragEnd(event) {
    setIsDragging(false);
    const { over } = event;

    if (over) {
      const activeRecipe = smoothiesShown.find(
        ({ id }) => id == event.active.id
      );

      if (activeRecipe) {
        const day = over.id;
        setDays({
          ...days,
          [day]: [...days[day], activeRecipe.text], //immutable
        });
      }
    }
  }
}

export default Recipes;
