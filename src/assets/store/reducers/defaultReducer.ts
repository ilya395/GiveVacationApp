import InstanseFirebase from '../../services/firebase';
import { 
    ADD_ALL_DEPARTMENTS, 
    ADD_ALL_USERS, 
    ADD_ALL_VACATIONS, 
    ADD_ALL_YEARS, 
    ADD_THIS_USER, 
    DELETE_THIS_VACATION, 
    SET_VACATIONS 
} from '../actionsTypes';

const initialState = {
    allDepartments: [],
    allUsers: [],
    allVacations: [],
    allYears: [],    
}

type InitialStateType = typeof initialState;

type ActionType = {
    type: typeof ADD_ALL_DEPARTMENTS 
        | typeof ADD_ALL_USERS
        | typeof ADD_ALL_VACATIONS
        | typeof ADD_ALL_YEARS
        | typeof ADD_THIS_USER
        | typeof DELETE_THIS_VACATION
        | typeof SET_VACATIONS
    payload: any // ?
}

export function defaultReducer(state: InitialStateType = initialState, action: ActionType) {

    const { auth, getUsersRef, getDepartmentsRef, getVacationsRef, getYearsRef } = InstanseFirebase;

    switch (action.type) {
        case ADD_ALL_DEPARTMENTS:
            return {
                ...state,
                allDepartments: action.payload
            }

        case ADD_ALL_VACATIONS:
            return {
                ...state,
                allVacations: action.payload
            }

        case ADD_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            }

        // case (DELETE_THIS_VACATION):
        //     const instansWithoutDeletedVacation = {...state};
        //     const result = instansWithoutDeletedVacation.allVacations.filter(item => +item.id !== +action.payload);
        //     instansWithoutDeletedVacation.allVacations = result;
        //     getVacationsRef().set(result);
        //     return instansWithoutDeletedVacation;

        // case SET_VACATIONS:
        //     const instansWithNewVacations = {...state};
        //     instansWithNewVacations.allVacations = action.payload;
        //     getVacationsRef().set(instansWithNewVacations.allVacations);
        //     return instansWithNewVacations;

        case ADD_ALL_YEARS:
            return {
                ...state,
                allYears: action.payload
            }

        case ADD_THIS_USER:
            return {
                ...state,
                thisUser: action.payload
            }       

        default:
            return state;
    }
}