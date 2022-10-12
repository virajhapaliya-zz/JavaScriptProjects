const mealsEl = document.getElementById("meals");
const favContainerEL = document.getElementById("fav-meals");
const searchTermEl = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const mealPopup = document.getElementById("meal-popup");
const popCloseBtn = document.getElementById("close-popup");
const mealInfo = document.getElementById("meal-info");
console.log(popCloseBtn);
getRandomMeal();
fetchFavMeals();
async function getRandomMeal() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const responseData = await response.json();
  const randomMeal = responseData.meals[0];

  addMeal(randomMeal, true);
}
async function getMealById(id) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const responseData = await response.json();
  const meal = responseData.meals[0];

  return meal;
}
async function getMealBySearch(term) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const responseData = await response.json();
  const meals = await responseData.meals;
  return meals;
}

function addMeal(mealData, random = false) {
  //   console.log(mealData);

  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
          <div class="meal-header">
            ${random ? `<span class="random"> Random Receipe </span>` : ""}

            <img
              src=${mealData.strMealThumb}
              alt=${mealData.strMeal}
            />
          </div>
          <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn"><i class="fas fa-heart"></i></button>
          </div>
          `;

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealFromLocalStorage(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealToLocalStorage(mealData.idMeal);
      btn.classList.add("active");
    }

    fetchFavMeals();
  });
  mealsEl.appendChild(meal);
  meal.addEventListener("click", () => {
    updateMealIngfo(mealData);
  });
}

function addMealToLocalStorage(mealId) {
  const mealIds = getMealFromLocalStorage();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLocalStorage(mealId) {
  const mealIds = getMealFromLocalStorage();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealFromLocalStorage() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  favContainerEL.innerHTML = ``;

  const mealIds = getMealFromLocalStorage();
  for (i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    const meal = await getMealById(mealId);
    addMealToFav(meal);
  }
}

function addMealToFav(mealData) {
  //   console.log(mealData);

  const favMeal = document.createElement("li");
  favMeal.classList.add("meal");
  favMeal.innerHTML = `
          <li>
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            /><span>${mealData.strMeal}</span>
          </li>
          <button class="clear"><i class="fas fa-window-close"</button>
          `;

  const btn = favMeal.querySelector(".clear");

  btn.addEventListener("click", () => {
    removeMealFromLocalStorage(mealData.idMeal);
    fetchFavMeals();
  });

  favMeal.addEventListener("click", () => {
    updateMealIngfo(mealData);
  });

  favContainerEL.appendChild(favMeal);
}

searchBtn.addEventListener("click", async () => {
  mealsEl.innerHTML = ``;
  const search = searchTermEl.value;

  const meals = await getMealBySearch(search);
  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

popCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});

function updateMealIngfo(mealData) {
  mealInfo.innerHTML = ``;

  const mealEl = document.createElement("div");

  const ingredients = [];

  for (i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      console.log(mealData["strIngredient" + i]);
      console.log(mealData["strMeasure" + i]);
      ingredients.push(
        `${mealData["strIngredient" + i]} / ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }

  mealEl.innerHTML = `
        
        <h1>${mealData.strMeal}</h1>

        <img
            src="${mealData.strMealThumb}"
            alt=""
          />
          <p>
            ${mealData.strInstructions}
          </p>
          <h3>Ingredients:<h3>
          <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
          </ul>
          `;
  mealInfo.appendChild(mealEl);

  mealPopup.classList.remove("hidden");
}
