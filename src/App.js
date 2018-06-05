import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Chart from './chart'

class App extends Component {
  constructor(props) {
    super(props)
    this.refChart = React.createRef()
  }

  componentDidMount() {
    this.chart = new Chart({
      target: this.refChart.current
    })
    const data = [1, 0, 3, 2, 5, 4, 7, 6, 9, 8]
    this.chart.render(data)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <svg ref={this.refChart} />
      </div>
    )
  }
}

export default App
