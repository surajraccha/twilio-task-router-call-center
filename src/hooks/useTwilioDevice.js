import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {setDevice} from '../redux/workerActions';
import ringTone from '../ring.mp3'; // Adjust the path based on your project structure

const API_URL = "https://twilio-call-center-service-3327.twil.io";

const useTwilioDevice = (clientId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const registerTwilioDevice = async (clientId) => {
      try {
        const tokenResponse = await fetch(`${API_URL}/get-client-token?clientId=${clientId}`);
        const response = await tokenResponse.json();

        const twilioDevice = new window.Twilio.Device(response.token, {
          codecPreferences: ['opus', 'pcmu'],
          enableRingingState: true,
          sounds: { incoming: ringTone },
        });

        twilioDevice.on('ready', () => {
          dispatch(setDevice(twilioDevice));
          console.log('Twilio.Device Ready!');
        });

        twilioDevice.on('error', (error) => {
          console.log('Twilio.Device Error: ' + error.message);
        });

        twilioDevice.on('connect', () => {
          console.log('Successfully established call!');
        });

        twilioDevice.on('disconnect', () => {
          console.log('Call ended.');
        });

        twilioDevice.on('incoming', (conn) => {
          console.log('Incoming connection from ' + conn.parameters.From);
          conn.accept();
          document.getElementById('button-answer').onclick = () => {
            conn.accept();
          };
        });

        // Dispatch actions or set state for the device
      } catch (error) {
        console.error('Error registering Twilio Device:', error);
      }
    };

    if (clientId) {
      registerTwilioDevice(clientId);
    } else {
      console.warn('Client ID not provided.');
    }
  }, [clientId, dispatch]);

  return null; // No rendering logic in custom hooks
};

export default useTwilioDevice;
