// Create a function which returns a string template. The template is the HTML representation for a food item.

const foodFactory = foodObject => {
  //build and return html thing that contains all food information from the object
  let htmlFoodSection = `
    <section class = "foodCard">
      <h2>${foodObject.name}</h2>
      <h3>Type of Food: ${foodObject.type}</h3>
      <h4>Ethnicity: ${foodObject.ethnicity}</h4>
      <h4>Country of Origin: ${foodObject.country}</h4>
      <h6>Ingredients: ${foodObject.ingredients}</h6>
      <p>Sugars: ${foodObject.sugar}</p>
      <p>Fat: ${foodObject.fat}</p>
      <p>Calories: ${foodObject.calories}</p>
    </section>
    `;
  return htmlFoodSection;
};

// Create a function that inserts an HTML representation of a food into the DOM

const addFoodToDom = foodHTML => {
  //take the html and append it to the DOM
  const articleContainer = document.querySelector(".foodList");
  //cant use appendchild with string template.. you have to use innerhtml +=
  articleContainer.innerHTML += foodHTML;
};

fetch("http://localhost:8088/food")
  .then(foods => foods.json())
  .then(parsedFoods => {
    parsedFoods.forEach(foodObj => {
      // addFoodToDom(foodAsHTML);

      fetch(
        `https://world.openfoodfacts.org/api/v0/product/${foodObj.barcode}.json`
      )
        .then(response => response.json())
        .then(productInfo => {
          foodObj.ingredients = productInfo.product.ingredients_text;
          foodObj.country = productInfo.product.countries;
          foodObj.sugar = productInfo.product.nutriments.sugars_value;
          foodObj.fat = productInfo.product.nutriments.fat_serving;
          foodObj.calories = productInfo.product.nutriments.energy_serving;
          console.log("food obj hopefully with sugar, fat, and cals", foodObj);
          const foodAsHTML = foodFactory(foodObj);
          addFoodToDom(foodAsHTML);
        });
    });
  });
