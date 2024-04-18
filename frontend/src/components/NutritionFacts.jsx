import ingredients from '../data/ingredients.json'
import nutritionData from '../data/nutrition_data.json'
import './NutritionFacts.css';

export default function NutritionFacts(props) {
    let sumNutrition = {
        "Calories": {
            "quantity": 0,
            "unit": "kcal"
        },
        "Total Fat": {
            "quantity": 0,
            "unit": "g"
        },
        "Cholesterol": {
            "quantity": 0,
            "unit": "mg"
        },
        "Sodium": {
            "quantity": 0,
            "unit": "mg"
        },
        "Carbohydrates": {
            "quantity": 0,
            "unit": "g"
        },
        "Protein": {
            "quantity": 0,
            "unit": "g"
        },
        "Vitamin-D": {
            "quantity": 0,
            "unit": "IU"
        },
        "Calcium": {
            "quantity": 0,
            "unit": "mg"
        },
        "Iron": {
            "quantity": 0,
            "unit": "mg"
        },
        "Potassium": {
            "quantity": 0,
            "unit": "mg"
        },
        "Vitamin-C": {
            "quantity": 0,
            "unit": "mg"
        },
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
            sumNutrition["Calories"]["quantity"] += Math.round(dataArray[i]["ENERC_KCAL"]["quantity"]);
            sumNutrition["Total Fat"]["quantity"] += Math.round(dataArray[i]["FAT"]["quantity"]);
            sumNutrition["Cholesterol"]["quantity"] += Math.round(dataArray[i]["CHOLE"]["quantity"]);
            sumNutrition["Sodium"]["quantity"] += Math.round(dataArray[i]["NA"]["quantity"]);
            sumNutrition["Carbohydrates"]["quantity"] += Math.round(dataArray[i]["CHOCDF"]["quantity"]);
            sumNutrition["Protein"]["quantity"] += Math.round(dataArray[i]["PROCNT"]["quantity"]);
            sumNutrition["Vitamin-D"]["quantity"] += Math.round(dataArray[i]["VITD"]["quantity"]);
            sumNutrition["Calcium"]["quantity"] += Math.round(dataArray[i]["CA"]["quantity"]);
            sumNutrition["Iron"]["quantity"] += Math.round(dataArray[i]["FE"]["quantity"]);
            sumNutrition["Potassium"]["quantity"] += Math.round(dataArray[i]["K"]["quantity"]);
            sumNutrition["Vitamin-C"]["quantity"] += Math.round(dataArray[i]["VITC"]["quantity"]);

        }
    }

    sumNutritionData("Green Machine Smoothie")

    console.log(sumNutrition)
    const keys = Object.keys(sumNutrition)
    const sumValues = Object.values(sumNutrition)
    sumValues.forEach(object => Math.round(object["quantity"]));
    return (

        <div className="nutritionCard">
            <h1>Nutrition Facts</h1>
            <h3>Serving Size <p>1 shake</p></h3>
             <ul>
                {keys.map((key, index) => <li><h4>{key}</h4>{sumValues[index]["quantity"]} {sumValues[index]["unit"]}</li>)}
            </ul>
        </div>

    );
}