import React, { useEffect, useState } from 'react';
import './App.css';
import Die from './Die';
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';

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
  const [isPlaying, setIsPlaying] = useState(false);
  


  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [startTimer, setStartTimer] = useState(false)
  const [finishTime, setFinishTime ] = useState(JSON.parse(localStorage.getItem('time')) || [])


  const getBestTime = () => {
    const secArr = finishTime.map(time => time.sec);
    const minArr = finishTime.map(time => time.min);
    const min = Math.min(...minArr)
    const sec = Math.min(...secArr)
    console.log(secArr)
    console.log(Math.min(...secArr))
    return {
      min,
      sec
    }
  }

  getBestTime()

  useEffect(() => {
    let interval = null;

    if(startTimer === true){
         if(seconds > 59){
            setSeconds(0)
            setMinutes(h => h + 1)
         }else{
            interval = setInterval(()=> {
                setSeconds(m => m + 1)
              }, 1000)
         }
    }

  return () => clearInterval(interval)
  }, [seconds, startTimer])



// SET LS BUCHI
  useEffect(()=> {
    localStorage.setItem('time', JSON.stringify(finishTime))  
  }, [finishTime])

  // SAVE TIME GAME FINISHED
  const handleSetFinishTime = (min, sec)=> {
    setTimeout(() => {
      setFinishTime(prev => [...prev, {min, sec}])
    }, 1000)
  }

  // RESTART TIME FUNCTIONALITY
  const handleRestartTime = () => {
    setMinutes(0);
    setSeconds(0)
    setStartTimer(true)
  }


  function handleStart(){
    if(isPlaying){
    
      resetTime();
    }
  }

  function resetTime(){
    setTimeout(()=>{
      setIsPlaying(false)
    }, 1)
  }

 
  
  useEffect(()=>{

    // check to see if all die is held
    const allHeld = dice.every(die => die.isHeld);
    // check to seel if all held die has the same value
    const sampleDie = dice[0].value;
    const allSameValue = dice.every(die => die.value === sampleDie);

    if(allHeld && allSameValue === true){
      setTenzies(true);
      setIsPlaying(true);
      console.log('won')
      setStartTimer(false);
      handleSetFinishTime(minutes, seconds)
    }
  }, [dice, minutes, seconds]);
  
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
        // RESET TIME AND GAME BUCHI
      handleRestartTime()

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
      // RESET TIME AND GAME BUCHI
      handleRestartTime()
    }

    function startGame(){
      setDices(allNewDice());
      setNewGame(false);
      // START TIME BUCHI
      setStartTimer(true)

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
              <p>Best Score : {`${getBestTime().min <= 9 ? '0' : ''}${getBestTime().min}:${getBestTime().sec <= 9 ? '0' : ''}${getBestTime().sec}`}</p>
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
              <h2>You have won in {`${minutes <= 9 ? '0' : ''}${minutes}:${seconds <= 9 ? '0' : ''}${seconds}`}</h2>
              <br></br>
              <p>Best Score : {`${getBestTime().min <= 9 ? '0' : ''}${getBestTime().min}:${getBestTime().sec <= 9 ? '0' : ''}${getBestTime().sec}`}</p>
              <button 
                    className="roll-dice" 
                    onClick={rollDice}
                >
                  New Game
                </button>
            </div>
          :
            <div className='row'>
              <div className="TimerBox">
              {`${minutes <= 9 ? '0' : ''}${minutes}:${seconds <= 9 ? '0' : ''}${seconds}`}
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
