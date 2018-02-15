import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from 'redux';


/*
My state should look like this:

{
    count: 0
}

My actions will be: 

{ type: 'INCREMENT' }
{ type: 'DECREMENT' }

*/

// ACTIONS

const actionIncrement = () => {
    return { type: 'INCREMENT' }
}

const actionDecrement = () => {
    return {
        type: 'DECREMENT'
    }
}

const initialState = {
    extraButtons: 0,
    count: 0
};

// const stateOfExtraButtons = {
//     extraButtons: 0
// };


// REDUCER

const counter = (state, action) => {
    if (state === undefined) {
        return initialState;

    }

    switch (action.type) {
        case 'DECREMENT':
            return {
                count: state.count - 1
            }
        case 'INCREMENT':
            return {
                count: state.count + 1
            }
        default:
            return state;
    }
}

// REDUCER FOR EXTRA BUTTONS

const extraButtonCounter = (state, action) => {
    if (state === undefined) {
        return initialState;

    }

    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.extraButtons + 1
            }
        default:
            return state;
    }
}

// const rootReducer = combineReducers({counter})

// CREATE A STORE, passing it our reducer

const store = createStore(counter);

// debugger;

store.subscribe(() => {
    console.log(`You changed the state and the state is now: ${store.getState().count}`);
    ReactDOM.render(
        <App
            count={store.getState().count}
            increment={() => {
                store.dispatch(actionIncrement())
            }}
            decrement={() => {
                store.dispatch(actionDecrement())
            }}
        />, document.getElementById('root'));
    registerServiceWorker();
});

ReactDOM.render(
    <App
     count={store.getState().count}
     increment={() => {
         store.dispatch(actionIncrement())
     }}
     decrement={ () => {
         store.dispatch(actionDecrement())
     }}
     />, document.getElementById('root'));
registerServiceWorker();
