import ReactDom from 'react-dom'
// import 'index.css'

let memoized = []
let cursor = 0
function useState (initailState) {
  memoized[cursor] = memoized[cursor] || initailState
  const currentcursor = cursor
  function setState(newState) {
    memoized[currentcursor] = newState
    render()
  }

  return [memoized[cursor++], setState]
}

function useEffect (cb, deps) {
  const hasNoDeps = !deps
  const _deps = memoized[cursor]
  const hasChangeDeps = _deps ? !deps.every((el, i) => el === _deps[i]) : true

  if (hasNoDeps || hasChangeDeps) {
    cb()
    memoized[cursor] = deps
  }
  cursor++
}
function App() {
  let [count, setCount] = useState(0)
  let [name, setName] = useState(100)
  console.log(memoized)

  useEffect(() => {
    console.log('count change')
  }, [count])
  useEffect(() => {
    console.log('name change')
  }, [name])
  return (
    <>
    <div className="app" >
      click {count} times.
      <button onClick={() => setCount(++count)}>+1</button>
    </div>
    <div>
      click anothers {name}
      <button onClick={() => setName(--name)}>-1</button>
    </div>
    </>
  );
}

function render () {
  cursor = 0
  ReactDom.render(<App />, document.getElementById('root'))
}


render()

