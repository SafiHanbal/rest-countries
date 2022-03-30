import sprite from './../../images/sprite.svg';

class mainCl {
  #search = document.querySelector('.search');
  #main = document.querySelector('.main');

  #isDropdownActive = false;

  #closeDropdown() {
    this.#main
      .querySelector('.search__regions')
      .classList.remove('search__regions--active');

    this.#isDropdownActive = false;
  }

  #openDropdown() {
    this.#main
      .querySelector('.search__regions')
      .classList.add('search__regions--active');

    this.#isDropdownActive = true;
  }

  toggleSearchDropdown() {
    this.#isDropdownActive ? this.#closeDropdown() : this.#openDropdown();
  }

  addHandlerToggleSearchDropdown(handler) {
    this.#main
      .querySelector('.search__filter')
      .addEventListener('click', handler);
  }

  filterByName(countryData) {
    const filteredCountry = [];
    const countryName = this.#main
      .querySelector('.search__input')
      .value.toLowerCase();
    countryData.forEach(country => {
      if (country.name.toLowerCase().includes(countryName))
        filteredCountry.push(country);
    });

    this.renderCountries(filteredCountry);
  }

  addHandlerFilterByName(handler) {
    this.#main
      .querySelector('.search__input')
      .addEventListener('keyup', handler);
  }

  filterByRegion(countryData, e) {
    if (!e.target.classList.contains('region')) return;
    const filteredCountry = [];

    countryData.forEach(country => {
      if (country.region === e.target.textContent)
        filteredCountry.push(country);
    });

    this.renderCountries(filteredCountry);
    this.#closeDropdown();
  }

  addHandlerFilterByRegion(handler) {
    this.#main
      .querySelector('.search__regions')
      .addEventListener('click', function (e) {
        handler(e);
      });
  }
  ///////////////////////////////////

  renderInitial() {
    let markup = `
      <section class="search">
        <form class="search__form">
          <label for="search__input">
            <svg class="icon-search">
              <use xlink:href="${sprite}#icon-search"></use>
            </svg>
          </label>
          <input
            type="text"
            class="search__input"
            id="search__input"
            placeholder="Search for a country..."
          />
        </form>
        <div class="search__dropdown">
          <p class="search__filter">
            Filter by Region
            <svg class="icon-chevron-down">
              <use xlink:href="${sprite}#icon-chevron-down"></use>
            </svg>
          </p>
          <div class="search__regions">
            <p class="region">Africa</p>
            <p class="region">Americas</p>
            <p class="region">Asia</p>
            <p class="region">Europe</p>
            <p class="region">Oceania</p>
          </div>
        </div>
      </section>
      <section class="section-countries">
      </section>
    `;

    this.#main.innerHTML = markup;
  }

  renderCountries(countryData) {
    let markup = ``;

    countryData.forEach(country => {
      markup += `
        <div class="country" data-country="${country.alpha3Code}">
          <img
            src="${country.flags.png}"
            alt="${country.name} flag"
            class="country__flag"
            loading="lazy"
          />
          <div class="country__description">
            <h3 class="heading-32">${country.name}</h3>
            <p class="paragraph">
              <span class="paragraph--bold">Population:</span>
              ${country.population}
            </p>
            <p class="paragraph">
              <span class="paragraph--bold">Region:</span>
              ${country.region}
            </p>
            <p class="paragraph">
              <span class="paragraph--bold">Capital:</span>
              ${country.capital}
            </p>
          </div>
        </div>
      `;
    });

    this.#main.querySelector('.section-countries').innerHTML = markup;
  }
  //////////////////////////////////////////////////

  filterCountry(countriesData, alphaCode) {
    let countryData;
    countriesData.forEach(country => {
      if (country.alpha3Code === alphaCode) countryData = country;
    });

    return countryData;
  }

  renderCountryDetails(country, countriesData) {
    let markup = `
        <button class="btn-back">
        <svg class="icon-back">
          <use xlink:href="${sprite}#icon-arrow-left"></use>
        </svg>
        Back
        </button>
        <div class="country-detail">
          <img
            src="${country.flags.png}"
            alt="${country.name} flag"
            class="country-detail__flag"
          />
          <div class="country-detail__text">
            <h2 class="heading-2">${country.name}</h2>
            <div class="country-detail__details">
              <div class="country-detail__details-1">
                <p class="paragraph">
                  <span class="paragraph--bold">Native Name:</span>
                  ${country.nativeName}
                </p>

                <p class="paragraph">
                  <span class="paragraph--bold">Population:</span>
                  ${country.population}
                </p>

                <p class="paragraph">
                  <span class="paragraph--bold">Region:</span>
                  ${country.region}
                </p>

                <p class="paragraph">
                  <span class="paragraph--bold">Sub Region:</span>
                  ${country.subregion}
                </p>

                <p class="paragraph">
                  <span class="paragraph--bold">Capital:</span>
                  ${country.capital}
                </p>
              </div>

              <div class="country-detail__details-2">
                <p class="paragraph">
                  <span class="paragraph--bold">Top Level Domain:</span>
                  ${country.topLevelDomain[0]}
                </p>

                <p class="paragraph">
                  <span class="paragraph--bold">Currencies:</span>
                  ${country.currencies[0].name}
                </p>

                <p class="paragraph">
                  <span class="paragraph--bold">Languages:</span>
                  `;

    country.languages.forEach((lang, i, arr) => {
      arr.length - 1 === i
        ? (markup += `${lang.name}`)
        : (markup += `${lang.name}, `);
    });

    markup += ` </p>
              </div>
            </div>
            <div class="country-detail__borders">
              <span class="paragraph paragraph--bold">Border Countries:</span>
              `;

    country.borders?.forEach(border => {
      markup += `<button class="btn-border" data-border="${border}">${
        this.filterCountry(countriesData, border).name
      }</button>`;
    });

    markup += `
            </div>
          </div>
        </div>
      `;

    this.#main.innerHTML = markup;
  }

  addHandlerCountry(handler) {
    this.#main.addEventListener('click', function (e) {
      e.preventDefault();
      if (!e.target.closest('.country')) return;
      handler(e.target.closest('.country').dataset.country);
    });
  }
  //////////////////////////////////////////

  addHandlerBorder(handler) {
    this.#main
      .querySelector('.country-detail__borders')
      .addEventListener('click', function (e) {
        if (!e.target.closest('.btn-border')) return;
        handler(e.target.closest('.btn-border').dataset.border);
      });
  }

  /////////////////////////////////////////////

  addHandlerBack(handler) {
    this.#main
      .querySelector('.btn-back')
      .addEventListener('click', function (e) {
        e.preventDefault();
        handler();
      });
  }
}

export default new mainCl();
