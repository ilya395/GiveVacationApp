import InstanseFirebase from '../services/firebase';
import * as Eff from 'redux-saga/effects';
import { call, put } from "@redux-saga/core/effects";
import { errorSetVacation, successSetVacation, waitingSetVacation } from "../store/actions";
import { SET_VACATIONS } from "../store/actionsTypes";

const takeEvery: any = Eff.takeEvery;

const { auth, getUsersRef, getDepartmentsRef, getVacationsRef, getYearsRef } = InstanseFirebase;

function* workerSetVacation({ payload }: any): Generator<{}, any, Array<{}>> {
    try {
        // const state = yield select();
        // const data = yield state.defaultReducer.allVacations;
        yield put(waitingSetVacation());
        const result = yield call(() => {
            return getVacationsRef().set(payload);
        });
        yield put(successSetVacation(payload))
    } catch(e) {
        yield put(errorSetVacation());
    }
}

export function* watchSetVacation() {
    yield takeEvery(SET_VACATIONS, workerSetVacation)
}