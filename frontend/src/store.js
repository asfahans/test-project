import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
//
import {
  ticketListReducer,
  ticketMyListReducer,
  ticketAllListReducer,
  ticketDetailsReducer,
  ticketReplyCreateReducer,
  ticketCreateReducer,
  ticketDeleteReducer,
  ticketCloseReducer,
  ticketReplyApprovedReducer,
  ticketReplyDisapprovedReducer,
} from './reducers/ticketReducers';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';

import { vesselListReducer } from './reducers/vesselReducers';

const reducer = combineReducers({
  ticketList: ticketListReducer,
  ticketMyList: ticketMyListReducer,
  ticketAllList: ticketAllListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  ticketDetails: ticketDetailsReducer,
  ticketReplyCreate: ticketReplyCreateReducer,
  ticketCreate: ticketCreateReducer,
  ticketDelete: ticketDeleteReducer,
  ticketClose: ticketCloseReducer,
  ticketReplyApproved: ticketReplyApprovedReducer,
  ticketReplyDisapproved: ticketReplyDisapprovedReducer,
  vesselList: vesselListReducer,
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
