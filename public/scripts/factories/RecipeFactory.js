import Recipe from "../models/Recipe.js";

class RecipeFactory{
    constructor(data, type){
        if(type === "recipe"){
            return new Recipe(data);
        }
    }
}

export default RecipeFactory;