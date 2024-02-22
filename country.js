const countryName = new URLSearchParams(location.search).get('name');
const flagImage = document.querySelector('.country-details img');
const countryTitle = document.querySelector('.detail-text-container h1');
let detailText = document.querySelector('.detail-text');
let nativeName = document.querySelector(".detail-text > p:nth-child(1) > span");
let Population = document.querySelector(".detail-text > p:nth-child(2) > span");
let Region = document.querySelector(".detail-text > p:nth-child(3) > span");
let SubRegion = document.querySelector(".detail-text > p:nth-child(4) > span");
let Capital = document.querySelector(".detail-text > p:nth-child(5) > span");
let DomainValue = document.querySelector(".detail-text > p:nth-child(6) > span");
let Currency = document.querySelector(".detail-text > p:nth-child(7) > span");
let languages= document.querySelector(".detail-text > p:nth-child(8) > span");
let borderCountries = document.querySelector(".border-countries")
let backButton = document.querySelector('.back-button')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res)=> res.json()).then(([country])=>{
    flagImage.src = country.flags.svg;
    countryTitle.innerHTML = country.name.common;
    
    if(country.name.nativeName){
         nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    }else{
        nativeName.innerText = country.name.common;
    }

    Population.innerText = country.population.toLocaleString('en-IN');
    Region.innerText = country.region;
    SubRegion.innerText = country.subregion;

    if(country.capital){
    Capital.innerText = country.capital;
    };

    DomainValue.innerText = country.tld.join(', ');

    if(country.currencies){
        Currency.innerText =Object.values(country.currencies).map((currency)=> currency.name).join(', ');
    }else {
        Currency.innerText  = " ";
    }

    if(country.languages){
    languages.innerText = Object.values(country.languages).join(', ')
    }

    if(country.borders){
        country.borders.forEach((border)=>{
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=> res.json()).then(([borderCountry])=>{                   
            const borderCountryTag = document.createElement('a');
                borderCountryTag.innerText = borderCountry.name.common;
                borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                borderCountries.append(borderCountryTag);
            })
        })
    }

 })


 //back button:

 backButton.addEventListener('click',()=>{
    history.back();
 })

// For Themes:

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

