class RecipeCard{
    constructor(recipe){
        this._recipe = recipe
    }

    createRecipeCard(){

        const ingredientList = this._recipe.ingredients;
        const article = document.createElement("article");
        article.classList.add("card");
        article.setAttribute("id", this._recipe.id);
        
        let ingredients = ``
        
        ingredientList.map(ingredient => {
            const unit = ingredient.unit ? ingredient.unit : "";
            const quantity = ingredient.quantity ? " : " + ingredient.quantity : " ";
            const ingredientItem = `
            <li class="ingredient-list__item">
                <p class="ingredient-list__item__name">
                    ${ingredient.ingredient}
                </p> 
                <p class="ingredient-list__item__quantity">
                    ${quantity} ${unit}
                </p>
            </li>`

            ingredients += ingredientItem;
        });

        const recipeCard = `
                <div class="card__image">
                    <img src="" alt="">
                </div>

                <div class="card__content">

                    <header class="card__content__header">
                        <h2 class="card__content__header__title">
                            ${this._recipe.name}
                        </h2>
                        <div class="card__content__header__duration">
                            <img src="./assets/images/clock-icon.svg" alt="">
                            <span>${this._recipe.time} min</span>
                        </div>
                    </header>
    
                    <div class="card__content__main">
    
                        <div class="card__content__main__ingredients">
    
                            <ul class="ingredient-list">
                                ${ingredients}
                            </ul>
                        </div>
    
                        <div class="card__content__main__directions">
                            <p>
                                ${this._recipe.description}
                            </p>
                        </div>
                    </div>

                </div>`


            article.innerHTML = recipeCard;

            return(article);
    }
}

export default RecipeCard;