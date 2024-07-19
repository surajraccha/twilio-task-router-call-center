import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {setDevice,setConnection} from '../redux/workerActions';
import ringTone from '../ring.mp3'; // Adjust the path based on your project structure

const API_URL = "https://twilio-call-center-testing-7786.twil.io";

const useTwilioDevice = (clientId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const registerTwilioDevice = async (clientId) => {
      try {
        const tokenResponse = await fetch(`${API_URL}/get-client-token?clientId=${clientId}`);
        const response = await tokenResponse.json();

        const twilioDevice = new window.Twilio.Device(response.token, {
          edge: 'ashburn',
          codecPreferences: ['opus', 'pcmu'],
          enableRingingState: true
        });

        if(!twilioDevice){
          alert("Failed to create twilio device!");
        }

        twilioDevice.on('ready', () => {
          dispatch(setDevice(twilioDevice));
          console.log('Twilio.Device Ready!');
        });

        twilioDevice.on('registered', device => {
          console.log('The device is ready to receive incoming calls.')
        });

        twilioDevice.audio.setInputDevice('default').then(() => {
          console.log('Success!');
        });

        twilioDevice.on('error', (error) => {
          alert('Twilio.Device Error: ' + error.message);
          console.log('Twilio.Device Error: ' + error.message);
        });

        twilioDevice.on('connect', () => {
          console.log('Successfully established call!');
        });

        twilioDevice.on('disconnect', () => {
          console.log('Call ended.');
        });

        twilioDevice.on('incoming', (call) => {
          console.log('Incoming connection from ' + call.parameters.From);
          call.accept();
          dispatch(setConnection(call));
          // document.getElementById('button-answer').onclick = () => {
          //   conn.accept();
          // };
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
