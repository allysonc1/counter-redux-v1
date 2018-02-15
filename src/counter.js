import React from 'react';

const Counter = (props) => {

    return (
        <div className="App">
            <p className="App-intro">
                <button onClick={props.decrement}> - </button>
                {props.count}
                <button onClick={props.increment}> + </button>
                <br />
                <button onClick={props.remove}> X </button>
            </p>
        </div>
    );
}

export default Counter;

