import { filterArray, init } from "../pages/index.js";
import { empty} from "../utils/searchByInput.js";


/**
 * 
 * searchRecipeByFilter():
 * @param {*} array 
 * @param {*} filters 
 * depending on the selected filters, the function will display the recipe which has at least 
 * one of the ingredients.
 */
export function searchRecipeByFilter(filters, callback) {
    
    // let mySelectedRecipes = sortByFilter(recipes, filters);

    // if there isn't any filter, we return all the recipes
    if (filters.length === 0) {
        init(callback, empty);
    } else {
        init(callback, sortByFilter)
    }
}







export function sortByFilter(recipeArray) {
    let filters = filterArray;
    let myfilteredArray = []

    recipeArray.forEach(recipe => {
        let recipeItems = [recipe.appliance, ...recipe.ustensils];

        recipe.ingredients.forEach(ingredient => {
            recipeItems = [...recipeItems, ingredient.ingredient];
        });

        const lowerCaseRecipeItems = recipeItems.map((item) => {
            return item.toLowerCase()
        } );

        let isValid;

        for(let i=0; i<filters.length; i++){

            isValid = lowerCaseRecipeItems.includes(filters[i].toLowerCase());

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


