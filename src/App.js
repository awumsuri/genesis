import React, { Component } from 'react';
import Chart from './app/components/Chart'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="chart-container">
        <Chart />
      </div>
    );
  }
}

export default App;
