import Didact from './Didact-Hooks'

/** @jsx Didact.createElement */
function Counter() {
  const [counter, setCounter] = Didact.useState(0)
  return (
    <h1 onClick={() => setCounter(prev => prev + 1)}>
      Count: {counter}
    </h1>
  )
}

const container = document.getElementById("root");
Didact.render(<Counter />, container);