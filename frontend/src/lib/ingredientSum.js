import nutritionData from "../data/nutrition_data.json";
import ingredients from "../data/ingredients.json";
import shoppingMeasures from "../data/shopping_measures.json";

function grabIngredientData() {
  const ingredientSumObject = {};

  for (let i = 0; i < nutritionData.length; i++) {
    ingredientSumObject[nutritionData[i]["ingredients"][0]["text"]] =
      nutritionData[i]["ingredients"][0]["parsed"][0];
  }

  return ingredientSumObject;
}

function grabAllMainIngredients(recipeNames) {
  let allMainIngredients = [];

  for (let i = 0; i < recipeNames.length; i++) {
    allMainIngredients = [
      ...allMainIngredients,
      ...ingredients["ingredients by recipe"][recipeNames[i]]["main"],
    ];
  }
  return allMainIngredients;
}

const ingredientSums = grabIngredientData();

function conversion(recipeNames) {
  let convertedArray = [];

  const mainIngredients = grabAllMainIngredients(recipeNames);

  for (let i = 0; i < mainIngredients.length; i++) {
    if (!ingredientSums[mainIngredients[i]]) {
      console.log("error", [mainIngredients[i]]);
    }
    convertedArray = [...convertedArray, ingredientSums[mainIngredients[i]]];
  }
  return convertedArray;
}

function sumConverted(converted) {
  let totalQuantities = {};
  for (let i = 0; i < converted.length; i++) {
    const ingredient = converted[i];

    if (totalQuantities[ingredient["food"]]) {
      totalQuantities[ingredient["food"]]["quantity"] += ingredient["quantity"];
    } else {
      totalQuantities[ingredient["food"]] = {
        quantity: ingredient["quantity"],
        measure: ingredient["measure"],
      };
    }
  }
  return totalQuantities;
}

function ingredientsToShoppingList(ingredientQuantities) {
  let shoppingList = [];
  for (let [food, ingredient] of Object.entries(ingredientQuantities)) {
    let shopping = shoppingMeasures[food];
    let quantity = Math.ceil(ingredient.quantity / shopping.conversionRate);
    const item = {
      name: food,
      quantity: quantity,
      ...shopping.shopping,
    };
    shoppingList.push(item);
  }
  return shoppingList;
}

// let recipeNames = [weeklySmoothies];
const recipeNames = [
  "Green Machine",
  "Coffee and Cream",
  "Pumpkin Pie",
  "Creamy Carrot Cake",
  "Minty Watermelon Cooler",
  "Classic Strawberry Banana",
  "Tropical Green",
  "Chocolate Peanut Butter Protein",
  "Berry Blast",
  "Mango Madness",
];

export default function handleRecipeConversion(recipes) {
  const converted = conversion(recipes);
  const ingredientQuantities = sumConverted(converted);
  const shoppingList = ingredientsToShoppingList(ingredientQuantities);
  console.log("shopping list", shoppingList);
  return "hi it worked";
}
