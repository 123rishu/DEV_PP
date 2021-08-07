import shopReducer from "./Shopping/shopping-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    shop: shopReducer,
})

export default rootReducer;