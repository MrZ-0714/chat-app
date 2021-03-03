import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import chatReducer from "./chat/chat.reducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  currentUser: userReducer,
  chatMessages: chatReducer,
});

export default persistReducer(persistConfig, rootReducer);
