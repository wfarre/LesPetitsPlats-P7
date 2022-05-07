const searchInput = document.getElementById("search-input");
const cards = document.querySelectorAll(".card");

const filterBox = document.getElementById("filters");

let search = "";

/** 
 * search a recipe by entering a name in the input box, it returns the desired recipes
 * */

function searchByInput() {
    searchInput.addEventListener("input", (e) => {
        search = e.target.value.toLowerCase();
        checkSearchInput(search, recipeArray);
        searchRecipeByFilter(recipeArray, filterArray);
    });
}

searchByInput();


/**
 * 
 * @param {*} input 
 * @param {*} list 
 * hides the recipes which doesn't match the input.
 * displays tje recipes which matches the input.
 */
// function checkSearchInput(input, list) {
//     list.forEach(item => {
//         displayValidItemsOnly(item.name, item.id, input);
//     });
// };


function checkSearchInput(input, list){
    for(i=0; i<list.length; i++){
        displayValidItemsOnly(list[i].name, list[i].id, input);
    }
}


// function toggleHide(item, input){
//     if(checkIfItemMatchInput(item.name, input)){
//         document.getElementById(item.id).classList.remove("hide");
//     } else{
//         document.getElementById(item.id).classList.add("hide");
//     }
// }


/**
 * if the item is valid, then we display the item.
 * */
function displayValidItemsOnly(itemName, itemId, input) {
    if (checkIfItemMatchInput(itemName, input)) {
        document.getElementById(itemId).classList.remove("hide");
    } else {
        document.getElementById(itemId).classList.add("hide");
    }
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


// function checkIfItemMatchInput(item, input) {
//     const itemLowerCase = item.toLowerCase();
//     console.log(input);
//     for(i=0; i<input.length ; i++){
//         console.log(input[i]);
//         if(input[i].toLowerCase() === itemLowerCase[i]){
//             return true;
//         } else{
//             return false;
//         }
//     }

// }


// // TO IMPROVE 
// function checkIfRecipeMatchInput(recipe, input) {
//     const recipeName = recipe.name.toLowerCase()
//     if (recipeName.includes(input)) {
//         document.getElementById(recipe.id).classList.remove("hide");
//     } else {
//         document.getElementById(recipe.id).classList.add("hide");
//     }
// }


const searchIngredient = document.querySelector(".search-ingredient");

const searchToggleInputs = document.querySelectorAll(".search-toggle");


/**
 * add an event listener when we enter an input
 */
searchToggleInputs.forEach(input => {
    input.addEventListener("input", (e) => {
        const inputClass = input.classList.value;
        const inputValue = e.target.value;

        if (inputClass.includes("search-ingredient")) {
            const items = document.querySelectorAll(".dropdown-item--ingredient");
            searchItems(items, inputValue);
        }

        if (inputClass.includes("search-appliance")) {
            const items = document.querySelectorAll(".dropdown-item--appliance");
            searchItems(items, inputValue);
        }

        if (inputClass.includes("search-ustensil")) {
            const items = document.querySelectorAll(".dropdown-item--ustensil");
            searchItems(items, inputValue);
        }
    })
});

/**
 * return only an array of the selected items. 
 * The it hides the items which are not valid and dispaly the items which are valid. 
 * 
 * */
function searchItems(items, input) {
    let itemArray = [];

    items.forEach(item => {
        return itemArray = [...itemArray, item.innerHTML];
    });
    const searchedItem = input.toLowerCase();
    itemArray.forEach(item => {
        displayValidItemsOnly(item, item, searchedItem);
    });
}




