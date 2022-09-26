import React from 'react';
import { useState, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {
  
    const [time, setTime] = useState(0)
    const [status, setStatus] = useState('off');
    const [timer, setTimer] = useState(null);

    let seconds = ("0" + (Math.floor((time / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((time / 60000) %60)).slice(-2);

    const playBell = () => {
      const bell = new Audio('./sounds/bell.wav');
      bell.play();
    };

    const startTimer = () => {
      setTime(1200000);
      setStatus('work')

      setTimer(setInterval(() => {
        setTime(time => time - 10)
      }, 10))
    }

    useEffect(() => {
      if(time === 0 && status !== 'off') {
        playBell();
        if (status === 'work') {
          setStatus('rest');
          setTime(20000);
        } else {
          setStatus('work');
          setTime(1200000);
        }
      }
    }, [time])

    const quit = () => {
      window.close();
    };

    const stopTimer = () => {
      setTimer(null);
      setTime(null);
      setStatus('off')
      clearInterval(timer);
    }

    return (
      <div>
        <h1>Protect your eyes</h1>
        { status === 'off' && <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>}
        { status === 'work' && <img src="./images/work.png" /> }
        { status === 'rest' && <img src="./images/rest.png" /> }
        { status !== 'off' && <div className="timer"> 
          {minutes}:{seconds}
        </div> }
        { status === 'off' && 
          <button className="btn"
            onClick={startTimer}
          >Start</button> }
        { status !== 'off' &&
          <button className="btn"
            onClick={stopTimer}
          >Stop</button> }
        <button className="btn btn-close" 
            onClick={quit}
          >X</button>
      </div>
    )
}

render(<App />, document.querySelector('#app'));
