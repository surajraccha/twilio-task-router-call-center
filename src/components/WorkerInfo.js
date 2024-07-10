import React from "react";

const WorkerInfo = ({ worker, toggleWorkerAvailability }) => {
  if (!worker) return null;

  return (
    <div id="worker">
      <h4>
        Worker Name: <span id="worker-name">{worker.friendlyName}</span>
      </h4>
      <ul className="list-group" id="worker-info-group">
        <li className="list-group-item">
          Activity: <span id="worker-activity">{worker.activityName}</span>
        </li>
        <li className="list-group-item">
          Availability:{" "}
          <span id="worker-available">
            {worker.available ? "Available" : "Not Available"}
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
