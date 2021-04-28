import { call, put, select } from "redux-saga/effects";
import * as Eff from "redux-saga/effects";
import { errorDeleteVacation, successDeleteVacation, waitingDeleteVacation } from "../store/actions";
import { DELETE_THIS_VACATION } from "../store/actionsTypes";
import InstanseFirebase from '../services/firebase';

const takeEvery: any = Eff.takeEvery;

const { getVacationsRef } = InstanseFirebase;

type AllVacationsType = Array<{id: string | number}>

type StateType = {
    defaultReducer: {
        allVacations: AllVacationsType
    }
    // allVacations: AllVacationsType
}

function* workerForDeleteVacation({ id }: {id: number}): Generator<{}, void, StateType> { // Array<{}> -> AllVacationsType
    try {
        const state: StateType = yield select();
        const data: any = yield state.defaultReducer.allVacations; // || state.allVacations;
        const result = yield data.filter((item: {id: string | number}) => +item.id !== +id)
        yield put(waitingDeleteVacation());
        const request = yield call(() => {
            return getVacationsRef().set(result)
        });
        yield put(successDeleteVacation(result));
    } catch(e) {
        yield put(errorDeleteVacation())
    }
}

export function* watchDeleteVacation() {
    yield takeEvery(DELETE_THIS_VACATION, workerForDeleteVacation);
}