/**
 * 
 * searchRecipeByFilter():
 * @param {*} array 
 * @param {*} filters 
 * depending on the selected filters, the function will display the recipe which has at least 
 * one of the ingredients.
 */
function searchRecipeByFilter(recipes, filters) {
    let mySelectedRecipes = recipes;

    // we create a new array containing only the recipes we need
    filters.map(filter => {
        mySelectedRecipes = selectRecipes(filter, mySelectedRecipes);
    });

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


/**
 * return the filtered recipes according to a specific filter */
function selectRecipes(filter, recipeArray) {
    let myNewArray = recipeArray.filter(recipe => {

        let isValid = checkIfRecipeIsValidByFilter(recipe, filter);

        if (isValid) {
            return recipe;
        }
    });
    return myNewArray;
}

/**
 * 
 * @param {*} recipe 
 * @param {*} filter 
 * @returns true if the recipe contains the filter, false if the recipe doesn't contain the filter
 */
function checkIfRecipeIsValidByFilter(recipe, filter) {

    let isValid = false;
    const ingredientList = recipe.ingredients.map(ingredient => {
        return ingredient.ingredient;
    });;
    const ustensilList = recipe.ustensils.map(ustensil => {
        return ustensil;
    });;
    const appliance = recipe.appliance;

    // create a list with all the items 
    const itemList = [appliance, ...ingredientList, ...ustensilList];

    itemList.forEach(item => {
        if (filter.toLowerCase() === item.toLowerCase()) {
            isValid = true;
        }
    })

    return isValid;
}






function sortByFilter(recipeArray, itemArray) {
    let myfilteredArray = []
    console.log(itemArray);

    recipeArray.forEach(recipe => {
        let recipeItems = [recipe.appliance, ...recipe.ustensils];

        recipe.ingredients.forEach(ingredient => {
            recipeItems = [...recipeItems, ingredient.ingredient];
        });


        // let isValid = false;
        let isValidArray = [];

        itemArray.forEach(item => {
            // console.log(recipeItems);

            let isValid = false;
            /**
             * check every item of the recipe
             * if true, return isValid = true 
             * */
            recipeItems.forEach(recipeItem => {
                if (recipeItem.toLowerCase() === item.toLowerCase()) {
                    return isValid = true;
                }
                // console.log(isValid);

            })
            if (isValid) {
                isValidArray.push(true);
            } else {
                isValidArray.push(false);
            }
            // console.log(recipe.name);
            // if isValid = false, then we don't need to check for the rest of the item Array
            // console.log(isValid);
            // if(isValid === false){
            //     return isValid;
            // }
        })
        let bool = true;
        isValidArray.forEach(isValid => {
            if (isValid === false) {
                return bool = false
            }

        })

        if (bool === true) {
            return myfilteredArray = [...myfilteredArray, recipe];
        }

    })

    console.log(myfilteredArray);
}

// sortByFilter(recipeArray, itemArray);


// itemArray.forEach(item => {
//     if(ingredient.ingredient === item){
//         return isValid = true;
//     }
// }) 