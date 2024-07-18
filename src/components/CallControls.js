import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

const CallControls = ({ device }) => {
  const [connected, setConnected] = useState(false);
  const [connection, setConnection] = useState(null);

  const handleHangUp = () => {
    if (device) {
      device.disconnectAll();
      setConnected(false);
    }
  };
  const acceptCall = ()=>{
    if(connection){
      connection.accept();
    }
  }

  useEffect(() => {
    if(device){
        device.on("connect", () => setConnected(true));
        device.on("disconnect", () => setConnected(false));
        device.on('incoming', (conn) => {
          setConnection(conn);
        });
    }
  }, [device]);

  return (
    <div id="call-controls" style={{ display: "block" }} className="mt-3">
      <h3>Voice Client controls</h3>
      <button
        type="button"
        id="button-answer"
        className="btn btn-outline-secondary btn-sm"
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

const mapStateToProps = (state) => ({
  device: state.worker.device
});

export default connect(mapStateToProps)(CallControls);
