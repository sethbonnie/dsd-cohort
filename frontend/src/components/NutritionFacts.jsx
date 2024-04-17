import ingredients from '../data/ingredients.json'
import nutritionData from '../data/nutrition_data.json'


// Need the parent to pass down what recipe user wants to see the nutrition facts for
export default function NutritionFacts(props) {
    // Bring in the desired recipe from user
    // Find the ingredients for the recipe in the ingredients.json
    // parse through the nutritionData.json and extract the nutrition data for each ingredient
    // Sum the nutrition values and render on screen 

    function findIngredients(recipe) {
        let specifiedIngredients = ingredients['ingredients by recipe'][recipe]["main"];
        return specifiedIngredients;
    };

    function parseNutritionData(recipe) {
        console.log(nutritionData[0]["ingredients"][0]["text"])
        let parsedData = {};
        let specifiedIngredients = findIngredients(recipe);
        for (let i = 0; i < specifiedIngredients.length; i++) {
            for (let j = 0; j < nutritionData.length; j++) {
                // console.log(nutritionData)
                // console.log(nutritionData[j]["ingredients"][0]["text"])
                if (specifiedIngredients[i] === nutritionData[j]["ingredients"][0]["text"]) {
                    let nutritionValues = nutritionData[j]["ingredients"][0]["parsed"][0]["nutrients"];
                    parsedData[specifiedIngredients[i]] = nutritionValues;
                };
            }
        }
        console.log(parsedData)
    }
    parseNutritionData("Green Machine Smoothie")
    return (

        <h1>Hello World</h1>

    );
}