/** @jsxRuntime classic */

import OReact from './OReact'
import './index.css';




/* @jsx OReact.createElement */
const element = <div>
  <h1>bar</h1>
  <b>222</b>
</div>

const container = document.getElementById('root')
OReact.render(element, container);

