import React from 'react';
import './App.css';
import './web_components/Counter/counter';
import Counter from'./components/CounterHook';

function App() {
  return (
    <div className="App">
      <Counter/>
    </div>
  );
}

export default App;
