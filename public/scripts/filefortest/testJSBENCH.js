const searchInput = document.getElementById("search-input");
let search = "limo";
let filterArray = ["sucre"];
let recipes = myRecipeArray;

function init(callback1,callback2){
    let recipeArray = callback1(recipes);
    let newRecipes = callback2(recipeArray);

    
}

function empty(myRecipeArray){
    return myRecipeArray;
}

function searchRecipeByFilter(filters, callback) {
    
    // let mySelectedRecipes = sortByFilter(recipes, filters);

    // if there isn't any filter, we return all the recipes
    if (filters.length === 0) {
        init(callback, empty);
    } else {
        init(callback, sortByFilter);
    }
}







function sortByFilter(recipeArray) {
    let filters = filterArray;
    let myfilteredArray = [];

    recipeArray.forEach(recipe => {
        let recipeItems = [recipe.appliance, ...recipe.ustensils];

        recipe.ingredients.forEach(ingredient => {
            recipeItems = [...recipeItems, ingredient.ingredient];
        });

        const lowerCaseRecipeItems = recipeItems.map((item) => {
            return item.toLowerCase();
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

/** 
 * search a recipe when user enters an input, it returns the desired recipes
 * */
    searchInput.addEventListener("input", (e) => {
        search = e.target.value.toLowerCase();
        searchByInput(filterArray);
    });


function searchByInput(filterArray){
    if(search.length >= 3){
        searchRecipeByFilter(filterArray, checkSearchInput);
        return ;
    }else{
        searchRecipeByFilter(filterArray, empty);
    }
}

/**
 * 
 * @param {*} input 
 * @param {*} list 
 * hides the recipes which doesn't match the input.
 * displays tje recipes which matches the input.
 */
function checkSearchInput(list) {
    const myNewList = [];
    const input = search ;
    list.forEach(item => {
        if(checkIfItemMatchInput(item.name, input)){
            myNewList.push(item);
        }
    })

    // for(let i=0; i<list.length; i++){
    //     if(checkIfItemMatchInput(list[i].name, input)){
    //         myNewList.push(list[i])
    //     }
    // }

    return myNewList;

}



/**
 * check if the items is valid or not. 
 * If the item match the input, the function returns true,
 * else, it returns false  */
 function checkIfItemMatchInput(item, input) {
    const itemLowerCase = item.toLowerCase();
    if (itemLowerCase.includes(input)) {
        return true;
    } else {
        return false;
    }
}