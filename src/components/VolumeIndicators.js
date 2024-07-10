import React, { useEffect, useRef } from 'react';

function VolumeIndicators({ call }) {
  const inputVolumeBarRef = useRef(null);
  const outputVolumeBarRef = useRef(null);

  useEffect(() => {
    if (call) {
      bindVolumeIndicators(call);
    }
  }, [call]);

  function bindVolumeIndicators(call) {
    call.on("volume", function (inputVolume, outputVolume) {
      let inputColor = "red";
      if (inputVolume < 0.5) {
        inputColor = "green";
      } else if (inputVolume < 0.75) {
        inputColor = "yellow";
      }

      if (inputVolumeBarRef.current) {
        inputVolumeBarRef.current.style.width = Math.floor(inputVolume * 300) + "px";
        inputVolumeBarRef.current.style.background = inputColor;
      }

      let outputColor = "red";
      if (outputVolume < 0.5) {
        outputColor = "green";
      } else if (outputVolume < 0.75) {
        outputColor = "yellow";
      }

      if (outputVolumeBarRef.current) {
        outputVolumeBarRef.current.style.width = Math.floor(outputVolume * 300) + "px";
        outputVolumeBarRef.current.style.background = outputColor;
      }
    });
  }

  return (
    <>
      {call ? (
        <div id="volume-indicators" className="center-column">
          <label>Mic Volume</label>
          <div ref={inputVolumeBarRef} id="input-volume"></div>
          <br />
          <br />
          <label>Speaker Volume</label>
          <div ref={outputVolumeBarRef} id="output-volume"></div>
        </div>
      ) : null}
    </>
  );
}

export default VolumeIndicators;
