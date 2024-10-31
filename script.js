
// edamam recipe api is used

const appId = '91158840';
const appKey = '5f945409b90208ae19ec6c2f69a87a6d';

document.getElementById('search-btn').addEventListener('click', () => {
    const ingredient = document.getElementById('ingredient').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (ingredient) {
        const url = `https://api.edamam.com/search?q=${ingredient}&app_id=${appId}&app_key=${appKey}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.hits.length > 0) {
                    data.hits.forEach(item => {
                        const recipe = item.recipe;
                        const recipeDiv = document.createElement('div');
                        recipeDiv.classList.add('recipe');
                        recipeDiv.innerHTML = `
                            <h3>${recipe.label}</h3>
                            <img src="${recipe.image}" alt="${recipe.label}" />
                            <p class="calories">Calories: ${Math.round(recipe.calories)}</p>
                            <p class="ingredients">Ingredients: ${recipe.ingredientLines.join(', ')}</p>
                            <a class="view-recipe-btn" href="${recipe.url}" target="_blank">View Recipe</a>
                        `;
                        resultsDiv.appendChild(recipeDiv);
                    });
                } else {
                    resultsDiv.innerHTML = '<p>No recipes found.</p>';
                }
            })
            .catch(err => {
                console.error(err);
                resultsDiv.innerHTML = '<p>Error fetching recipes. Please try again.</p>';
            });
    } else {
        resultsDiv.innerHTML = '<p>Please enter an ingredient.</p>';
    }
});
