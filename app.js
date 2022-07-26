document.body.innerHTML = `<form class="search-form">
<input type="text" class="search" placeholder="City or State">
<ul class="suggestions">
    <li>Filter for a city</li>
    <li>or a state</li>
</ul>
</form>`

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data))

function findMatches(wordToMatch,cities) {
    return cities.filter(place => {
        const regEx = new RegExp(wordToMatch,"ig");
        return place.city.match(regEx) || place.state.match(regEx);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
}

function displayMatches() {
    const matchArray = findMatches(this.value,cities);
    const html = matchArray.map(place => {
    const regEx = new RegExp(this.value,"ig");
    const cityName = place.city.replace(regEx,`<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regEx,`<span class="hl">${this.value}</span>`);
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
            `
    }).join("");
    suggestions.innerHTML = html;
    if (this.value === "") {
        suggestions.innerHTML =
        `<li>Filter for a city</li>
        <li>or a state</li>`
    }
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("keyup",displayMatches)