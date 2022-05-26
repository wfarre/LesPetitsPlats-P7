import {displayValidItemsOnly, search} from "../utils/searchByInput.js";


/**
 * 
 * searchRecipeByFilter():
 * @param {*} array 
 * @param {*} filters 
 * depending on the selected filters, the function will display the recipe which has at least 
 * one of the ingredients.
 */
function searchRecipeByFilter(recipes, filters) {

    let mySelectedRecipes = sortByFilter(recipes, filters);

    // if there isn't any filter, we return all the recipes
    if (filters.length === 0) {
        recipes.map(recipe => {
            // we need to display every recipe
            document.getElementById(recipe.id).classList.remove("hide");
            // But even though, we need to check if there is an input in the research-bar
            displayValidItemsOnly(recipe.name, recipe.id, search);
        })
    } else {
        recipes.map(recipe => {
            document.getElementById(recipe.id).classList.add("hide");
        });

        // we display the valid recipes only
        mySelectedRecipes.map(recipe => {
            document.getElementById(recipe.id).classList.remove("hide");
            displayValidItemsOnly(recipe.name, recipe.id, search);
        });
    }
}





function sortByFilter(recipeArray, filterArray) {

    let myfilteredArray = []

    recipeArray.forEach(recipe => {
        let recipeItems = [recipe.appliance, ...recipe.ustensils];

        recipe.ingredients.forEach(ingredient => {
            recipeItems = [...recipeItems, ingredient.ingredient];
        });

        let isValid;

        for(let i=0; i<filterArray.length; i++){

            isValid = recipeItems.includes(filterArray[i]);

            // if isValid is not true, then we break, so we don't go through the entire filterArray.
            if(isValid === false){
                break;
            }
        }

        // only isValid is true, i.e. every filter filter matches one item inside the recipe
        if (isValid === true) {
            return myfilteredArray = [...myfilteredArray, recipe];
        }
    })
    return myfilteredArray;
}


export default searchRecipeByFilter;


