import { useEffect, useState } from 'react';
import './App.css';
import Die from './Die';
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';
import Timer from "./Timer";

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
  const [count, setCount] = useState(0);
  const [newGame, setNewGame] = useState(true);
  const [timeCount, settimeCount] = useState(Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))

  useEffect(()=>{
    // check to see if all die is held
    const allHeld = dice.every(die => die.isHeld);
    // check to seel if all held die has the same value
    const sampleDie = dice[0].value;
    const allSameValue = dice.every(die => die.value === sampleDie);

    if(allHeld && allSameValue === true){
      setTenzies(true);
      // console.log(`You won!!`)
    }
    // console.log(`dice state changed ${allHeld}`);
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
        setTenzies(false);
        setCount(- 1);
        const mostRecentDate = new Date().getTime();
        settimeCount(Math.floor(mostRecentDate / (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));

        // setTimeout(() => {
          
        // const millis = Date.now() - start;
        
        //   console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
        //   // expected output: seconds elapsed = 2
        // }, 2000);
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

    function reset(){
      setDices(allNewDice());
      setTenzies(false);
      setCount(0);
    }

    function startGame(){
      setDices(allNewDice());
      setNewGame(false);
    }
    
    
    if(tenzies && newGame){
      console.log("Finished Game Display");
    } else if (!tenzies && !newGame){
      console.log("In Game Display")
    }else {
      console.log("Fresh Game Display")
    }

    console.log(count);
    console.log("tenzies: " + tenzies);
    console.log("NewGame: " + newGame);

    if (newGame){

    }else{
      console.log("fronPage")
    }

    return (
      <main>
        {
         newGame ?
            <div className='row'>
              <h1 className="title">Play Tenzies</h1>
              <h2>-</h2>
              <br></br>
              <button 
                    className="roll-dice" 
                    onClick={startGame}
                >
                  Start
              </button>
            </div>          
            :

            tenzies ? 
            <div className='row'>
              {tenzies && <Confetti />}
              <h1 className="title">Congratulations!</h1>
              <h2>You have won</h2>
              <br></br>
              <button 
                    className="roll-dice" 
                    onClick={rollDice}
                >
                  New Game
                </button>
            </div>
          :
            <div className='row'>
              <Timer />
              {/* <h1 className="title in-game-title">Tenzies</h1> */}
              {/* <p className="instructions">Roll until all dice are the same. 
              Click each die to freeze it at its current value between rolls.</p> */}
              { tenzies && <p><b>Total Rolls: {count}</b></p>}
              <div className="dice-container">
                  {diceElements}  
              </div>
              <button 
                  className="roll-dice" 
                  onClick={rollDice}
              >
                  {tenzies ? "New Game" : "Roll"}
              </button>
              <button 
                  className={tenzies ? "display-off" : 'reset-btn'}
                  onClick={reset}
                >
                  Reset
              </button>
              
            </div>

        }
      </main>
  );
}

export default App;
