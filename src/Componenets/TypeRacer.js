import React, { useState, useEffect, useRef } from 'react';
import './typeRacer.css';
import CountDown from './CountDown';
import Retry from './Retry';

const TypeRacer = ({ fact, onRetry }) => {
    const [startTime, setStartTime] = useState(null);
    const [keyList, setKeyList] = useState([]);
    const [factArray, setFactArray] = useState([]);
    const [inputColors, setInputColors] = useState([]);
    const [raceEnded, setRaceEnded] = useState(false);
    const [countDownStart, setCountDownStart] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [timerReset, setTimerReset] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        factToArray();
        inputRef.current.focus();
    }, [fact]);

    const factToArray = () => {
        if (factArray.length <= 0) {
            var array = fact.split('');
            setFactArray(array);
            setInputColors(Array(array.length).fill('gray'));
        }
    };

    const keyDown = (e) => {
        if (!raceEnded) {
            if (!startTime) {
                setCountDownStart(true);
                setStartTime((new Date()).getTime());
            }
            if (!(e.key === 'Shift') && !(e.key === 'Backspace') && !(e.key === 'Control') && !(e.key === 'Alt') && !(e.key === 'Escape') && !(e.key === 'Tab') && !(e.key === 'CapsLock')) {
                keyList.push(e.key);
                setInputValue((prevValue) => prevValue + e.key);
            } else if (e.key === 'Backspace') {
                if (keyList.length > 0) {
                    keyList.pop();
                    setInputValue((prevValue) => prevValue.slice(0, -1));
                }
            }
            compareArrays(factArray, keyList);
            raceEnd(factArray, keyList);
        }
    };


    const compareArrays = (factArray, keyList) => {
        const newInputColors = [...inputColors];
        for (let i = 0; i < factArray.length; i++) {
            if (keyList[i] === undefined) {
                newInputColors[i] = 'gray';
            } else if (factArray[i] !== keyList[i]) {
                newInputColors[i] = 'red';
            } else {
                newInputColors[i] = 'white';
            }
        }
        setInputColors(newInputColors);
    };

    const raceEnd = async (factArray, keyList) => {
        if (factArray.length === keyList.length) {
            await timeout(50);
            setRaceEnded(true);
        }
    };

    const timeout = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    };

    const calculateWordsPerMinute = () => {
        if (startTime) {
            const endTime = (new Date()).getTime();
            const elapsedMinutes = (endTime - startTime) / (60 * 1000);
            const wpm = (((keyList.length + 1) / 5) / elapsedMinutes) || 0;
            return wpm;
        }
        return 0;
    };

    const calculateAccuracy = () => {
        if (startTime) {
            let correctCount = 0;
            for (let i = 0; i < factArray.length; i++) {
                if (factArray[i] === keyList[i]) {
                    correctCount++;
                }
            }
            return (correctCount * 100) / factArray.length;
        }
        return 0;
    };

    const calculateInputWidth = () => {
        const characterWidth = 10;
        const minWidth = 200;
        return Math.max(fact.length * characterWidth, minWidth);
    };

    const handleTimer = () => {
        setRaceEnded(true);
    };

    const progress = (keyList.length / factArray.length) * 100;
    const wordsPerMinute = calculateWordsPerMinute();
    const accuracy = calculateAccuracy();

    const detailColorStyle = {
        color: raceEnded ? 'gray' : 'black',
    };

    const hadnleRetry = () => {
        setStartTime(null);
        setKeyList([]);
        setFactArray([]);
        setInputColors([]);
        setRaceEnded(false);
        setCountDownStart(false);
        setTimerReset(true);
        setInputValue('');
        onRetry();
        // factToArray();
        inputRef.current.focus();
    };

    return (
        <div>
            <CountDown start={countDownStart} end={raceEnded} onCountdownComplete={handleTimer} resetTimer={setTimerReset}/>
            <div className={`border-container ${raceEnded ? 'finished' : ''}`}>
                <div>
                    <p className='details'>
                        <label className="accuracy" style={detailColorStyle}>
                            Accuracy: {accuracy.toFixed(2)}%
                        </label>
                        <label className="wpm" style={detailColorStyle}>
                            WPM: {wordsPerMinute.toFixed(2)}
                        </label>
                    </p>
                </div>

                <div className='racer'>
                    {fact.split('').map((char, index) => (
                        <span key={index} className={inputColors[index] === 'white' ? 'correct' : (inputColors[index] === 'red' ? 'wrong' : '')}>
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                    <br />
                    <input
                        className='textField'
                        type="text"
                        ref={inputRef}
                        disabled={raceEnded}
                        onKeyDown={keyDown}
                        value={inputValue}
                        style={{ width: `${calculateInputWidth()}px` }}
                    />
                </div>
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <Retry onRetry={hadnleRetry} inputRef={inputRef}></Retry>
        </div>
    );
};

export default TypeRacer;
