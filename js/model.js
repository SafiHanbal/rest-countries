export const state = {
  lightModeColors: new Map([
    ['--color-element', '#fff'],
    ['--color-background', '#f0f0f0'],
    ['--color-input', '#858585'],
    ['--color-text', '#111517'],
    ['--color-shimmer', '#d4d4d4'],
  ]),
  darkModeColors: new Map([
    ['--color-element', '#2b3945'],
    ['--color-background', '#202c37'],
    ['--color-input', '#2b3945'],
    ['--color-text', '#fff'],
    ['--color-shimmer', '#4a5d6d'],
  ]),
  countriesData: [],
  countryData: [],
  actions: [],
  curAction: 0,
};

export const fetchCountriesData = async function () {
  const response = await fetch(`https://restcountries.com/v2/all`);
  const data = await response.json();

  state.countriesData = data.sort(() => {
    const randomTrueOrFalse = Math.random() > 0.5;
    return randomTrueOrFalse ? 1 : -1;
  });
};
