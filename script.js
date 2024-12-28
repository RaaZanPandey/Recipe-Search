const search = document.querySelector(".search");
const searchbtn = document.querySelector(".searchbtn");
const recipe_container = document.querySelector(".recipe_container");

recipe_container.innerHTML = `<h2>Search your faviorate Recipe</h2>`;


function LoadMeal(meal) {
    const details = document.querySelector(".details");

    details.innerHTML = "";
    for (let i = 1; i <= 20; i++) {

        let ingreidents = meal[`strIngredient${i}`]
        let measurment = meal[`strMeasure${i}`]
        if (ingreidents) {
            details.innerHTML += `<li>${ingreidents} - ${measurment}</li><br>`
        }
  
        // else {
        //     break;
        // }
    }
    details.innerHTML += `
    <h2>Instruction:</h2>
    <br>
    <p>${meal.strInstructions}</p>
`;

}




async function fetchingData(meal) {
    recipe_container.innerHTML = `<h1>Fetching Recipe.....<h1>`;

    try {
        const item = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);

        if (!item.ok) {
            throw new Error("Please Enter valid Recipe..");
        }
        const respond = await item.json();
        console.log(respond);
        LoadRecipes(respond);
    }
    catch (error) {
        recipe_container.innerHTML = `<h1>Please Enter valid Recipe...</h1>`;

    }
}




function LoadRecipes(respond) {
    recipe_container.innerHTML = "";
    respond.meals.forEach(meal => {
        const recipe = document.createElement('div');
        recipe.classList.add("recipe");
        recipe.innerHTML = `
         <img src="${meal.strMealThumb}">
        <h2>${meal.strMeal}<h2>
        <p><span>${meal.strArea}</span> Dish<p>
        <p>Belong to <span>${meal.strCategory}</span> Catagory<p>
        `

        recipe_container.appendChild(recipe);


        const button = document.createElement('button');
        button.innerHTML = "View Recipe";
        recipe.appendChild(button);

        button.addEventListener("click", () => {

            document.querySelector(".container").style.display = "block";
            document.querySelector(".name").innerHTML = `<h4>${meal.strMeal}</h4>`;
            LoadMeal(meal);

        });
        document.querySelector(".ri-close-large-fill").addEventListener("click", () => {
            document.querySelector(".container").style.display = "none";
        });
    });

}

searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const item = search.value.trim();
    if (item) {
        fetchingData(item);
    }
    else {
        recipe_container.innerHTML = `<h2>Please search recipe </h2>`;
    }
})

