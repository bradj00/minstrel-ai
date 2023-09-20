import React, { useState, useRef } from 'react';
import '../styles.css';

const DailyRecapForm = () => {
    const [feeling, setFeeling] = useState('');
    const [workedOn, setWorkedOn] = useState('');
    const [goals, setGoals] = useState('');
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const feelingRef = useRef(null);
    const workedOnRef = useRef(null);
    const goalsRef = useRef(null);

    const handleSubmit = async (e) => {
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

    const submitData = async () => {
        const recapData = {
            feeling,
            workedOn,
            goals,
        };

        // POST the data to a fake REST API endpoint
        try {
            const response = await fetch('https://fakeapi.com/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recapData),
            });

            if (response.ok) {
                setFeeling('');
                setWorkedOn('');
                setGoals('');
                setSubmissionMessage('Submitted. Thank you!');
            } else {
                setSubmissionMessage('Failed to submit. Please try again.');
            }
        } catch (error) {
            setSubmissionMessage('Error occurred. Please try again.');
        }
    };

    return (
        <div className="mobileContainer">
            <div className="title">Daily Recap</div>

            <form onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label className="label">Today I'm feeling:</label>
                    <textarea 
                        ref={feelingRef}
                        value={feeling} 
                        onChange={(e) => setFeeling(e.target.value)} 
                        className={`input ${submitAttempted && !feeling ? 'warning' : 'textInput'}`}
                    />
                    
                </div>

                <div className="inputGroup">
                    <label className="label">Today I worked on:</label>
                    <textarea 
                        ref={workedOnRef}
                        value={workedOn} 
                        onChange={(e) => setWorkedOn(e.target.value)} 
                        className={`input ${submitAttempted && !workedOn ? 'warning' : 'textInput'}`}
                    />
                    
                </div>

                <div className="inputGroup">
                    <label className="label">Goals to declare today:</label>
                    <textarea 
                        ref={goalsRef}
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
