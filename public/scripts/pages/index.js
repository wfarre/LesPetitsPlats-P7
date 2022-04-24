let recipeArray = [];

async function getRecipes() {
    let data = await fetch("../public/data/recettes.json").then(response => {
        return response.json();
    }).then(data => {
        return data;
    }).catch(err => {
        console.log(err);
    });

    const recipes = data.recipes;

    // console.log(recipes);

    return {
        recipes
    };
}

async function displayData(data) {
    const results = document.getElementById("result-container");

    const Recipes = data.map(recipe => {
        return new RecipeFactory(recipe, "recipe");
    });


    Recipes.map(recipe => {
        const Template = new RecipeCard(recipe);
        const recipeCard = Template.createRecipeCard();
        results.appendChild(recipeCard);
    });
}

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

    console.log(ingredientList);

    // let ingredientList = [];
    // let ustensilList = [];
    // let applianceList = [];

    // ingredientList = recipes.map(recipe => {

    //     const ingredients = recipe.ingredients.map(ingredient => {
    //         return ingredient.ingredient.toLowerCase();
    //     });

    //     return ingredientList = [...ingredientList, ...ingredients];
    // });

    // ustensilList = recipes.map(recipe => {

    //     const ustensils = recipe.ustensils.map(ustensil => {
    //         return ustensil;
    //     });

    //     return ustensilList = [...ustensilList, ...ustensils];
    // });

    // applianceList = recipes.map(recipe => {
    //     return recipe.appliance;
    // });




    // const myIngredientList = ingredientList[49].filter((ingredient, pos) => {
    //     return ingredientList[49].indexOf(ingredient) === pos;
    // });

    // const myUstensilList = ustensilList[49].filter((ustensil, pos) => {
    //     return ustensilList[49].indexOf(ustensil) === pos;
    // });
    // const myApplianceList = applianceList.filter((appliance, pos) => {
    //     return applianceList.indexOf(appliance) === pos;
    // });

    displayData(recipes);
    displayIngredientList(ingredientList);
    displayUstensilList(ustensilList);
    displayApplianceList(applianceList);
    displayfilter(filterArray);
}


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

    console.log(list);

    const myList = list.filter((item, pos) => {
        return list.indexOf(item) === pos;
    });
    return myList;

}


init();

let filterArray = [];

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




class IngredientItem {
    constructor(ingredient) {
        this._ingredient = ingredient;
    }

    createIngredientItem() {
        const listItem = document.createElement("li");
        listItem.classList.add("dropdown-item");
        listItem.classList.add("dropdown-item--ingredient");
        listItem.setAttribute("id", this._ingredient);


        listItem.innerHTML = this._ingredient;

        return (listItem);
    }
}


class ApplianceItem {
    constructor(appliance) {
        this._appliance = appliance
    }

    createApplianceItem() {
        const listItem = document.createElement("li");
        listItem.classList.add("dropdown-item");
        listItem.classList.add("dropdown-item--appliance");
        listItem.setAttribute("id", this._appliance);

        listItem.innerHTML = this._appliance;

        return (listItem);
    }
}


class UstensilItem {
    constructor(ustensil) {
        this._ustensil = ustensil
    }

    createUstensilItem() {
        const listItem = document.createElement("li");
        listItem.classList.add("dropdown-item");
        listItem.classList.add("dropdown-item--ustensil");
        listItem.setAttribute("id", this._ustensil);


        listItem.innerHTML = this._ustensil;

        return (listItem);
    }
}