import { useEffect, useState } from "react"



function Timer() {
  const [isPlaying, setIsPlaying] = useState(false)
  // time
  const [startTime, setStartTime] = useState(Date.now())
  const [elapsedTime, setElapsedTime] = useState(0)
  const [stopTime, setStopTime] = useState(0)
  const [time, setTime] = useState(null)
  let sec, msec, min
  const [s, setS] = useState("00")
  const [ms, setMs] = useState("00")
  const [m, setM] = useState("")
  // laps
  const [laps, setLaps] = useState([])


  
  function handleStart(){
    // onPause
    if(isPlaying){
      setIsPlaying(false)
      setStopTime(time)
    }
    // onPlay
    else{
      setIsPlaying(true)
      setStartTime(Date.now())
      playTime()
    }
  }

  function playTime(){
    setTimeout(()=>{
      // set elapset time
      setElapsedTime(Date.now() - startTime)
      // set time
      setTime(stopTime + elapsedTime)
      // set sec
      sec = Math.floor(time/1000%60)
      if(sec < 10) setS("0" + sec)
      else setS(sec)
      // set msec
      msec = Math.floor(time/10%100)
      if(msec < 10) setMs("0" + msec)
      else setMs(msec)
      // set min
      if(s == 0 && ms == 1){
        min = Math.floor(time/60000)
        if(min > 0) setM(min + ":")
      }
    }, 1)
  }

  useEffect(()=>{
    if(document.body.querySelector('#startBtn').checked) playTime()
  }, [time])

  function resetTime(){
    document.body.querySelector('#startBtn').checked = false
    setTimeout(()=>{
      setIsPlaying(false)
      setTime(null)
      setStopTime(0)
      setS("00")
      setMs("00")
      setM("")
      setLaps([])
    }, 1)
  }

  function lap(){
    setLaps(["#" + (laps.length + 1) + " " + m + s + "." + ms, ...laps])
  }


  return (
    <div className="stopwatch">
      <div className="stopwatch-cont">

        {/* Laps List */}
        <div className="laps">{
          laps.map((lap)=>(
            <div key={lap}>{lap}</div>
          ))
        }</div>

        {/* Time Container */}
        <div className="time-cont">
          <div className="time">
            <div>{ m + s + "." + ms }</div>
          </div>
        </div>

        {/* Navigation */}
        <nav>
          <div id="resetBtn" onClick={resetTime}></div>
          <input id="startBtn" type="checkbox" />
          <label htmlFor="startBtn" onClick={handleStart}>
            <div className="play"></div>
            <div className="pause"></div>
          </label>
          <div id="lapBtn" onClick={lap}></div>
        </nav>

      </div>
    </div>
  )
}

export default Timer