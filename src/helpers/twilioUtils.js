import { Device } from '@twilio/voice-sdk';
import { Client as ChatClient } from '@twilio/conversations';

let token;
let chatToken;
let device;
let chatClient;

export function initializeDevice(handleIncomingCall) {
  return new Promise((resolve, reject) => {
    console.log("Requesting Access Token...");

    fetch("http://localhost:5000/token")
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch token');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Got a token: ");
        token = data.token;
        console.log("Initializing device");
        device = new Device(token, {
          logLevel: 1,
          codecPreferences: ["opus", "pcmu"],
        });

        // Device must be registered in order to receive incoming calls
        device.register();
        device.on("incoming", handleIncomingCall);

        resolve(device); // Resolve with the device after initialization
      })
      .catch(error => {
        console.error('Failed to initialize device', error);
        reject(error);
      });
  });
}


export async function makeOutgoingCall(device, phoneNumber, log) {
  var params = { To: phoneNumber };
  if (device) {
    console.log(`Attempting to call ${params.To} ...`);
    const call = await device.connect({ params });
    console.log('Call in progress ...');
    return call;
  } else {
    console.log('Unable to make call.');
    return null;
  }
}

export function acceptIncomingCall(call) {
  call.accept();
}

export function rejectIncomingCall(call) {
  call.reject();
}

export function hangupIncomingCall(call) {
  call.disconnect();
}

export function handleIncomingCall(call, log) {
  log(`Incoming call from ${call.parameters.From}`);
  return call;
}


export async function initializeChat(userId, handleNewMessage) {
  try {
    const response = await fetch(`http://localhost:5000/token?identity=${userId}`);
    const data = await response.json();
    chatToken = data.token;

    chatClient = new ChatClient(chatToken);
    
    chatClient.on('messageAdded', (message) => {
      handleNewMessage(message);
    });

    console.log('Twilio Chat client initialized.');
  } catch (err) {
    console.error('Failed to initialize Twilio Chat:', err);
  }
}

export async function joinChatChannel(channelName, handleNewMessage) {
  try {
    const channel = await chatClient.getChannelByUniqueName(channelName);
    await channel.join();

    channel.on('messageAdded', handleNewMessage);

    console.log(`Joined chat channel: ${channelName}`);
    return channel;
  } catch (err) {
    console.error('Failed to join chat channel:', err);
  }
}

export async function sendMessage(channel, message) {
  try {
    await channel.sendMessage(message);
    console.log('Message sent:', message);
  } catch (err) {
    console.error('Failed to send message:', err);
  }
}