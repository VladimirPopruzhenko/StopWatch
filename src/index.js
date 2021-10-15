import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './Buttons';
import ClockFace from "./ClockFace";
import reportWebVitals from './reportWebVitals';
import './index.css';


let timeFix = 0;
let Run = false;
const tick = () => {
  ReactDOM.render(
  <React.StrictMode>
    <ClockFace secondsSum={timeFix++}/>
    <div className='ButtonsInterface'>
      <Buttons id="StarOrStopBttn" name="Start/Stop"></Buttons>  
      <Buttons id="WaitBttn" name="Wait"></Buttons>
      <Buttons id="ResetBttn" name="Reset"></Buttons>
    </div>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ClockFace startOrStop={Run} secondsSum={timeFix++}/>
    <div className='ButtonsInterface'>
      <Buttons id="StarOrStopBttn" name="Start/Stop"></Buttons>  
      <Buttons id="WaitBttn" name="Wait"></Buttons>
      <Buttons id="ResetBttn" name="Reset"></Buttons>
    </div>
    </React.StrictMode>,
    document.getElementById('root')
);

let intervalId;
let startOrStop = document.getElementById('StarOrStopBttn');
startOrStop.addEventListener("click", function() {
  if(waitActive) {
    intervalId = setInterval(tick, 1000); 
    waitActive = false;
  } else if(intervalId == undefined) {
    timeFix = 0;
    intervalId = setInterval(tick, 1000); 
  } else {
    intervalId = clearInterval(intervalId);    
    timeFix = 0;
    tick();
  }
})

let waitActive = false;
let lastClick = 0;
let waitBttn = document.getElementById('WaitBttn');
waitBttn.addEventListener("click", function() {
  let click = (new Date()).getTime();
  if(click - lastClick < 300) {
    if (timeFix > 0 && intervalId != undefined) {
      intervalId = clearInterval(intervalId); 
      waitActive = true;  
    }
  }
  lastClick = click;
})

let resetBttn = document.getElementById('ResetBttn');
resetBttn.addEventListener("click", function() {
  timeFix = 0;
  if (waitActive) {
    intervalId = clearInterval(intervalId);  
    intervalId = setInterval(tick, 1000); 
  }
})

reportWebVitals();
