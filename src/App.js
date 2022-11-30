import { useEffect, useState } from 'react';
import './App.css';
import Die from './Die';
import {nanoid} from "nanoid";

// Extra Credt Features to Add
// 1. Put Real dots on the dice
// 2. Track the number of rolls
// 3. Track the time it took to win
// 4. Save best time or track to local storage.

// Solo Project
// Quizical App.
// Rquirements for Quizical App
// 1.) 2 screens (start & questions)
// 2.) Pull 5 question from OTDB API
// 3.) Tally correct answers after "check answers" is clicked
// 4.) Styled and Polished.



function App() {
  //react state to track dices
  const [dice, setDices] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0)

  useEffect(()=>{
    // check to see if all die is held
    const allHeld = dice.every(die => die.isHeld);
    // check to seel if all held die has the same value
    const sampleDie = dice[0].value;
    const allSameValue = dice.every(die => die.value === sampleDie);

    if(allHeld && allSameValue === true){
      setTenzies(true);
      console.log(`You won!!`)
    }
    console.log(`dice state changed ${allHeld}`);
  }, [dice]);
  
  function generateDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      key: nanoid(),
      isHeld: false  
    }
  }

    // function that returns an array of 10 random number
    function allNewDice (){
      const arrayElement = [];
      for (let i = 0; i < 10; i++){
          arrayElement.push(generateDie());
        }
        // console.log(arrayElement)
        return arrayElement;
    }

    // console.log(dice);
    const diceElements = dice.map( dies => <Die 
                                            value={dies.value} 
                                            key={dies.key} 
                                            isHeld={dies.isHeld}
                                            holdDice={() => holdDice(dies.key)}
                                            />
                                    )
    // console.log(diceElements)

    function holdDice(id){
      // console.log(id);
      // console.log(dice);
      // dice.map(
      //   (die)=>{
      //     die.key === id ? setDices(oldDies => { oldDies, isHeld: true} : oldDies)
      // )

      return setDices((oldDices)=>{
        return oldDices.map(oldDie => oldDie.key === id ? {...oldDie, isHeld: !oldDie.isHeld} : oldDie)
      })
    }

    function rollDice(){

      
      // old function
      // setDices(allNewDice());
     
     
      // New function
      // setDices((oldDices)=>{
      // //   // foreach of the items in the array if the item has isHeld don't change value
      // //   oldDices.map((die)=>{
      // //     if (die.isHeld){
      // //       return die;
      // //     }else{
      // //       return {
      // //         value: Math.ceil(Math.random() * 6),
      // //         key: nanoid(),
      // //         isHeld: false  
      // //       }
      // //     }
      // //   })
  
      //   return oldDices.map((die)=>{
      //     const newDie =  die.isHeld ? 
      //               die : 
      //             generateDie()
      //     console.log(newDie)    
      //     return newDie
      //   });
      // });

      if (tenzies){
        setDices(allNewDice());
        setTenzies(false)
      }else{
        setDices((oldDices)=>{
            return oldDices.map((die)=>{
              const newDie =  die.isHeld ? 
                        die : 
                      generateDie()
              // console.log(newDie)    
              return newDie
            });
          });
      }
      setCount((Oldcount) => Oldcount+ 1);
    }
    console.log(count);

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
              {tenzies ? "New Game" : "Roll"}
          </button>
      </main>
  );
}

export default App;
