import {filterArray, recipeArray} from "../pages/index.js"
import { searchByInput} from "./searchByInput.js"


/**
 * when user chooses a filter, 
 * the filter is added to the filterBox */
function displayfilter(filterArray) {
    const filterItems = document.querySelectorAll(".dropdown-item");
    const filterBox = document.getElementById("filters");

    filterItems.forEach(filter => {
             
        filter.addEventListener("click", event => {
            filterArray.push(event.target.innerHTML);

            const newfilter = createFilterBtn(filter);
            filterBox.appendChild(newfilter);

            removeFilter(recipeArray, filterArray);
            searchByInput(filterArray)
        });
    });
}

/**
 * When the user clicks on one of the selected filters, 
 * it is removed form the filterBox
 * @param {*} recipes 
 * @param {*} filters 
 */
function removeFilter(recipes, filters) {

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
            searchByInput(filterArray)
        })
    })
}

displayfilter();

/**
 * 
 * @param {*} filter 
 * @returns the filter to display
 */
function createFilterBtn(filter){
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

    return newfilter
}


const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

/** 
 * added setInterval to focus on the input box
 */
dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
        const toggleInput = toggle.querySelector(".dropdown-toggle__input");
        setInterval(() => toggleInput.focus(), 500);
    })
})


export {displayfilter};