import { state } from './model';

export const helperAddAction = function (actionData) {
  state.actions.push(actionData);
  state.curAction++;
  console.log(state.curAction);
};

export const helperClearAction = function () {
  state.actions = [];
};
