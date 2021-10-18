import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './Buttons';
import ClockFace from "./ClockFace";
import reportWebVitals from './reportWebVitals';
import './index.css';
import {takeWhile, fromEvent, interval, takeUntil} from 'rxjs';

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


const StartOrStop = document.getElementById('StarOrStopBttn');
let clickStartOrStop = fromEvent(StartOrStop, 'click', Run);
clickStartOrStop.subscribe(
  () => {
    const tick$ = interval(1000)
      .pipe(
        takeWhile(() => Run)
      );
    tick$.subscribe({ next: () => tick() })
    if(!Run) {
      Run = true
    } else { 
      timeFix = 0;
      takeUntil(() => tick$)
      tick();
      Run = false;
    }
  }
)

//let intervalId;
//let startOrStop = document.getElementById('StarOrStopBttn');
// startOrStop.addEventListener("click", 
// // function() {
//   //   if(waitActive) {
//   //     intervalId = setInterval(tick, 1000); 
//   //     waitActive = false;
//   //   } else if(intervalId == undefined) {
//   //     timeFix = 0;
//   //     intervalId = setInterval(tick, 1000); 
//   //   } else {
//   //     intervalId = clearInterval(intervalId);    
//   //     timeFix = 0;
//   //     tick();
//   //   }
//   // }
// )


let waitActive = false;
let lastClick = 0;
let waitBttn = fromEvent(document.getElementById('WaitBttn'), 'click', waitActive, Run);
waitBttn.subscribe(
  () => {
    let click = (new Date()).getTime();
    if(click - lastClick < 300) {
      if (timeFix > 0 && Run === true) {
        waitActive = true;  
        Run = false;
      }
    }
    lastClick = click;
  }
)

// let waitActive = false;
// let lastClick = 0;
// let waitBttn = document.getElementById('WaitBttn');
// waitBttn.addEventListener("click", function() {
//   let click = (new Date()).getTime();
//   if(click - lastClick < 300) {
//     if (timeFix > 0 && intervalId != undefined) {
//       intervalId = clearInterval(intervalId); 
//       waitActive = true;  
//     }
//   }
//   lastClick = click;
// })


let resetBttn = fromEvent(document.getElementById('ResetBttn'), 'click', waitActive);
resetBttn.subscribe(
  () => {
    timeFix = 0;
    const eventClick = new Event('click', { bubbles: true, cancelable: false });
    if (waitActive) {
      timeFix = 0;
      waitActive = false;      
      const tick$ = interval(1000)
        .pipe(
          takeWhile(() => Run)
        );
      tick$.subscribe({ next: () => tick() })
      if(!Run) {
        Run = true
      } else { 
        timeFix = 0;
        takeUntil(() => tick$)
        tick();
        Run = false;
      }
    }    
  }
)

// let resetBttn = document.getElementById('ResetBttn');
// resetBttn.addEventListener("click", function() {
//   timeFix = 0;
//   if (waitActive) {
//     intervalId = clearInterval(intervalId);  
//     intervalId = setInterval(tick, 1000); 
//   }
// })

reportWebVitals();
