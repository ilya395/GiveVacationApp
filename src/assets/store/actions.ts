import { 
    DELETE_THIS_VACATION, 
    ERROR_DELETE_VACATION, 
    ERROR_SET_VACATION, 
    SET_VACATIONS, 
    SUCCESS_DELETE_VACATION, 
    WAITING_DELETE_VACATION, 
    WAITING_SET_VACATION,
    SUCCESS_SET_VACATION
} from "./actionsTypes"

// delete this vacation
type DeleteVacationActionType = <T>(id: T) => {
    type: typeof DELETE_THIS_VACATION
    id: T
}
export const deleteVacation: DeleteVacationActionType = (id) => {
    return {
        type: DELETE_THIS_VACATION,
        id
    }
}
type ErrorDeleteVacationActionType = () => {
    type: typeof ERROR_DELETE_VACATION
}
export const errorDeleteVacation: ErrorDeleteVacationActionType = () => {
    return {
        type: ERROR_DELETE_VACATION
    }
}
type WaitingDeleteVacationActionType = () => {
    type: typeof WAITING_DELETE_VACATION
}
export const waitingDeleteVacation: WaitingDeleteVacationActionType = () => {
    return {
        type: WAITING_DELETE_VACATION
    }
}
type SuccessDeleteVacationActionType = <T>(payload: T) => {
    type: typeof SUCCESS_DELETE_VACATION,
    payload: T
}
export const successDeleteVacation: SuccessDeleteVacationActionType = (payload) => {
    return {
        type: SUCCESS_DELETE_VACATION,
        payload
    }
}

// set vacation 
type SetVacationActionType = <T>(payload: T) => {
    type: typeof SET_VACATIONS
    payload: T
}
export const setVacation: SetVacationActionType = (payload) => {
    return {
        type: SET_VACATIONS,
        payload
    }
}

type ErrorSetVacationActionType = () => {
    type: typeof ERROR_SET_VACATION
}
export const errorSetVacation: ErrorSetVacationActionType = () => {
    return {
        type: ERROR_SET_VACATION
    }
}

type WaitingSetvacationActionType = () => {
    type: typeof WAITING_SET_VACATION
}
export const waitingSetVacation: WaitingSetvacationActionType = () => {
    return {
        type: WAITING_SET_VACATION
    }
}

type SuccessSetVacationActionType = <T>(payload: T) => {
    type: typeof SUCCESS_SET_VACATION
    payload: T
}
export const successSetVacation: SuccessSetVacationActionType = (payload) => {
    return {
        type: SUCCESS_SET_VACATION,
        payload
    }
}