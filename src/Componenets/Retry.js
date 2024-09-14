import React, { useEffect } from 'react';
import './retry.css';

const Retry = ({ onRetry, inputRef }) => {
    const handleRetry = (e) => {
        if (e.key === ' ' && e.shiftKey) {
            e.preventDefault();
            onRetry();
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleRetry);

        return () => {
            window.removeEventListener('keydown', handleRetry);
        };
    }, []);

    return (
        <div className="retry-button-container">
            <button className="retry-button">
                Shift + Space to Retry
            </button>
        </div>
    );
};

export default Retry;
