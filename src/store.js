import { combineReducers, applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";
import { USER_LOGOUT } from "./constants/auth";

const appReducer = combineReducers({
  //owner authentication
//   Authenticate: hotelOwnerAuthReducer,
//   LoginSignup: hotelOwnerLoginSignupReducer,
//   OwnerProfile: ownerProfileReducer,
  
});

//reset reducer
const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;