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

  if (saveData) helperAddAction(true, model.state.countryData);

  mainView.addHandlerBack(controlBack);
  mainView.addHandlerBorder(controlCountryDetail);
};

const controlInitialRender = async function (fetchData = true) {
  if (fetchData) {
    await model.fetchCountriesData();
    helperAddAction(false, model.state.countriesData);
  }
  mainView.renderInitial();

  mainView.renderCountries(model.state.countriesData);

  mainView.addHandlerToggleSearchDropdown(controlToggleSearchDropdown);
  mainView.addHandlerFilterByName(controlFilterByName);
  mainView.addHandlerFilterByRegion(controlFilterByRegion);
  mainView.addHandlerCountry(controlCountryDetail);
};

function controlBack() {
  console.log(model.state.actions, model.state.actions.length);
  // removing last element of action
  model.state.actions.pop();
  console.log(model.state.actions);

  const previousAction = model.state.actions[model.state.actions.length - 1];

  if (previousAction?.checkBoolean) {
    controlCountryDetail(previousAction.actionData.alpha3Code, false);
  }
  if (!previousAction?.checkBoolean) {
    controlInitialRender(false);
  }
  console.log(model.state.actions);
}

const init = function () {
  controlInitialRender();

  toggleModeView.addHandlerToggleMode(controlChangeMode);
};
init();
