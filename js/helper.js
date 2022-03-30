import { state } from './model';

export const helperAddAction = function (checkBoolean, actionData) {
  state.actions.push({
    checkBoolean: checkBoolean,
    actionData: actionData,
  });
};

export const helperClearAction = function () {
  state.actions = [];
};
