import React from 'react';
import { connect } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import useWorker from '../hooks/useWorker';
import WorkerInfo from './WorkerInfo';
import CallControls from './CallControls';
import Reservations from './Reservation';
import OutBoundCall from "./OutBoundCall";

const Phone = ({ workerInfo, workerClient, workerActivities,reservations,device }) => {
  const WORKER_SID = new URLSearchParams(window.location.search).get("workerSid");

  const {toggleWorkerAvailability,acceptReservation,completeTask,transferCall} = useWorker(workerInfo ? workerInfo.sid : WORKER_SID,workerClient,workerActivities,workerInfo);

  return (
    <div className="mx-3">
      <WorkerInfo workerInfo={workerInfo} toggleWorkerAvailability={toggleWorkerAvailability} />
      <OutBoundCall workerClient={workerClient} workerInfo={workerInfo}/>
      <div className='container'>
          <h4>Inbound Calls</h4>
           <CallControls device={device}/>
            <Reservations reservations={reservations}
                          acceptReservation={acceptReservation}
                          transferCall={transferCall}
                          completeTask={completeTask} />
      </div>
      
    </div>
  );
};

const mapStateToProps = (state) => ({
  workerInfo: state.worker.workerInfo,
  workerClient: state.worker.workerClient,
  workerActivities: state.worker.workerActivities,
  reservations : state.worker.reservations
});

export default connect(mapStateToProps)(Phone);
