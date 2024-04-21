import "./App.css";
import Kitchen from "./pages/Kitchen.js";
import logo from "./logo.svg";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Recipes from "./pages/Recipes.jsx";
import NutritionFacts from "./components/NutritionFacts";
import ingredients from "./data/ingredients.json";

const recipes = ingredients["ingredients by recipe"];

function App() {
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
  const smoothies = Object.keys(recipes).map((recipe, index) => {
    return {
      id: index,
      text: recipe,
      img: recipes[recipe]["imageURL"],
    };
  });
  const recipeProps = {
    days,
    isDragging,
    handleRemove,
    handleDragStart,
    handleDragEnd,
    smoothies,
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Recipes {...recipeProps} />} />
          <Route path="/kitchen" element={<Kitchen />} />
        </Routes>
      </BrowserRouter>
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

export default App;
