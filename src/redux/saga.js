import { put, takeLatest, all, call } from 'redux-saga/effects';
import {API} from "../api";
import {authorize_request, authorize_success, get_groups_request, get_groups_success} from "../constants/actions";

function* getGroups() {
    const response = yield call(API.getGroups);
    yield put({ type: get_groups_success, response: response});
}

function* authorize({payload}) {
    const response = yield call(API.authorize, payload);
    yield put({ type: authorize_success, response: response});
}

export default function* rootSaga() {
   yield all([
       yield takeLatest(get_groups_request, getGroups),
       yield takeLatest(authorize_request, authorize),
   ]);
}