import './styles.css';
import DailyRecapForm from './components/DailyRecapForm';
import WebsocketInfoGrabber from './components/WebSocketInfoGrabber';
import React, {useState} from 'react';

export const generalContext            = React.createContext({});

function App() {
  const [message, setMessage] = useState({})
  
  const messageObj = {
    message, setMessage
  }


  return (
  <generalContext.Provider   value={messageObj} >
    <div className="Canvas">
      <DailyRecapForm />
      <WebsocketInfoGrabber />
    </div>
  </generalContext.Provider>
);
}

export default App;
