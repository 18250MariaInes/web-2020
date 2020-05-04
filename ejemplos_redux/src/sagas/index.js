import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from './auth';
import { watchSayHappyBirthday } from './happyBirthday';
import {watchFetchPetOwner, watchAddPetOwner, watchRemovePetOwner } from './petOwners'


function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchSayHappyBirthday),
    fork(watchFetchPetOwner),
    fork(watchAddPetOwner),
    fork(watchRemovePetOwner)
    
  ]);
}


export default mainSaga;
