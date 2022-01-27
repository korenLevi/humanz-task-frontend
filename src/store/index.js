import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { clientReducer,  } from './reducers/clientReducers'
// import {cartReducer} from './reducers/cartReducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const reducer = combineReducers({
    clientModule: clientReducer,
    // productDetails: productDetailsReducer,
    // cart: cartReducer
})


const initialState = {}
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    //   composeWithDevTools(applyMiddleware(...middleware))
    composeEnhancers(applyMiddleware(...middleware))
    // composeEnhancers(applyMiddleware(thunk))
)

export default store
