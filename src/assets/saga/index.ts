import { all } from 'redux-saga/effects';
import { watchDeleteVacation } from './watchDeleteVacation';
import { watchSetVacation } from './watchSetVacation';

export function* rootSaga() {
    yield all([
        watchDeleteVacation(),
        watchSetVacation()
    ]);
}