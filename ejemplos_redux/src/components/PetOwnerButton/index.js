import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/petOwners';


const PetOwnerButton = ({ onClick, isHidden = false, onDelete, onCreate }) => {
    const [id, changeId] = useState('');
    const [name, changeName] = useState('');
    /*const idbyMe=7
    const namebyMe="Valentino"*/
    return (
        <Fragment>
            {
                !isHidden && (
                <Fragment>
                   {/* <input className='inputNormal'
                        type="text"
                        placeholder="Ingresar ID para eliminar "
                        value={id}
                        onChange={e => changeId(e.target.value)}
                />*/}
                    <button className='deleting-owner-button' onClick={() => onDelete(id)}>
                        {'Eliminar'}
                    </button>
                    {/*<input className='inputNormal'
                        type="text"
                        placeholder="Ingresar nombre para crear"
                        value={name}
                        onChange={e => changeName(e.target.value)}
            />*/}
                    <button className='creating-owner-button' onClick={() => onCreate(name)}>
                        {'Crear'}
                    </button>
                    <button className='all-pet-owners-button' onClick={onClick}>
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
        dispatch(actions.startAddingPetOwner("Sara"));
    },
    onDelete(id) {
        dispatch(actions.startRemovingPetOwner(4));
    },
  })
)(PetOwnerButton);