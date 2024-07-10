import React, { useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../styles/Phone.css';

import Dialer from './Dialer';
import CallControls from './CallControls';
import IncomingCall from './IncomingCall';
import VolumeIndicators from './VolumeIndicators';
import Logs from './Logs';
import Chat from './Chat';

import { initializeDevice, makeOutgoingCall, acceptIncomingCall, 
    rejectIncomingCall, hangupIncomingCall, handleIncomingCall } from '../helpers/twilioUtils';


function Phone() {

    const [device, setDevice] = useState(null);
    const [call, setCall] = useState(null);
    const [logMessages, setLogMessages] = useState([]);
    const [incomingCall, setIncomingCall] = useState(null);
    const [userId] = useState('user1'); // Replace with actual user ID
    const [channelName] = useState('general'); // Replace with actual channel name

    const log = (message) => {
        setLogMessages((prevLogs) => [...prevLogs, message]);
    };

    useEffect(() => {
        // Handle device initialization here
        async function initializeTwilioDevice() {
            try {
                const handleIncomingCall = (incomingCall) => {
                    setIncomingCall(incomingCall);
                    log(`Incoming call from ${incomingCall.parameters.From}`);
                };
              const initializedDevice = await initializeDevice(handleIncomingCall);
              setDevice(initializedDevice);
            } catch (error) {
              console.error('Failed to initialize Twilio device', error);
            }
          }
      
        initializeTwilioDevice();
    }, []);

    return (
        <ResizableBox
            width={400}
            height={Infinity}
            minConstraints={[200, Infinity]}
            maxConstraints={[400, Infinity]}
            resizeHandles={['e']}
            axis="x"
            className="resizable-box"
        >
            <div style={{ height: '100%' }}>
                <main id="controls">
                    {!call? <Dialer device={device} setCall={setCall} log={log}/>:
                    <CallControls device={device} call={call} setCall={setCall} log={log} />}
                    {incomingCall?<IncomingCall call={incomingCall} acceptCall={acceptIncomingCall} rejectCall={rejectIncomingCall} hangupCall={hangupIncomingCall} />:null}
                    <VolumeIndicators call={call} />
                    <Logs messages={logMessages} />
                    <Chat userId={userId} channelName={channelName} />

                </main>
            </div>
        </ResizableBox>
    );
}

export default Phone;



