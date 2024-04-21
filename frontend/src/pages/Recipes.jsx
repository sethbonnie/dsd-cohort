import { useState } from "react";
import "../App.css";
import { DndContext } from "@dnd-kit/core";

import { Draggable } from "../components/Draggable";
import { Droppable } from "../components/Droppable";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Card } from "primereact/card";
import NutritionFacts from "../components/NutritionFacts";
import ingredients from "../data/ingredients.json";
import { Tooltip } from "primereact/tooltip";
import "./Recipes.css";

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

  const recipes = ingredients["ingredients by recipe"];
  const smoothies = Object.keys(recipes).map((recipe, index) => {
    return {
      id: index,
      text: recipe,
      img: recipes[recipe]["imageURL"],
    };
  });

  function Header(props) {
    return <img src={props.src} alt={props.text} />;
  }

  const draggableMarkup = smoothies.map((smoothie) => (
    <div>
      {!isDragging && (
        <Tooltip target={`.smoothie-${smoothie.id}`}>
          <NutritionFacts recipe={smoothie.text}></NutritionFacts>
        </Tooltip>
      )}
      <div className="smoothieDiv">
        <Draggable id={smoothie.id} key={smoothie.id}>
          <Card
            title={smoothie.text}
            header={<Header src={smoothie.img} />}
            className={`smoothieCard drag smoothie-${smoothie.id}`}
          ></Card>
        </Draggable>
      </div>
      <br></br>
    </div>
  ));

  return (
    <div>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Splitter style={{ height: "300px" }}>
          <div className="recipesList">{draggableMarkup}</div>
          <div>
            {containers.map((day) => (
              <div>
                <h4>{day}</h4>
                <Droppable id={day}>
                  {days[day].map((smoothie, i) => (
                    <Card
                      title={smoothie.text}
                      header={<Header src={smoothie.img} />}
                      className={`smoothieCard drag smoothie-${smoothie.id}`}
                      onClick={() => handleRemove(day, i)}
                    ></Card>
                  ))}
                </Droppable>
              </div>
            ))}
          </div>
        </Splitter>
      </DndContext>
    </div>
  );

  function handleRemove(day, index) {
    setDays({
      ...days,
      [day]: days[day].filter((v, i) => index != i),
    });
    setIsDragging(true);
    setTimeout(() => setIsDragging(false), 100);
  }

  function handleDragStart() {
    setIsDragging(true);
  }
  function handleDragEnd(event) {
    setIsDragging(false);
    const { over } = event;

    if (over) {
      const activeRecipe = smoothies.find(({ id }) => id == event.active.id);

      if (activeRecipe) {
        const day = over.id;
        setDays({
          ...days,
          [day]: [...days[day], activeRecipe], //immutable
        });
      }
    }
  }
}

export default Recipes;
