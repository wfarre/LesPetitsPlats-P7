class RecipeFactory{
    constructor(data, type){
        if(type === "recipe"){
            return new Recipe(data);
        }
        // if(type === "ingredient"){
        //     return 
        // }
    }
}