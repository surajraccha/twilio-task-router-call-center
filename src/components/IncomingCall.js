import React from 'react';

function IncomingCall({ call, acceptCall, rejectCall, hangupCall }) {
  if (!call) return null;

  return (
    <div id="incoming-call">
      <h2>Incoming Call Controls</h2>
      {/* <p className="instructions">Incoming Call from {call.parameters.From}</p> */}
      <button id="button-accept-incoming" onClick={() => acceptCall(call)}>Accept</button>
      <button id="button-reject-incoming" onClick={() => rejectCall(call)}>Reject</button>
      <button id="button-hangup-incoming" onClick={() => hangupCall(call)}>Hangup</button>
    </div>
  );
}

export default IncomingCall;
