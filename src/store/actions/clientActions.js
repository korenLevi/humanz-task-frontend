import { clientService } from '../../services/clientService'
import {
  CLIENT_ADD,
  CLIENT_REMOVE,
  CLIENT_SET,
  CLIENT_UPDATE
} from '../constants/clientConstants'

export const loadClients = (filterBy) => async (dispatch, getState) => {
  try {
    const clients = await clientService.filter(filterBy)
    dispatch({ type: CLIENT_SET, payload: clients })
  } catch (error) {
    console.log(error)
  }
}

export const removeClient = (id) => async (dispatch,getState) => {
  console.log(id);
  try{
    await clientService.removeClientById(id)
    dispatch({type:CLIENT_REMOVE, payload: id })
  }catch(error){
    console.log(error)
  }
}

export const saveClient = (clientToSave) => async (dispatch,getState) => {
  try{
    const newClient = await clientService.saveClient(clientToSave)
    clientToSave._id ? dispatch({type: CLIENT_UPDATE, payload: clientToSave}) : 
    dispatch({type: CLIENT_ADD, payload: newClient}) 
  }catch(error){
    console.log(error);
  }
} 
export const updateClient = (clientToSave) => async (dispatch,getState) => {
  try{
    await clientService.saveClient(clientToSave)
    dispatch({type: CLIENT_UPDATE, payload: clientToSave})
  }catch(error){
    console.log(error);
  }
} 