import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';


/*
My state should look like this:

{
    counters: [
        {
        count: 0
        }
    ]
}

My actions will be: 

{ type: 'ADD_COUNTER' }
{ type: 'REMOVE_COUNTER}
{ type: 'INCREMENT', payload: 0 }
{ type: 'DECREMENT', payload: 0 }

*/

// ACTIONS

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ADD_COUNTER = 'ADD_COUNTER';
const REMOVE_COUNTER = 'REMOVE_COUNTER';


// make up an index name to pass in - arrayIndex
const actionIncrement = (arrayIndex) => {
    return { type: INCREMENT, payload: arrayIndex }
}

const actionDecrement = (arrayIndex) => {
    return {
        type: DECREMENT, payload: arrayIndex
    }
}

const actionAddCounter = () => {
    return { type: ADD_COUNTER}
};

const actionRemoveCounter = (arrayIndex) => {
    return { type: REMOVE_COUNTER, payload: arrayIndex }
};

const initialState = {
    counters: [
        {
            count: 0
        }
    ]
};


// REDUCER

const counters = (state, action) => {
    if (state === undefined) {
        return initialState;

    }

    switch (action.type) {
        
        case ADD_COUNTER:
            return {
                // return a new array with a new counter ( an object with a state ) added
                counters: state.counters.concat({
                    count: 0
                })
            }
        case REMOVE_COUNTER:
            return {
                // remove a counter and return a new version of the state object
                counters: state.counters.filter( (c, i) => {
                    // return (i !== action.payload);
                    if (i !== action.payload) {
                        return true;
                    }else{
                        return false;
                    }
                })
            }
        case 'DECREMENT':
            return {

                    counters: state.counters.map( (c, i) => {
                        if (i === action.payload){
                            return {
                                count: c.count - 1
                            }
                        }else{
                            return c;
                        }
                    })

            }
        case 'INCREMENT':
            return {
                counters: state.counters.map((c, i) => {
                    if (i === action.payload) {
                        return {
                            count: c.count + 1
                        }
                    } else {
                        return c;
                    }
                })
            }
        default:
            return state;
    }
}



// // CREATE A STORE, passing it our reducer

const store = createStore(counters,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


// c is for count, i is the index into the counters array
// return the react component to put into the array of counters

const createCounterComponents = () => {
    return store.getState().counters.map( (c, i) => {
        return (
            <App
                addbutton={() => {
                    store.dispatch(actionAddCounter(i))
                }}
                count={c.count}
                increment={() => {
                    // anon fn will call store.dispatch which will call obj actionIncrement
                    // i is the index into the map of counters
                    store.dispatch(actionIncrement(i))
                }}
                decrement={() => {
                    store.dispatch(actionDecrement(i))
                }}
                remove={ () => {
                    store.dispatch(actionRemoveCounter(i))
                }}
            />
        );

    });
}

// // debugger;
// register a change listener
store.subscribe(() => {
    console.log(`You changed the state `);
    ReactDOM.render(
        <div>
        <button className="add-counter-button" onClick={ () => {
            store.dispatch(actionAddCounter())
        } }> Add Counter
        </button>
            {createCounterComponents()}
        </div>
       , document.getElementById('root'));
    registerServiceWorker();
});


// initial draw to screen
ReactDOM.render(
    <div>
        {createCounterComponents()}
    </div>
     , document.getElementById('root'));
registerServiceWorker();
