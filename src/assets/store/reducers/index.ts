import { combineReducers } from "redux";
import { defaultReducer } from "./defaultReducer";
import { deleteVacationReducer } from './deleteVacationreducer';
import { setVacationReducer } from './setVacationReducer';

export const rootReducer = combineReducers({
    defaultReducer,
    // allVacations: deleteVacationReducer.allVacations,
    deleteVacationReducer,
    setVacationReducer,
});