import { ERROR_SET_VACATION, WAITING_SET_VACATION, SUCCESS_SET_VACATION } from "../actionsTypes";

const initialState = {
    waiting: false,
    error: false,
    allVacations: null,
}

type InitialStateType = typeof initialState;

type SetVacationReducerActionType = {
    type: typeof WAITING_SET_VACATION
        | typeof ERROR_SET_VACATION
        | typeof SUCCESS_SET_VACATION
    payload: Array<{}>
}

export const setVacationReducer = (state: InitialStateType = initialState, action: SetVacationReducerActionType ) => {
    switch (action.type) {
        case WAITING_SET_VACATION:
            return {
                ...state,
                waiting: true,
                error: false
            }

        case ERROR_SET_VACATION:
            return {
                ...state,
                waiting: false,
                error: true
            }
    
        case SUCCESS_SET_VACATION:
            return {
                ...state,
                waiting: false,
                error: false,
                payload: action.payload
            }

        default:
            return state;
    }
}