import React, { useState } from 'react';

function CallControls({device, call, setCall, log }) {
  const [mode, setMode] = useState('mute'); // Default to 'mute' mode

  const handleHangup = () => {
    if (call) {
      call.disconnect();
      setCall(null);
      log('Call disconnected.');
    }
  };

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  const toggleMute = (flag) => {
    if (call) {
      call.mute(flag);
    }
  };

  const toggleHold = (flag) => {
    if (device) {
      device.updateOptions({ hold: flag });
    }
  };

  return (
    <div id="call-control" className="call-control center-column">
      {call ? (
        <>
          {mode === 'mute' ? (
            <>
              <button
                id="mute"
                onClick={() => {
                  toggleMute(true);
                  toggleMode('unmute');
                }}
                aria-label="mute"
                style={{
                  backgroundImage: 'url(/images/icon-mute-off.svg)',
                }}
              ></button>
            </>
          ) : (
            <>
              <button
                id="unmute"
                onClick={() => {
                  toggleMute(false);
                  toggleMode('mute');
                }}
                aria-label="unmute"
                style={{
                  backgroundImage: 'url(/images/icon-mute.svg)',
                }}
              ></button>
            </>
          )}
          {mode === 'hold' ? (
            <>
              <button
                id="hold"
                onClick={() => {
                  toggleHold(true);
                  toggleMode('unhold');
                }}
                aria-label="hold"
                style={{
                  backgroundImage: 'url(/images/icon-hold-off.svg)',
                }}
              ></button>
            </>
          ) : (
            <>
              <button
                id="unhold"
                onClick={() => {
                  toggleHold(false);
                  toggleMode('hold');
                }}
                aria-label="unhold"
                style={{
                  backgroundImage: 'url(/images/icon-hold.svg)',
                }}
              ></button>
            </>
          )}
          <div>
            <button id="button-hangup-outgoing" onClick={handleHangup}>
              Hang Up
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default CallControls;
