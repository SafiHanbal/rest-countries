import { helperAddAction, helperClearAction } from './helper';
import * as model from './model';
import mainView from './View/mainView';
import toggleModeView from './View/toggleModeView';

const controlChangeMode = function () {
  toggleModeView.toggleMode(
    model.state.darkModeColors,
    model.state.lightModeColors
  );
};

const controlToggleSearchDropdown = function () {
  mainView.toggleSearchDropdown();
};

const controlFilterByName = function () {
  mainView.filterByName(model.state.countriesData);
};

const controlFilterByRegion = function (e) {
  mainView.filterByRegion(model.state.countriesData, e);
};

const controlCountryDetail = function (countryCode, saveData = true) {
  const countryData = mainView.filterCountry(
    model.state.countriesData,
    countryCode
  );
  model.state.countryData = countryData;
  mainView.renderCountryDetails(
    model.state.countryData,
    model.state.countriesData
  );

  if (saveData) {
    console.log(true);
    helperAddAction(model.state.countryData);
  }

  mainView.addHandlerBack(controlBack);
  mainView.addHandlerBorder(controlCountryDetail);
};

const controlInitialRender = async function (fetchData = true) {
  if (fetchData) {
    await model.fetchCountriesData();
    helperAddAction(model.state.countriesData);
  }
  mainView.renderInitial();

  mainView.renderCountries(model.state.countriesData);

  mainView.addHandlerToggleSearchDropdown(controlToggleSearchDropdown);
  mainView.addHandlerFilterByName(controlFilterByName);
  mainView.addHandlerFilterByRegion(controlFilterByRegion);
  mainView.addHandlerCountry(controlCountryDetail);
};

function controlBack() {
  console.log(model.state.actions);
  if (model.state.curAction <= 2) {
    location.reload();
  } else {
    // removing last element of action
    model.state.actions.pop();

    controlCountryDetail(
      model.state.actions[model.state.curAction - 2].alpha3Code,
      false
    );
    model.state.curAction--;
  }
  console.log(model.state.curAction);
}

const init = function () {
  controlInitialRender();

  toggleModeView.addHandlerToggleMode(controlChangeMode);
};
init();
