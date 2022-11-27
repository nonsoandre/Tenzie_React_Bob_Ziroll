import logo from './logo.svg';
import './App.css';

function App() {
    return (
      <main>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {/* {diceElements} */}
          </div>
          <button 
              className="roll-dice" 
              // onClick={rollDice}
          >
              {/* {tenzies ? "New Game" : "Roll"} */} Roll
          </button>
      </main>
  );
}

export default App;
