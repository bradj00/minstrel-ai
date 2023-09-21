import React, { useState, useContext } from 'react';
import { generalContext } from '../App.js';
import '../styles.css';

const DailyRecapForm = () => {
    const [feeling, setFeeling] = useState('');
    const [workedOn, setWorkedOn] = useState('');
    const [goals, setGoals] = useState('');
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const { message, setMessage } = useContext(generalContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!feeling || !workedOn || !goals) {
            if (submitAttempted) {
                submitData();
            } else {
                setSubmitAttempted(true);
            }
        } else {
            submitData();
        }
    };

    const submitData = () => {
        const recapData = {
            feeling,
            workedOn,
            goals,
        };

        // Set the message context variable
        setMessage(recapData);
        console.log("Set message context variable to:", recapData);

        setFeeling('');
        setWorkedOn('');
        setGoals('');
        setSubmissionMessage('Data recorded. Thank you!');
    };

    return (
        <div className="mobileContainer">
            <div className="title">Daily Recap</div>
            <form onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label className="label">Today I'm feeling:</label>
                    <textarea 
                        value={feeling} 
                        onChange={(e) => setFeeling(e.target.value)} 
                        className={`input ${submitAttempted && !feeling ? 'warning' : 'textInput'}`}
                    />
                </div>

                <div className="inputGroup">
                    <label className="label">Today I worked on:</label>
                    <textarea 
                        value={workedOn} 
                        onChange={(e) => setWorkedOn(e.target.value)} 
                        className={`input ${submitAttempted && !workedOn ? 'warning' : 'textInput'}`}
                    />
                </div>

                <div className="inputGroup">
                    <label className="label">Goals to declare today:</label>
                    <textarea 
                        value={goals} 
                        onChange={(e) => setGoals(e.target.value)} 
                        className={`input ${submitAttempted && !goals ? 'warning' : 'textInput'}`}
                    />
                </div>

                {submitAttempted && (!feeling || !workedOn || !goals) && 
                    <div className="warningText">You've left some fields blank. Press "Submit Anyway" if you wish to proceed.</div>
                }
                <button type="submit" className="button">{submitAttempted ? 'Submit Anyway' : 'Submit'}</button>
                {submissionMessage && <div className="submissionMessage">{submissionMessage}</div>}
            </form>
        </div>
    );
};

export default DailyRecapForm;