import Didact from './Didact-FC'

/** @jsx Didact.createElement */
const element = (
  <div style="background: salmon">
    <h1>Hello World</h1>
    <h2 style="text-align:right">from Didact</h2>
  </div>
);

function App(props) {
  return (
    <div style="background: salmon">
      <h1>Hello {props.name}</h1>
      <h2 style="text-align:right">from Didact FC</h2>
    </div>
  );
}

const container = document.getElementById("root");
Didact.render(<App name='developer' />, container);