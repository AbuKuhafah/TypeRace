import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './typeRacer.css'
import CountDown from './CountDown';
const TypeRacer = ({ fact }) => {

    const [startTime, setStartTime] = useState(null);

    const [keyList, setKeyList] = useState([]);

    const [factArray, setFactArray] = useState([]);
    const [inputColors, setInputColors] = useState([]);

    const [raceEnded, setRaceEnded] = useState(false);

    const [countDownStart, setCountDownStart] = useState(false);


    const inputRef = useRef(null);

    useEffect(() => {
        factToArray();
        inputRef.current.focus();
    }, [fact]);
    

    const factToArray = () => {
        if (factArray.length <= 0) {
            var array = fact.split('');
            console.log("array: " + array)
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
            } else if (e.key === 'Backspace') {
                if (keyList.length > 0) {
                    keyList.pop();

                    if (inputColors[keyList.length] === 'red') {
                        const newInputColors = [...inputColors];
                        newInputColors[keyList.length] = 'white';
                        setInputColors(newInputColors);
                    }
                }
            }
            compareArrays(factArray, keyList);
            raceEnd(factArray, keyList);
        }


    };

    const keyUp = (e) => {
        const keyUpTime = (new Date()).getTime();
    };


    const compareArrays = (factArray, keyList) => {
        const newInputColors = [...inputColors];
        for (let i = 0; i < factArray.length; i++) {
            if (keyList[i] === undefined) {
                newInputColors[i] = 'gray';
            } else if (factArray[i] !== keyList[i]) {
                console.log("wrong key at " + keyList[i]);
                newInputColors[i] = 'red';
            } else {
                newInputColors[i] = 'white';

            }
        }
        setInputColors(newInputColors);
    };

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const raceEnd = async (factArray, keyList) => {
        if (factArray.length === keyList.length) {
            await timeout(50);
            setRaceEnded(true);
        }
    }

    const calculateWordsPerMinute = () => {
        if (startTime) {
            const endTime = (new Date()).getTime();
            const elapsedMinutes = (endTime - startTime) / (60 * 1000);
            const wpm = (((keyList.length + 1) / 5) / elapsedMinutes) || 0;
            return wpm;
        }
        return 0;
    };

    const calculateInputWidth = () => {
        const characterWidth = 10;
        const minWidth = 200;
        const width = Math.max(fact.length * characterWidth, minWidth);
        return width;
    };

    const calculateAccuracy = () => {

        if (startTime) {
            let count = 0;
            for (let i = 0; i < factArray.length; i++) {
                if (factArray[i] === keyList[i]) {
                    count++;
                }
            }

            const accuracy = (count * 100) / keyList.length;
            return accuracy;
        }
        return 0;

    }

    const handleTimer = () => {
        setRaceEnded(true);
    }

    const detailColorStyle = {
        color: raceEnded ? 'white' : 'gray',
    };

    const wordsPerMinute = calculateWordsPerMinute();
    const accuracy = calculateAccuracy();



    return (
        <div>
            <CountDown start={countDownStart} end={raceEnded} onCountdownComplete={handleTimer}></CountDown>
            <div className='border-container'>
                <div>
                    <p className='details'>
                        <label className="accuracy"
                            style={detailColorStyle}
                        > Accuracy: {accuracy.toFixed(2)}</label>
                        <label className="wpm"
                            style={detailColorStyle}
                        >WPM: {wordsPerMinute.toFixed(2)}</label>
                    </p>
                </div>

                <div className='racer'>
                    {fact.split('').map((char, index) => (
                        <span key={index} style={{ color: inputColors[index] }}>
                            {char}
                        </span>
                    ))}
                    <br />
                    <input
                        className='textField'
                        type="text"
                        ref={inputRef}
                        disabled={raceEnded}
                        onKeyDown={(e) => keyDown(e)}
                        onKeyUp={() => keyUp()}

                        style={{
                            width: `${calculateInputWidth()}px`,

                        }}
                    />

                </div>


            </div>
        </div>

    )
}

export default TypeRacer