import nutritionData from "../data/nutrition_data.json";
import ingredients from "../data/ingredients.json"



function grabIngredientData(){
    const ingredientSumObject ={}

    for(let i = 0; i < nutritionData.length; i++){
        ingredientSumObject[nutritionData[i]["ingredients"][0]["text"]] = nutritionData[i]["ingredients"][0]["parsed"][0]
    }

    return ingredientSumObject
}

function grabAllMainIngredients(recipeNames){
    let allMainIngredients = []

    for (let i = 0; i < recipeNames.length; i++){
        allMainIngredients = [...allMainIngredients, ...ingredients["ingredients by recipe"][recipeNames[i]]["main"]]
    }
    return allMainIngredients
}

const ingredientSums = grabIngredientData()

function conversion(){
    let convertedArray = []

    const mainIngredients = grabAllMainIngredients(["Green Machine Smoothie", "Coffee and Cream Smoothie", "Green Machine Smoothie"])
    
    for (let i = 0; i < mainIngredients.length; i++){
        if (!ingredientSums[mainIngredients[i]]){
            console.log("error", [mainIngredients[i]])
        }
        convertedArray = [...convertedArray, ingredientSums[mainIngredients[i]]]
    }
    return convertedArray
}

function sumConverted(converted){
    let totalQuantities = {}
    console.log(converted)
    for (let i = 0; i < converted.length; i++){
        const ingredient = converted[i]
        console.log(i, ingredient)
        if (totalQuantities[ingredient["food"]]){
            totalQuantities[ingredient["food"]] += ingredient["quantity"]
        }
        else{
            totalQuantities[ingredient["food"]] = ingredient["quantity"]
        }
    }
    return totalQuantities
}

const converted = conversion()
const stuff = sumConverted(converted)
console.log(stuff)
// console.log(mainIngredients)