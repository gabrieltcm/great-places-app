import React from "react";

//Redux
import { createStore, combineReducers, applyMiddleware } from "redux"; //applyMiddleWare to apply Redux Thunk
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk"; //to handle async codes in Redux

//Reducer
import placesReducer from "./store/places-reducer";

//Navigator
import PlacesNavigator from "./navigation/PlacesNavigator";

//Sqlite database
import { init } from "./database/db";

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log(err);
  });

const rootReducer = combineReducers({
  placesReducer: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
