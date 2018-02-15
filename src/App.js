import React, { Component } from 'react';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <button className="add-counter-button" onClick={this.props.addbutton}> Add Counter </button>
        <p className="App-intro">
          <button onClick={this.props.decrement}> - </button>
          {this.props.count}
          <button onClick = {this.props.increment}> + </button>
          <br />
          <button onClick={this.props.remove}> X </button>
        </p>
      </div>
    );
  }
}

export default App;
