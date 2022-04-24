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

    filters.map(filter => {
        mySelectedRecipes = selectRecipes(filter, mySelectedRecipes);
    });

    // if there isn't any filter, we return all the recipes
    if (filters.length === 0) {
        recipes.map(recipe => {
            document.getElementById(recipe.id).classList.remove("hide");
            toggleHide(recipe, search);
        })
    } else {
        recipes.map(recipe => {
            document.getElementById(recipe.id).classList.add("hide");
        });

        mySelectedRecipes.map(recipe => {
            document.getElementById(recipe.id).classList.remove("hide");
            toggleHide(recipe, search);
        });
    }

}
/**
 * return the filtered recipes according to the diplayed filters */
function selectRecipes(filter, recipeArray) {
    let myNewArray = recipeArray.filter(recipe => {

        let isValid = checkIfRecipeIsValidDependingOnFilter(recipe, filter);


        // const ingredientList = recipe.ingredients;
        // const ustensilList = recipe.ustensils;
        // const appliance = recipe.appliance;

        // const recipeIngredientOnly = ingredientList.map(ingredient => {
        //     return ingredient.ingredient;
        // });
        // const recipeUstensilOnly = ustensilList.map(ustensil => {
        //     return ustensil;
        // });


        // recipeIngredientOnly.forEach(ingredient => {
        //     if (filter.toLowerCase() === ingredient.toLowerCase()) {
        //         isValid = true;
        //     }
        // });

        // recipeUstensilOnly.forEach(ustensil => {
        //     if (filter.toLowerCase() === ustensil.toLowerCase()) {
        //         isValid = true;
        //     }
        // });

        // if (filter.toLowerCase() === appliance.toLowerCase()) {
        //     isValid = true;
        // }

        console.log(isValid);

        if (isValid) {
            return recipe;
        }
    });
    return myNewArray;
}

// function checkIfRecipeItemMatchFilter(filter, recipeItems){
//     recipeItems.forEach(item => {
//         if(filter.toLowerCase() === item.toLowerCase()){
//             return true;
//         } else{
//             return false;
//         }
//     })
    
// }

function checkIfRecipeIsValidDependingOnFilter(recipe, filter){

    let isValid = false;
    const ingredientList = recipe.ingredients;
    const ustensilList = recipe.ustensils;
    const appliance = recipe.appliance;

    const recipeIngredientOnly = ingredientList.map(ingredient => {
        return ingredient.ingredient;
    });
    const recipeUstensilOnly = ustensilList.map(ustensil => {
        return ustensil;
    });


    recipeIngredientOnly.forEach(ingredient => {
        if (filter.toLowerCase() === ingredient.toLowerCase()) {
            isValid = true;
        }
    });

    recipeUstensilOnly.forEach(ustensil => {
        if (filter.toLowerCase() === ustensil.toLowerCase()) {
            isValid = true;
        }
    });

    if (filter.toLowerCase() === appliance.toLowerCase()) {
        isValid = true;
    }

    return isValid;
}
function displayfilter(filterArray) {
    const filterItems = document.querySelectorAll(".dropdown-item");
    const filterBox = document.getElementById("filters");

    filterItems.forEach(filter => {
      
        console.log(filter);
       
        filter.addEventListener("click", event => {
            filterArray.push(event.target.innerHTML);
            const filterClass = filter.classList[1];

            const newfilter = document.createElement("div");

            newfilter.classList.add("filter-item");

            if (filterClass === "dropdown-item--ingredient") {
                newfilter.classList.add("filter-item--ingredient");
            }
            if (filterClass === "dropdown-item--ustensil") {
                newfilter.classList.add("filter-item--ustensil");

            }
            if (filterClass === "dropdown-item--appliance") {
                newfilter.classList.add("filter-item--appliance");
            }


            const filterContent = `
                <p class="filter-item__title">${event.target.innerHTML}</p>
                <i class="far fa-times-circle remove-btn"></i>`;

            newfilter.innerHTML = filterContent;

            filterBox.appendChild(newfilter);

            removerFilter(recipeArray, filterArray);

            searchRecipeByFilter(recipeArray, filterArray);


        });

    });
}


function removerFilter(recipes, filters) {

    const removeBtnArray = document.querySelectorAll(".remove-btn");

    removeBtnArray.forEach(removeBtn => {
        removeBtn.addEventListener("click", (e) => {
            const filterBtn = e.target.closest(".filter-item");
            const filterBtnTitle = filterBtn.querySelector(".filter-item__title").innerText;

            filterBtn.remove();
            filters.forEach(item => {
                if (item.toLowerCase() === filterBtnTitle.toLowerCase()) {
                    return filters.splice(filters.indexOf(item), 1);
                }
            });

            searchRecipeByFilter(recipes, filters);

            console.log(filters);
        })
    })

}

displayfilter();