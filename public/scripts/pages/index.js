import RecipeFactory from "../factories/RecipeFactory.js";
import RecipeCard from "../templates/RecipeCard.js";
import {ApplianceItem, UstensilItem, IngredientItem} from "../templates/FilterItem.js";
import {displayfilter} from "../utils/filterManager.js";
import {empty} from "../utils/searchByInput.js";

// import {checkSearchInput} from "../utils/searchByInput.js";

// import {empty} from "../utils/searchByInput"
// import {checkSearchInput}

let recipeArray = [];
let filterArray = [];

/**
 * 
 * @returns the recipe data
 */
async function getRecipes() {
    let data = await fetch("../data/recettes.json").then(response => {
        return response.json();
    }).then(data => {
        return data;
    }).catch(err => {
        console.log(err);
    });

    const recipes = data.recipes.map(recipe => {
        return new RecipeFactory(recipe, "recipe");
    });

    return {
        recipes
    };
}


function resetDOM(){
    const cards = document.querySelectorAll(".card");
    const filters = document.querySelectorAll(".dropdown-item");

    cards.forEach(card => {
        card.remove();
    })

    filters.forEach(filter => {
        filter.remove();
    })
}

/**
 * 
 * @param {*} recipes 
 * displays all the data of the recipes on the DOM
 */
export async function displayRecipeData(recipes) {
    const results = document.getElementById("result-container");

    recipes.map(recipe => {
        const template = new RecipeCard(recipe);
        const recipeCard = template.createRecipeCard();
        results.appendChild(recipeCard);
    });
}

/**
 * triggered all the different functions
 */
export async function init(callback1, callback2) {
    let {
        recipes
    } = await getRecipes();

    resetDOM();
    
    let newRecipes = callback1(recipes);
    let newnewRecipes = callback2(newRecipes);

    recipeArray = newnewRecipes.map(recipe => {
        return recipe;
    });

    const ingredientList = createItemList(newnewRecipes, "ingredients");
    const ustensilList = createItemList(newnewRecipes, "ustensils");
    const applianceList = createItemList(newnewRecipes, "appliances");

    displayRecipeData(newnewRecipes);
    displayIngredientList(ingredientList);
    displayUstensilList(ustensilList);
    displayApplianceList(applianceList);
    displayfilter(filterArray);

    const recipeDirections = document.querySelectorAll(".card__content__main__directions > p");

    recipeDirections.forEach(direction => {
        if (direction.innerHTML.length > 220) {
            direction.innerHTML = direction.innerHTML.substring(0, 220) + "...";
        }
    });

}

init(empty,empty);

export const displayIngredientList = (data) => {
    const myListOfIngredients = document.querySelector(".list-ingredients");

    data.map(ingredient => {
        const Template = new IngredientItem(ingredient);
        const item = Template.createIngredientItem();

        myListOfIngredients.appendChild(item);
    });
}

export const displayApplianceList = (data) => {
    const myListOfAppliances = document.querySelector(".list-appliances");

    data.map(appliance => {
        const Template = new ApplianceItem(appliance);
        const item = Template.createApplianceItem();

        myListOfAppliances.appendChild(item);
    });
}


export const displayUstensilList = (data) => {
    const myListOfUstensils = document.querySelector(".list-ustensils");

    data.map(ustensil => {
        const Template = new UstensilItem(ustensil);
        const item = Template.createUstensilItem();

        myListOfUstensils.appendChild(item);
    });
}



/**
 * 
 * @param {*} recipes 
 * @param {*} listType 
 * @returns itemArray of ingredients/ustensils/appliances
 */
export function createItemList(recipes, listType) {
    let list = [];

    switch (listType) {
        case "ingredients":
            recipes.map(recipe => {
                const ingredients = recipe.ingredients.map(ingredient => {
                    return ingredient.ingredient.toLowerCase();
                });
                return list = [...list, ...ingredients];
            })
            break;
        case "appliances":
            list = recipes.map(recipe => {
                return recipe.appliance.toLowerCase();
            });
            break;
        case "ustensils":
            recipes.map(recipe => {
                const ustensils = recipe.ustensils.map(ustensil => {
                    return ustensil.toLowerCase();
                });
                return list = [...list, ...ustensils];
            })
            break;
        default:
            listType
            break;
    }

    const myList = list.filter((item, pos) => {
        return list.indexOf(item) === pos;
    });
    return myList;

}


export {recipeArray, filterArray};