import React, { useState } from 'react';
import { makeOutgoingCall } from '../helpers/twilioUtils';

function Dialer({ device, setCall, log }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCall = async (e) => {
    e.preventDefault();
    if (device) {
      const newCall = await makeOutgoingCall(device, phoneNumber, log);
      setCall(newCall);
    }
  };

  return (
    <section className="center-column">
      <form onSubmit={handleCall}>
        <label htmlFor="phone-number">Enter a phone number</label>
        <input id="phone-number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+15552221234" />
        <div className="keypad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
            <input key={digit} type="button" value={digit} onClick={() => setPhoneNumber((prev) => prev + digit)} className="digit" />
          ))}
        </div>
        <button id="button-call" type="submit" disabled={!phoneNumber}>Call</button>
      </form>
    </section>
  );
}

export default Dialer;
