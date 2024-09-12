import React, { useState, useEffect, useRef } from 'react';
import './countDown.css';

function CountDown({ start, end, onCountdownComplete }) {
    const Ref = useRef(null);
    const [timer, setTimer] = useState("00:00:15");

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total,
            minutes,
            seconds,
        };
    };

    const startTimer = (e) => {
        let { total, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };

    const clearTimer = (e) => {
        setTimer("00:00:15");
        if (Ref.current) clearInterval(Ref.current);

        const id = setInterval(() => {
            let { total } = getTimeRemaining(e);
            if (total < 0) {
                clearInterval(id);
                onCountdownComplete();
            } else {
                startTimer(e);
            }
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 15);
        return deadline;
    };

    useEffect(() => {
        if (start && !end) {
            const deadline = getDeadTime();
            clearTimer(deadline);
            return () => {
                if (Ref.current) {
                    clearInterval(Ref.current);
                }
            };
        } else if (end && Ref.current) {
            clearInterval(Ref.current);
        }
    }, [start, end]);

    return (
        <div className={`timer ${start ? 'active' : ''} ${end ? 'finished' : ''}`}>
            <div className='timer-text'>
                <h2>{timer}</h2>
            </div>
        </div>
    );
}

export default CountDown;
