import React, { useEffect, useState, useRef, useContext } from 'react';
import { generalContext } from '../App.js';
import * as socketHandlers from './service-library/socketHandlers';

const WebsocketInfoGrabber = () => {
    const ws = useRef(null);
    const [status, setStatus] = useState("Disconnected");
    const hasConnectedBefore = useRef(false);
    const {message, setMessage} = useContext(generalContext)

    const [dataSetterObj] = useState({
        setMessage
    });


    useEffect(() => {
        if (message) {
            console.log('message: ', message);
            submitMessage(message)
        }
    }, [message]);
    
    const submitMessage = (message) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            const requestPayload = {
                service: 'socketHandlers',
                method: 'handleSubmitMessage',
                data: {message}
            };
            ws.current.send(JSON.stringify(requestPayload));
        }
    }

    const connectWebSocket = () => {
        ws.current = new WebSocket('wss://10.0.3.240:7000');

        ws.current.onopen = () => {
            setStatus("Connected");

            if (ws.current.readyState === WebSocket.OPEN && !hasConnectedBefore.current) {
                // do something on socket open
                hasConnectedBefore.current = true;
            }
        };

        ws.current.onerror = (error) => {
            console.error(`WebSocket Error: ${error}`);
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('socket returned data: ', data);
            if (data.service) {
                const handlerName = `handle${data.method}`;
                if (socketHandlers[handlerName]) {
                    socketHandlers[handlerName](data, dataSetterObj);
                } else {
                    console.warn(`Handler not found for service: ${data.service}, method: ${data.method}`);
                }
            }
        };

        ws.current.onclose = (event) => {
            if (event.wasClean) {
                setStatus(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
            } else {
                setStatus('Connection died');
                setTimeout(connectWebSocket, 2000);
            }
        };
    }

    useEffect(() => {
        connectWebSocket();
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    return (
        <></>
    );
}

export default WebsocketInfoGrabber;
