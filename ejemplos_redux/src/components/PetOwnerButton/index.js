import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/petOwners';


const PetOwnerButton = ({ onClick, isHidden = false, onDelete, onCreate }) => {
    const [id, changeId] = useState('');
    const [name, changeName] = useState('');
    return (
        <Fragment>
            {
                !isHidden && (
                <Fragment>
                    <input className='inputNormal'
                        type="text"
                        placeholder="Ingresar ID para eliminar "
                        value={id}
                        onChange={e => changeId(e.target.value)}
                    />
                    <button className='delete-button' onClick={() => onDelete(id)}>
                        {'Eliminar'}
                    </button>
                    <input className='inputNormal'
                        type="text"
                        placeholder="Ingresar nombre para crear"
                        value={name}
                        onChange={e => changeName(e.target.value)}
                    />
                    <button className='create-button' onClick={() => onCreate(name)}>
                        {'Crear'}
                    </button>
                    <button className='pet-owners-button' onClick={onClick}>
                        {'Todos'}
                    </button>
                    
                    
                </Fragment>
                )
            }   
        </Fragment>
    );
}


export default connect(
  state => ({
    isHidden: !selectors.isAuthenticated(state),
  }),
  dispatch => ({
    onClick() {
      dispatch(actions.startFetchingPetOwners());
    },
    onCreate(name) {
        dispatch(actions.startAddingPetOwner(name));
    },
    onDelete(id) {
        dispatch(actions.startRemovingPetOwner(id));
    },
  })
)(PetOwnerButton);