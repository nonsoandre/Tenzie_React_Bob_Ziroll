import { useState } from 'react';
import './App.css';
import Die from './Die';
import {nanoid} from "nanoid";



function App() {
  //react state to track dices
  const [dice, setDices] = useState(allNewDice())

    // function that returns an array of 10 random number
    function allNewDice (){
      const arrayElement = [];
      for (let i = 0; i < 10; i++){
          arrayElement.push({
            value: Math.ceil(Math.random(i) * 6),
            key: nanoid(),
            isHeld: false  
          });
        }
        console.log(arrayElement)
        return arrayElement;
    }

    
    const diceElements = dice.map( dies => <Die 
                                            value={dies.value} 
                                            key={dies.key} 
                                            isHeld={dies.isHeld}
                                            holdDice={() => holdDice(dies.key)}
                                            />
                                    )

    function holdDice(id){
      console.log(id);
      console.log(dice);
      // dice.map(
      //   (die)=>{
      //     die.key === id ? setDices(oldDies => { oldDies, isHeld: true} : oldDies)
      // )

      return setDices((oldDices)=>{
        return oldDices.map(oldDie => oldDie.key === id ? {...oldDie, isHeld: !oldDie.isHeld} : oldDie)
      })
    }

    function rollDice(){
      setDices(allNewDice());
    }

    return (
      <main>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {diceElements}  
          </div>
          <button 
              className="roll-dice" 
              onClick={rollDice}
          >
              {/* {tenzies ? "New Game" : "Roll"} */} Roll
          </button>
      </main>
  );
}

export default App;
