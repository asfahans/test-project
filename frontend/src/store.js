import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
//
import {
  ticketListReducer,
  ticketDetailsReducer,
  ticketReplyCreateReducer,
  // ticketCreateReducer,
} from './reducers/ticketReducers';

import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const reducer = combineReducers({
  ticketList: ticketListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  ticketDetails: ticketDetailsReducer,
  ticketReplyCreate: ticketReplyCreateReducer,
  // ticketCreate: ticketCreateReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
