import { createStore } from 'redux';
import InstanseFirebase from '../services/firebase';

const initialState = {
    allDepartments: [],
    allUsers: [],
    allVacations: [],
    allYears: [],    
}

function defaultReducer(state = initialState, action) {

    const { auth, getUsersRef, getDepartmentsRef, getVacationsRef, getYearsRef } = InstanseFirebase;

    switch (action.type) {
        case ('ADD_ALL_DEPARTMENTS'):
            const instansWithDepartments = {...state};
            instansWithDepartments.allDepartments = action.payload;
            return instansWithDepartments;

        case ('ADD_ALL_VACATIONS'):
            const instansWithVacations = {...state};
            instansWithVacations.allVacations = action.payload;
            return instansWithVacations;

        case ('ADD_ALL_USERS'):
            const instansWithUsers = {...state};
            instansWithUsers.allUsers = action.payload;
            return instansWithUsers;

        case ('DELETE_THIS_VACATION'):
            const instansWithoutDeletedVacation = {...state};
            const result = instansWithoutDeletedVacation.allVacations.filter(item => +item.id !== +action.payload);
            instansWithoutDeletedVacation.allVacations = result;
            getVacationsRef().set(result);
            return instansWithoutDeletedVacation;

        case ('SET_VACATIONS'):
            const instansWithNewVacations = {...state};
            instansWithNewVacations.allVacations = action.payload;
            getVacationsRef().set(instansWithNewVacations.allVacations);
            return instansWithNewVacations;

        case ('ADD_ALL_YEARS'):
            const instansWithAllYears = {...state};
            instansWithAllYears.allYears = action.payload;
            return instansWithAllYears;

        case ('ADD_THIS_USER'):
            const instansWithThisUser = {...state};
            instansWithThisUser.thisUser = action.payload;
            return instansWithThisUser;        

        default:
            return state;
    }
}

const store = createStore(defaultReducer);

export default store;