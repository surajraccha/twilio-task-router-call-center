import React from "react";

const WorkerInfo = ({ workerInfo, toggleWorkerAvailability }) => {
  if (!workerInfo) return null;

  return (
    <div className="container mb-5" id="worker">
      <h4>
        Worker Name: <span id="worker-name">{workerInfo.friendlyName}</span>
      </h4>
      <ul className="list-group" id="worker-info-group">
        <li className="list-group-item">
          Activity: <span id="worker-activity">{workerInfo.activityName}</span>
        </li>
        <li className="list-group-item">
          Availability:{" "}
          <span id="worker-available">
            {workerInfo.available ? "Available" : "Not Available"}
          </span>
          <button
            type="button"
            className="btn btn-info btn-sm float-right"
            onClick={toggleWorkerAvailability}
          >
            Toggle availability
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WorkerInfo;
