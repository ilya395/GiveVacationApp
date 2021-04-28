import { ERROR_DELETE_VACATION, SUCCESS_DELETE_VACATION, WAITING_DELETE_VACATION } from "../actionsTypes";

const initialState = {
    waiting: false,
    error: false,
    allVacations: null as Array<{}> | null,
}

type InitialStateType = typeof initialState;

type ActionType = {
    type: typeof WAITING_DELETE_VACATION 
        | typeof ERROR_DELETE_VACATION
        | typeof SUCCESS_DELETE_VACATION
    payload: Array<{}>
}

export const deleteVacationReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case WAITING_DELETE_VACATION:
            return {
                ...state,
                waiting: true,
                error: false,
            }

        case ERROR_DELETE_VACATION:
            return {
                ...state,
                waiting: false,
                error: true,
            }

        case SUCCESS_DELETE_VACATION:
            return {
                ...state,
                waiting: false,
                error: false,
                allVacations: action.payload
            }
    
        default:
            return state;
    }
}