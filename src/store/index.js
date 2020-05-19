import { createStore } from "redux";

const INITIAL_STATE = sessionStorage.getItem('list') ? JSON.parse(sessionStorage.getItem('list')) : [];

const appState = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case 'ADD':
      // payload === { id: 0, name: '..' };
      const addState = state.filter(item => item.id !== payload.id);
      state = [...addState, payload];
      sessionStorage.setItem('list', JSON.stringify(state));
      return state;
    case "REMOVE":
      // payload === { id: 0, name: '..' };
      const removeState = state.filter(item => item.id !== payload.id);
      state = removeState;
      sessionStorage.setItem('list', JSON.stringify(state));
      return state;
    default:
      return state;
  }
};

const store = createStore(appState);

export default store;
