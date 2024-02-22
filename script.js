const countriesContainer = document.querySelector(".country-container");
const filterByRegion = document.querySelector ('.filter-by-region');
const searchBar = document.querySelector('.search-container input');
//For all Countries Filter
let allCountriesData


//Countries Image & data fetch from API
fetch("https://restcountries.com/v3.1/all").then((res) => res.json())
  .then((data)=>{
    renderCountries(data);

    allCountriesData = data;    //For all Countries Filter

  });


//Region Filter
filterByRegion.addEventListener('change',(e)=>{
  console.log(filterByRegion.value);  //Name of selected option
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
  });
})

function renderCountries (data){
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `country.html?name=${country.name.common}`

    const cardHtml = `
      <div class="image-container">
          <img src="${country.flags.png}" alt="${country.name.common}" />
      </div>  
      <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b> ${(country.population).toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital}</p>
      </div>
      `;
    countryCard.innerHTML = cardHtml;

    countriesContainer.append(countryCard);
  })
}


// search bar:
searchBar.addEventListener('input',(e)=>{ 
  let filteredCountry = allCountriesData.filter((country) => (country.name.common).toLowerCase().includes(e.target.value.toLowerCase()));
  renderCountries(filteredCountry);
})


//For themes
let body = document.querySelector('body');
let themes = document.querySelector('.theme1');
let lightThemes = document.querySelector('.theme2');

themes.addEventListener('click',(e)=>{
    document.documentElement.setAttribute('data-theme', 'dark');
    body.style.transition = '.30s linear'
    lightThemes.style.display = 'block';
    themes.classList.add('hide');
})

lightThemes.addEventListener('click',(e)=>{
    document.documentElement.removeAttribute('data-theme', 'light');
    body.style.transition = '.30s linear';
    lightThemes.style.display = 'none';
    themes.classList.remove('hide');
})