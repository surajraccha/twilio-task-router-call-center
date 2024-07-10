import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import WorkerInfo from "./WorkerInfo";
import CallControls from "./CallControls";
import Reservations from "./Reservation";

var API_URL = "http://localhost:5000"

const Phone = () => {
  const [worker, setWorker] = useState(null);
  const [workerActivities, setWorkerActivities] = useState({});
  const [reservations, setReservations] = useState([]);
  const [device, setDevice] = useState(null);

  const WORKER_SID = new URLSearchParams(window.location.search).get("workerSid");

  useEffect(() => {
    if (WORKER_SID) {
      registerWorker(WORKER_SID);
    } else {
      window.alert('Provide worker sid in the url: e.g. http://yourserver.com/worker.html?workerSid=WKXXXX');
    }
  }, [WORKER_SID]);

  const fetchActivities = (workerClient) => {
    workerClient.activities.fetch((error, activityList) => {
      let activities = {};
      for (let activity of activityList.data) {
        if (activity.friendlyName === 'Offline') {
          activities.offline = activity.sid;
        } else if (activity.friendlyName === 'Available') {
          activities.available = activity.sid;
        }
      }
      setWorkerActivities(activities);
    });
  };

  const toggleWorkerAvailability = () => {
    let newStatus = {
      ActivitySid: worker.available
        ? workerActivities.offline
        : workerActivities.available,
    };
    worker.update(newStatus, (error, workerInfo) => {
      setWorker(workerInfo);
    });
  };

  const acceptReservation = (reservationSid) => {
    worker.fetchReservations((error, reservations) => {
      for (let reservation of reservations.data) {
        if (reservation.sid === reservationSid) {
          if (reservation.task.attributes.conference) {
            console.log('Joining conference ' + reservation.task.attributes.conference.room_name);
            reservation.conference();
          } else {
            reservation.conference();
          }
          break;
        }
      }
    });
  };

  const transferCall = (taskSid, workspaceSid) => {
    Swal.fire({
      text: 'Who do you want to transfer the call to?',
      input: 'text',
    })
      .then((result) =>
        fetch(
          `${API_URL}/transfer?task_sid=${taskSid}&workspace=${workspaceSid}&workerName=${result.value}`
        )
      )
      .then(() => {
        updateReservations();
      });
  };

  const completeTask = (taskSid) => {
    fetch(`${API_URL}/complete-task?taskSid=${taskSid}`).then(() => {
      updateReservations();
    });
  };

  const updateReservations = () => {
    worker.fetchReservations((error, reservations) => {
      setReservations(reservations.data);
    });
  };

  const registerTwilioDevice = (clientId) => {
    fetch(`${API_URL}/get-client-token?clientId=${clientId}`)
      .then((response) => response.json())
      .then((response) => {
        const twilioDevice = new Twilio.Device(response.token, {
          codecPreferences: ['opus', 'pcmu'],
          enableRingingState: true,
          sounds: { incoming: "/ring.mp3" },
        });

        twilioDevice.on('ready', () => {
          console.log('Twilio.Device Ready!');
        });

        twilioDevice.on('error', (error) => {
          console.log('Twilio.Device Error: ' + error.message);
        });

        twilioDevice.on('connect', () => {
          console.log('Successfully established call!');
        });

        twilioDevice.on('disconnect', () => {
          console.log('Call ended.');
        });

        twilioDevice.on('incoming', (conn) => {
          console.log('Incoming connection from ' + conn.parameters.From);
          conn.accept();
        });

        setDevice(twilioDevice);
      });
  };

  const registerWorker = (workerSid) => {
    fetch(`${API_URL}/get-token?workerSid=` + workerSid)
      .then((response) => response.text())
      .then((token) => {
        const workerClient = new Twilio.TaskRouter.Worker(token);

        workerClient.on('ready', (workerInfo) => {
          fetchActivities(workerClient);
          setWorker(workerInfo);
          if (workerInfo.attributes.contact_uri && workerInfo.attributes.contact_uri.startsWith('client:')) {
            registerTwilioDevice(workerInfo.attributes.contact_uri.slice(7));
          } else {
            console.warn('Twilio Audio device not enabled. The worker "contact_uri" is either missing or not in the form "client:xxxx"');
          }
        });

        workerClient.on('reservation.created', () => updateReservations());
        workerClient.on('reservation.accepted', () => updateReservations());
        workerClient.on('reservation.canceled', () => updateReservations());
      });
  };

  return (
    <div className="mx-3">
      <WorkerInfo worker={worker} toggleWorkerAvailability={toggleWorkerAvailability} />
      <CallControls device={device} />
      <Reservations
        reservations={reservations}
        acceptReservation={acceptReservation}
        transferCall={transferCall}
        completeTask={completeTask}
      />
    </div>
  );
};

export default Phone;
