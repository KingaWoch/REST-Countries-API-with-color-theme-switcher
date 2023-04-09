// TOGGLE THEME

const themeToggleButton = document.querySelector(".theme-toggle");
const moonIcon = document.querySelector(".theme-toggle i");
const body = document.querySelector("body");

const toggleTheme = () => {
  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    moonIcon.classList.remove("fa-solid");
    moonIcon.classList.add("fa-regular");
  } else {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
    moonIcon.classList.add("fa-solid");
    moonIcon.classList.remove("fa-regular");
  }
};

themeToggleButton.addEventListener("click", toggleTheme);

// COUNTRY LIST

const apiUrl = "https://restcountries.com/v3.1/all";

let countries;

fetch(apiUrl)
  .then((res) => res.json())
  .then((countriesList) => {
    console.log(countriesList);

    countries = countriesList.map((country) => {
      return {
        flagUrl: country.flags.png,
        name: country.name.common,
        population: country.population.toLocaleString("en-GB"),
        region: country.region,
        capital: country.capital && country.capital[0],
        code: country.cca2,
      };
    });
    renderCountryList(countries);
    //console.log(countries);
  });

// FLAG

const createFlagImg = (country) => {
  const flagImgContainer = document.createElement("div");
  const flagImg = document.createElement("img");
  flagImg.src = country.flagUrl;
  flagImg.alt = `${country.name} flag`;
  flagImgContainer.appendChild(flagImg);

  return flagImgContainer;
};

// INFO

const createInfoContainer = (label, value) => {
  const infoElement = document.createElement("p");
  const labelElement = document.createElement("strong");
  labelElement.innerText = `${label}: `;
  infoElement.innerText = `${value}`;
  infoElement.appendChild(labelElement);

  return infoElement;
};
// COUNTRY ITEM

const createCountryElement = (country) => {
  const countryContainer = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.href = `?country=${country.code}`;

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");

  const countryName = document.createElement("h2");
  countryName.innerText = country.name;
  countryName.classList.add("country-name");

  infoContainer.append(
    countryName,
    createInfoContainer("Population", country.population),
    createInfoContainer("Region", country.region),
    createInfoContainer("Capital", country.capital)
  );

  countryContainer.appendChild(anchor);
  anchor.append(createFlagImg(country), infoContainer);

  return countryContainer;
};

// RENDER COUNTRY LIST TO SECTION ELEMENT

const renderCountryList = (countries) => {
  const countryList = document.querySelector(".countries");
  countries.forEach((country) => {
    countryList.appendChild(createCountryElement(country));
  });
  return countryList;
};
