import {searchRecipeByFilter } from "../utils/searchByFilter.js";
import { filterArray} from "../pages/index.js"




const searchInput = document.getElementById("search-input");
let search = "";

export function empty(myRecipeArray){
    return myRecipeArray
}

/** 
 * search a recipe when user enters an input, it returns the desired recipes
 * */
    searchInput.addEventListener("input", (e) => {
        search = e.target.value.toLowerCase();
        searchByInput(filterArray);
    });


export function searchByInput(filterArray){
    if(search.length >= 3){
        searchRecipeByFilter(filterArray, checkSearchInput)
        return ;
    }else{
        searchRecipeByFilter(filterArray, empty)
    }
}

/**
 * 
 * @param {*} input 
 * @param {*} list 
 * hides the recipes which doesn't match the input.
 * displays tje recipes which matches the input.
 */
export function checkSearchInput(list) {
    const myNewList = [];
    const input = search 

    for(let i=0; i<list.length; i++){
        if(checkIfItemMatchInput(list[i].name, input)){
            myNewList.push(list[i])
        }
    }

    return myNewList;

}


// /**
//  * if the item is valid, then we display the item.
//  * */
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


export {displayValidItemsOnly, search};

