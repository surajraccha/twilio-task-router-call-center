import React, { useEffect, useState } from "react";

const CallControls = ({ device }) => {
  const [connected, setConnected] = useState(false);

  if (!device) return null;

  const handleHangUp = () => {
    if (device) {
      device.disconnectAll();
      setConnected(false);
    }
  };

  useEffect(() => {
    device.on("connect", () => setConnected(true));
    device.on("disconnect", () => setConnected(false));
  }, [device]);

  return (
    <div id="call-controls" style={{ display: "block" }} className="mt-3">
      <h3>Voice Client controls</h3>
      <button
        type="button"
        id="button-answer"
        className="btn btn-outline-secondary btn-sm"
        onClick={() => {}}
        disabled={connected}
      >
        Answer Call
      </button>
      <button
        type="button"
        id="button-hangup"
        className="btn btn-outline-secondary btn-sm"
        onClick={handleHangUp}
        disabled={!connected}
      >
        Hang Up
      </button>
    </div>
  );
};

export default CallControls;
