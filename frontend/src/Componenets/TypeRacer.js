import React, { useState, useEffect, useRef } from 'react';
import './typeRacer.css';
import CountDown from './CountDown';
import Retry from './Retry';
import { saveRace } from '../data/repo';
import Leaderboard from './LeaderBoard';

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
    const [totalKeyPresses, setTotalKeyPresses] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [finalAccuracy, setFinalAccuracy] = useState(0);
    const [finalWPM, setFinalWPM] = useState(0);
    const [retryChecker, setRetryChecker] = useState(false)

    useEffect(() => {
        factToArray();
        inputRef.current.focus();
    }, [fact]);

    const factToArray = async () => {
        let array = fact.split('');
        setFactArray(array);
        setInputColors(Array(array.length).fill('gray'));
    };

    const keyDown = (e) => {
        if (!raceEnded) {
            if (!startTime) {
                setCountDownStart(true);
                setStartTime((new Date()).getTime());
                setRetryChecker(false);
            }
            if (!(e.key === 'Shift') && !(e.key === 'Backspace') && !(e.key === 'Control') && !(e.key === 'Alt') && !(e.key === 'Escape') && !(e.key === 'Tab') && !(e.key === 'CapsLock')) {
                keyList.push(e.key);
                setTotalKeyPresses(totalKeyPresses + 1);
                setInputValue((prevValue) => prevValue + e.key);
            } else if (e.key === 'Backspace') {
                if (keyList.length > 0) {
                    keyList.pop();
                    setTotalKeyPresses(totalKeyPresses - 1);
                    setInputValue((prevValue) => prevValue.slice(0, -1));
                }
            }
            compareArrays(factArray, keyList);
            getNewFact(factArray, keyList);
        }
    };

    const compareArrays = (factArray, keyList) => {
        const newInputColors = [...inputColors];
        let newCorrectCount = correctCount;

        for (let i = 0; i < factArray.length; i++) {
            if (keyList[i] === undefined) {
                newInputColors[i] = 'gray';
            } else if (factArray[i] !== keyList[i]) {
                if (inputColors[i] === 'white') {
                    newCorrectCount--;
                }
                newInputColors[i] = 'red';
            } else {
                if (inputColors[i] !== 'white') {
                    newCorrectCount++;
                }
                newInputColors[i] = 'white';
            }
        }
        setCorrectCount(newCorrectCount);
        setInputColors(newInputColors);
    };

    const getNewFact = async (factArray, keyList) => {
        if (factArray.length === keyList.length) {
            await timeout(50);
            setKeyList([]);
            onRetry();
            setFactArray([]);
            setInputColors([]);
            factToArray();
            setInputValue('');
        }
    };

    const timeout = (delay) => {
        return new Promise((res) => setTimeout(res, delay));
    };

    const calculateWordsPerMinute = () => {
        if (startTime) {
            const endTime = (new Date()).getTime();
            const elapsedMinutes = (endTime - startTime) / (60 * 1000);
            const wpm = (totalKeyPresses / 5) / elapsedMinutes || 0;
            // setFinalWPM(wpm)
            return wpm;
        }
        return 0;
    };

    const calculateAccuracy = () => {
        if (totalKeyPresses > 0) {
            let acc = (correctCount * 100) / totalKeyPresses;
            // setFinalAccuracy(acc)
            return acc;
        }
        return 0;
    };

    const calculateInputWidth = () => {
        const characterWidth = 10;
        const minWidth = 200;
        return Math.max(fact.length * characterWidth, minWidth);
    };

    

    const progress = (keyList.length / factArray.length) * 100;
    const wordsPerMinute = calculateWordsPerMinute();
    const accuracy = calculateAccuracy();
    if(raceEnded){
       saveRace(accuracy, wordsPerMinute);
    }
    
    const detailColorStyle = {
        color: raceEnded ? 'gray' : 'black',
    };

    const handleTimer = () => {
        setRaceEnded(true);
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
        setTotalKeyPresses(0);
        setCorrectCount(0);
        setRetryChecker(true);
        onRetry();
        inputRef.current.focus();
    };

    return (
        <div>
            <Leaderboard retryCheck={retryChecker}/>
            <CountDown start={countDownStart} end={raceEnded} onCountdownComplete={handleTimer} resetTimer={setTimerReset} />
            <div className={`border-container ${raceEnded ? 'finished' : ''}`}>
                <div>
                    <p className="details">
                        <label className="accuracy" style={detailColorStyle}>
                            Accuracy: {accuracy.toFixed(2)}%
                        </label>
                        <label className="wpm" style={detailColorStyle}>
                            WPM: {wordsPerMinute.toFixed(2)}
                        </label>
                    </p>
                </div>

                <div className="racer">
                    {fact.split('').map((char, index) => (
                        <span key={index} className={inputColors[index] === 'white' ? 'correct' : inputColors[index] === 'red' ? 'wrong' : ''}>
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                    <br />
                    <input
                        className="textField"
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
