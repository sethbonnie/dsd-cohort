import "./App.css";
import Kitchen from "./pages/Kitchen.js";
import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Recipes from "./pages/Recipes.jsx";
import NutritionFacts from './components/NutritionFacts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Recipes />}/>
          <Route path="/kitchen" element={<Kitchen />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
