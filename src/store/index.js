import { createStore } from "redux";

const storage = sessionStorage.getItem("storage");

const INITIAL_STATE = (storage && JSON.parse(storage)) || [];

const reducer = (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
    case "SET_ITEM":
      if (state.some((i) => i.id === data.id)) {
        sessionStorage.setItem(
          "storage",
          JSON.stringify(
            state.map((i) => (i.id === data.id ? { ...i, ...data } : i))
          )
        );
        return state.map((i) => (i.id === data.id ? { ...i, ...data } : i));
      }
      sessionStorage.setItem("storage", JSON.stringify([...state, data]));
      return [...state, data];
    case "REMOVE_ITEM":
      sessionStorage.setItem(
        "storage",
        JSON.stringify(state.filter((i) => i.id !== data.id))
      );
      return state.filter((i) => i.id !== data.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
