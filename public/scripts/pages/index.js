let recipeArray = [];
let filterArray = [];

/**
 * 
 * @returns the recipe data
 */
async function getRecipes() {
    let data = await fetch("../public/data/recettes.json").then(response => {
        return response.json();
    }).then(data => {
        return data;
    }).catch(err => {
        console.log(err);
    });

    const recipes = data.recipes.map(recipe => {
        return new RecipeFactory(recipe, "recipe");
    });;

    return {
        recipes
    };
}

/**
 * 
 * @param {*} recipes 
 * displays all the data of the recipes on the DOM
 */
async function displayRecipeData(recipes) {
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
async function init() {
    const {
        recipes
    } = await getRecipes();

    recipeArray = recipes.map(recipe => {
        return recipe;
    });

    const ingredientList = createItemList(recipes, "ingredients");
    const ustensilList = createItemList(recipes, "ustensils");
    const applianceList = createItemList(recipes, "appliances");

    displayRecipeData(recipes);
    displayIngredientList(ingredientList);
    displayUstensilList(ustensilList);
    displayApplianceList(applianceList);
    displayfilter(filterArray);
}

init();

const displayIngredientList = (data) => {
    const myListOfIngredients = document.querySelector(".list-ingredients");

    data.map(ingredient => {
        const Template = new IngredientItem(ingredient);
        const item = Template.createIngredientItem();

        myListOfIngredients.appendChild(item);
    });
}

const displayApplianceList = (data) => {
    const myListOfAppliances = document.querySelector(".list-appliances");

    data.map(appliance => {
        const Template = new ApplianceItem(appliance);
        const item = Template.createApplianceItem();

        myListOfAppliances.appendChild(item);
    });
}


const displayUstensilList = (data) => {
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
function createItemList(recipes, listType) {
    let list = [];

    switch (listType) {
        case "ingredients":
            recipes.map(recipe => {
                const ingredients = recipe.ingredients.map(ingredient => {
                    return ingredient.ingredient;
                });
                return list = [...list, ...ingredients];
            })
            break;
        case "appliances":
            list = recipes.map(recipe => {
                return recipe.appliance;
            });
            break;
        case "ustensils":
            recipes.map(recipe => {
                const ustensils = recipe.ustensils.map(ustensil => {
                    return ustensil;
                });
                return list = [...list, ...ustensils];
            })
            break;
        default:listType
            break;
    }

    const myList = list.filter((item, pos) => {
        return list.indexOf(item) === pos;
    });
    return myList;

}