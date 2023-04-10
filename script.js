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

const renderDashboard = () => {
  const apiUrl = "https://restcountries.com/v3.1/all";

  let countries;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((countriesList) => {
      // console.log(countriesList);

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
};

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

const createInfoElement = (label, value) => {
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
  anchor.href = `?country=${country.name}`;

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");

  const countryName = document.createElement("h2");
  countryName.innerText = country.name;
  countryName.classList.add("country-name");

  infoContainer.append(
    countryName,
    createInfoElement("Population", country.population),
    createInfoElement("Region", country.region),
    createInfoElement("Capital", country.capital)
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

// ------- DETAIL ELEMENT -------

const renderDetail = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const countryName = searchParams.get("country");

  const apiUrlDetail = `https://restcountries.com/v3.1/name/${countryName}`;

  fetch(apiUrlDetail)
    .then((res) => res.json())
    .then(([country]) => {
      if (!country) {
        goBackToCountryList();
      }

      country = {
        flagUrl: country.flags.png,
        name: country.name.common,
        nativeName: Object.values(country.name.nativeName)[0].official,
        population: country.population.toLocaleString("en-GB"),
        region: country.region,
        subRegion: country.subregion,
        capital: country.capital && country.capital[0],
        tld: country.tld[0],
        currencies: Object.values(country.currencies)
          .map((currency) => currency.name)
          .join(", "),
        languages: Object.values(country.languages).join(", "),
        borders: country.borders,
      };
      renderCountryDetail(country);
    });
};

const goBackToCountryList = () => {
  window.location.href = "/";
};

// CREATE DETAIL ELEMENT

const createDetailElement = (country) => {
  const detailContainer = document.createElement("section");
  detailContainer.classList.add("detail-container");

  const flagImgEl = createFlagImg(country);

  const detailInfoContainer = document.createElement("div");
  detailInfoContainer.classList.add("detail-info-container");

  const countryName = document.createElement("h2");
  countryName.innerText = country.name;

  const leftColumn = document.createElement("div");
  leftColumn.classList.add("left-column");

  leftColumn.append(
    createInfoElement("Native Name", country.nativeName),
    createInfoElement("Population", country.population),
    createInfoElement("Region", country.region),
    createInfoElement("Sub Region", country.subRegion),
    createInfoElement("Capital", country.capital)
  );

  const rightColumn = document.createElement("div");
  rightColumn.classList.add("right-column");

  rightColumn.append(
    createInfoElement("Top Level Domain", country.tld),
    createInfoElement("Currencies", country.currencies),
    createInfoElement("Languages", country.languages)
  );

  detailContainer.append(flagImgEl, detailInfoContainer);
  detailInfoContainer.append(countryName, leftColumn, rightColumn);

  if (country.borders && country.borders.length > 0) {
    detailInfoContainer.appendChild(createBorderCountriesContainer(country));
  }

  return detailContainer;
};

// DETAIL BUTTON

const createDetailButton = (text, link) => {
  const anchor = document.createElement("a");
  anchor.innerHTML = text;
  anchor.classList.add("detail-link");
  anchor.href = link;
  return anchor;
};

// BORDER COUNTRIES

const createBorderCountriesContainer = (country) => {
  const borderCountriesContainer = document.createElement("div");
  borderCountriesContainer.classList.add("border-countries");

  const labelElement = document.createElement("strong");
  labelElement.innerText = "Border Countries: ";

  borderCountriesContainer.appendChild(labelElement);

  country.borders.forEach((border) => {
    console.log(border);
    borderCountriesContainer.appendChild(
      createDetailButton(border, `/?country=${border}`)
    );
  });
  return borderCountriesContainer;
};

//RENDER COUNTRY DETAIL TO MAIN ELEMENT
const renderCountryDetail = (country) => {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = "";
  mainElement.appendChild(
    createDetailButton(`<i class="fa-solid fa-arrow-left-long"></i> Back`, "/")
  );
  mainElement.appendChild(createDetailElement(country));
};
if (window.location.search.includes("?country=")) {
  renderDetail();
} else {
  renderDashboard();
}
