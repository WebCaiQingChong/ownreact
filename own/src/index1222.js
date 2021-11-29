/** @jsxRuntime classic */

import OReact from './OReact'
import './index.css';




/* @jsx OReact.createElement */
function Counter () {
  const [state, setState] = OReact.useState(1)

  return (
    <h1 onClick={() => setState(c => c + 1)}>
      Count: {state}
    </h1>
  )
}
// function App(props) {
//   return <h1> Hi {props.name}</h1>
// }
// const element = <div>
//   <h1>bar</h1>
//   <b>222</b>
// </div>

const element = <Counter></Counter>

const container = document.getElementById('root')
OReact.render(element, container);

