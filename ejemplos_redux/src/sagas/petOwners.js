import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    //delay,
    select,
  } from 'redux-saga/effects';


  import * as selectors from '../reducers';
  import * as actions from '../actions/petOwners';
  import * as types from '../types/petOwners';
import uuid from 'uuid';


const API_BASE_URL = 'http://localhost:8000/api/v1';

function* fetchPetOwners(action){
    try{
        const isAuth=yield select (selectors.isAuthenticated)

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/owners/`,
                {
                    method: 'GET',
                    //body: JSON.stringify({}),
                    headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`,
                    },
                }
            );

            if (response.status===200){
                const owners = yield response.json();
                let entities = {}
                let order = [];

                owners.map( owner => {
                    entities = {
                        ...entities, 
                        [owner.id]: owner
                    }
                    order = [
                        ...order, 
                        owner.id
                    ]
                });
                console.log(owners)
                yield put(actions.completeFetchingPetOwners(entities, order));
            }else{
                const { non_field_errors } = yield response.json();
                yield put(actions.failFetchingPetOwners(non_field_errors[0]));
            }
        }

    }catch(error){
        console.log(error)
        yield put(actions.failFetchingPetOwners('Algo malo pasó al fetchear'));
    }
}

function* addPetOwner(action){
    try{
        //const { oldId, petOwner } = action.payload
        const isAuth=yield select (selectors.isAuthenticated)
        if (isAuth){
            const token = yield select(selectors.getAuthToken);
            const petOwner=action.payload
            const response = yield call(
                fetch,
                `${API_BASE_URL}/owners/`,
                    {
                    method: 'POST',
                    body: JSON.stringify({ name: petOwner }),
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );
            if (response.status === 201) {
                let id=uuid()
                const nOwner = yield response.json();
                yield put(actions.completeAddingPetOwner(id, nOwner));

                console.log('The owner was added: ', nOwner)


            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failAddingPetOwner(non_field_errors[0]));
            }
        }

    }catch(error){
        console.log(error)
        yield put(actions.failAddingPetOwner('Algo malo pasó al agregar'));
    }
    
}

function* removePetOwner(action){
    const { id } = action.payload
    
    try{
        const isAuth=yield select (selectors.isAuthenticated)
        if (isAuth){
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/owners/${id}`,
                    {
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );
            if (response.status===200){
                yield put(actions.completeRemovingPetOwner());
                console.log('Deleted owner: ', id)
            }else{
                const { non_field_errors } = yield response.json();
                yield put(actions.failRemovingPetOwner(non_field_errors[0]));
            }
        }


    }catch(error){
        console.log(error)
        yield put(actions.failRemovingPetOwner('Algo salió mal al eliminar'));
    }
}



//funciones watch

export function* watchFetchPetOwner() {
    yield takeEvery(
      types.PET_OWNERS_FETCH_STARTED,
      fetchPetOwners,
    );
  }

  export function* watchAddPetOwner() {
    yield takeEvery(
      types.PET_OWNER_ADD_STARTED,
      addPetOwner,
    );
  }

  export function* watchRemovePetOwner() {
    yield takeEvery(
      types.PET_OWNER_REMOVE_STARTED,
      removePetOwner,
    );
  }