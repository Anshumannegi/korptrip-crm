import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error("Error loading state:", e);
    return undefined;
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    localStorage.setItem("authState", JSON.stringify(state));
  } catch (e) {
    console.error("Error saving state:", e);
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: { auth: loadState() }, // Load persisted state
});

// Subscribe to store changes and persist state
store.subscribe(() => {
  saveState(store.getState().auth);
});

export default store;
