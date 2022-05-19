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

export {IngredientItem, UstensilItem, ApplianceItem};