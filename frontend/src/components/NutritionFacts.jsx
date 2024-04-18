import ingredients from '../data/ingredients.json'
import nutritionData from '../data/nutrition_data.json'
import './NutritionFacts.css';


// Need the parent to pass down what recipe user wants to see the nutrition facts for
export default function NutritionFacts(props) {
    // Bring in the desired recipe from user
    // Find the ingredients for the recipe in the ingredients.json
    // parse through the nutritionData.json and extract the nutrition data for each ingredient
    // Sum the nutrition values and render on screen 
    let sumNutrition = {
        "calories": 0,
        "totalFat": 0,
        "cholesterol": 0,
        "sodium": 0,
        "carbohydrates": 0,
        "protein": 0,
        "vitaminD": 0,
        "calcium": 0,
        "iron": 0,
        "potassium": 0,
        "vitaminC": 0,
    }

    function findIngredients(recipe) {
        let specifiedIngredients = ingredients['ingredients by recipe'][recipe]["main"];
        return specifiedIngredients;
    };

    function parseNutritionData(recipe) {
        let parsedData = {};
        let specifiedIngredients = findIngredients(recipe);
        for (let i = 0; i < specifiedIngredients.length; i++) {
            for (let j = 0; j < nutritionData.length; j++) {
                if (specifiedIngredients[i] === nutritionData[j]["ingredients"][0]["text"]) {
                    let nutritionValues = nutritionData[j]["ingredients"][0]["parsed"][0]["nutrients"];
                    parsedData[specifiedIngredients[i]] = nutritionValues;
                };
            }
        }
        const dataArray = Object.values(parsedData);
        return dataArray;
    }

    function sumNutritionData(recipe) {
        let dataArray = parseNutritionData(recipe)
        console.log(dataArray)
        for (let i = 0; i < dataArray.length; i++) {
            sumNutrition["calories"] += dataArray[i]["ENERC_KCAL"]["quantity"];
            sumNutrition["totalFat"] += dataArray[i]["FAT"]["quantity"];
            sumNutrition["cholesterol"] += dataArray[i]["CHOLE"]["quantity"];
            sumNutrition["sodium"] += dataArray[i]["NA"]["quantity"];
            sumNutrition["carbohydrates"] += dataArray[i]["CHOCDF"]["quantity"];
            sumNutrition["protein"] += dataArray[i]["PROCNT"]["quantity"];
            sumNutrition["vitaminD"] += dataArray[i]["VITD"]["quantity"];
            sumNutrition["calcium"] += dataArray[i]["CA"]["quantity"];
            sumNutrition["iron"] += dataArray[i]["FE"]["quantity"];
            sumNutrition["potassium"] += dataArray[i]["K"]["quantity"];
            sumNutrition["vitaminC"] += dataArray[i]["VITC"]["quantity"];

        }
    }

    sumNutritionData("Green Machine Smoothie")

    console.log(sumNutrition)
    return (

        <div class="nutritionCard">
            <h1>Nutrition Facts</h1>
            <h3>Serving Size <p>1 shake</p></h3>
             <ul>
                <li><h2>Calories</h2>{sumNutrition["calories"]}</li>
                <li><h4>Total Fat</h4>{sumNutrition["totalFat"]}</li>
                <li><h4>Cholesterol</h4>{sumNutrition["cholesterol"]}</li>
                <li><h4>Sodium</h4>{sumNutrition["sodium"]}</li>
                <li><h4>Carbohydrates</h4>{sumNutrition["carbohydrates"]}</li>
                <li><h4>Protein</h4>{sumNutrition["protein"]}</li>
                <li><h4>Vitamin C</h4>{sumNutrition["vitaminC"]}</li>
                <li><h4>Vitamin D</h4>{sumNutrition["vitaminD"]}</li>
                <li><h4>Calcium</h4>{sumNutrition["calcium"]}</li>
                <li><h4>Potassium</h4>{sumNutrition["potassium"]}</li>
                <li><h4>Iron</h4>{sumNutrition["iron"]}</li>
            </ul>
        </div>

    );
}