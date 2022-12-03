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
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [stopTime, setStopTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  let sec, msec, min;

  const [s, setS] = useState("00")
  const [ms, setMs] = useState("00")
  const [m, setM] = useState("")

  console.log("start-time: " + startTime)
  console.log("elapsed-time: " + elapsedTime);
  console.log("actual-time: " + time);


  function handleStart(){
    if(isPlaying){
    
      resetTime();
    }else{

      playTime();
    }
  }

  function resetTime(){
    setTimeout(()=>{
      setIsPlaying(false)
      setTime(null)
      setStopTime(0)
      setS("00")
      setMs("00")
      setM("")
    }, 1)
  }

  function playTime(){
    setTimeout(()=>{
      // set how much time has gone so far
      setElapsedTime(Date.now() - startTime);
      // console.log(elapsedTime)
      
      // set the time
      setTime(stopTime + elapsedTime);
      // console.log(time);

      // timer components
      
      // set seconds handle
      sec = Math.floor(time/1000%60)
      if(sec < 10) setS("0" + sec)
      else setS(sec)
      
      // set msec handle
      msec = Math.floor(time/10%100)
      if(msec < 10) setMs("0" + msec)
      else setMs(msec)
      
      // set minute handle
      if(s == 0 && ms == 1){
        min = Math.floor(time/60000)
        if(min > 0) setM(min + ":")
      }

    }, 1)
  }




console.log(sec);
console.log(isPlaying);

  
  
  useEffect(()=>{

    // check to see if all die is held
    const allHeld = dice.every(die => die.isHeld);
    // check to seel if all held die has the same value
    const sampleDie = dice[0].value;
    const allSameValue = dice.every(die => die.value === sampleDie);

    if(allHeld && allSameValue === true){
      setTenzies(true);
      setIsPlaying(true);
    }
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
      // dice.map(
      //   (die)=>{
      //     die.key === id ? setDices(oldDies => { oldDies, isHeld: true} : oldDies)
      // )

      return setDices((oldDices)=>{
        return oldDices.map(oldDie => oldDie.key === id ? {...oldDie, isHeld: !oldDie.isHeld} : oldDie)
      })
    }

    function rollDice(){
      if (tenzies){
        setDices(allNewDice());
        setTenzies(false);
        setCount(- 1);
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
      setDices(allNewDice(resetTime()));
      setTenzies(false);
      setCount(0);
      
    }

    function startGame(){
      setDices(allNewDice());
      setNewGame(false);

    }

    if(!newGame){
      handleStart();
    }
    


    return (
      <main>
        {
         newGame ?
            <div className='row'>
              <h1 className="title">Play Tenzies</h1>
              <p className="instructions">Roll until all dice are the same. 
              Click each die to freeze it at its current value between rolls.</p>
              {/* <h2>-</h2> */}
              <br></br>
              <button 
                    className="roll-dice" 
                    onClick={startGame}
                >
                  Start
              </button>
              <input id="startBtn" type="checkbox"/>
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
              <Timer   />
              <div className="TimerBox">
                { m + s }
              </div>
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
