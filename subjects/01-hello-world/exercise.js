////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - change the contents of the render function and save the file
// - see the updates automatically in your browser without refreshing!
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

const App = React.createClass({
  render() {
    return <div>Hello world!</div>
  }
})

render(<App/>, document.getElementById('app'))
