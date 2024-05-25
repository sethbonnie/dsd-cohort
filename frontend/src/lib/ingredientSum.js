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
  console.log(totalQuantities);
  return totalQuantities;
}

function ingredientsToShoppingList(ingredientQuantities, products) {
  let shoppingList = [];
  for (let [food, ingredient] of Object.entries(ingredientQuantities)) {
    let shopping = shoppingMeasures[food];
    let product = products.find((product) => product.name === food);

    let productQuantity = product ? product.quantity : 0;
    let quantity = Math.ceil(
      (ingredient.quantity - productQuantity) / shopping.conversionRate
    );
    if (quantity > 0) {
      const item = {
        name: food,
        quantity: quantity < 0 ? 0 : quantity,
        ...shopping.shopping,
      };
      shoppingList.push(item);
    }
  }
  return shoppingList;
}

let updatedShoppingList = [];

export default function handleRecipeConversion(recipes, products) {
  const converted = conversion(recipes);
  const ingredientQuantities = sumConverted(converted);
  const shoppingList = ingredientsToShoppingList(
    ingredientQuantities,
    products
  );
  console.log("ingredientQuantities", ingredientQuantities);
  console.log("products:", products);
  console.log("Shopping list" + shoppingList);
  return shoppingList;
}

export function sendShoppingList() {
  // console.log("updated shopping list:", updatedShoppingList)
  return updatedShoppingList;
}
