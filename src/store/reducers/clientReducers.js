import {
  CLIENT_ADD,
  CLIENT_REMOVE,
  CLIENT_SET,
  CLIENT_UPDATE,
} from '../constants/clientConstants'

export const clientReducer = (state = { clients: [] }, action) => {
  switch (action.type) {
    case CLIENT_SET:
      return {
        ...state,
        clients: [...action.payload],
      }
    case CLIENT_ADD:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      }
    case CLIENT_REMOVE:
      return {
        ...state,
        clients: state.clients.filter(
          (client) => client._id !== action.payload
        ),
      }
    case CLIENT_UPDATE:
      return {
        ...state,
        clients: state.clients.map((client) =>
          client._id === action.payload._id ? action.payload : client
        ),
      }
    default:
      return state
  }
}
