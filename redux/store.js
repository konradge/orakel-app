import { createStore } from "redux";
import throttle from "lodash.throttle";
import redux from "../redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultLists } from "../components/Custom/defaultValues";

const STORE_NAME = "@oracle-app";

export function prepareStore() {
  const store = createStore(redux);
  store.subscribe(() => {
    saveState({
      lists: store.getState().lists,
      settings: store.getState().settings,
    });
  });
  store.subscribe(
    throttle(() => {
      saveState({
        lists: store.getState().lists,
        settings: store.getState().settings,
      });
    }, 1000)
  );
  return store;
}

// Loads the state from the async storage
export const loadState = async () => {
  try {
    const serializedState = JSON.parse(await AsyncStorage.getItem(STORE_NAME));
    if (serializedState == null) {
      return defaultLists;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

// Saves a redux-state to the async storage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    AsyncStorage.setItem(STORE_NAME, JSON.stringify(serializedState));
  } catch (err) {
    console.error(err);
  }
};

export const clear = () => {
  AsyncStorage.removeItem(STORE_NAME);
};
