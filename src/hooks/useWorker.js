// useWorker.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setWorkerClient, setWorkerInfo, setWorkerActivities,setReservations } from '../redux/workerActions';
import Swal from "sweetalert2";
import useTwilioDevice from './useTwilioDevice';

const API_URL = 'https://twilio-call-center-testing-7786.twil.io';

const useWorker = (workerSid,workerClient,workerActivities,workerInfo) => {
  const dispatch = useDispatch();
  useTwilioDevice(workerInfo && workerInfo.attributes.contact_uri ? workerInfo.attributes.contact_uri.slice(7) : null);

  useEffect(() => {
    const registerWorker = async () => {
      try {
        const tokenResponse = await fetch(`${API_URL}/get-token?workerSid=${workerSid}`);
        const resp = await tokenResponse.json();

        const worker = new window.Twilio.TaskRouter.Worker(resp.token);

        worker.on('ready', (workerInfo) => {
          dispatch(setWorkerClient(worker));
          dispatch(setWorkerInfo(workerInfo));
          fetchActivities(worker);
          updateReservations(worker);
        });

        worker.on('reservation.created', (reservation) => {
            updateReservations(worker,reservation,"created");
        });
        worker.on('reservation.accepted', (reservation) => updateReservations(worker,reservation,"accepted"));
        worker.on('reservation.canceled', (reservation) => updateReservations(worker,reservation));
      } catch (error) {
        console.error('Error creating worker client:', error);
      }
    };

    if (workerSid) {
      registerWorker();
    } else {
      alert('Worker SID not provided.');
    }
  }, [workerSid, dispatch]);

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
      dispatch(setWorkerActivities(activities));
    });
  };

  const updateReservations = (workerClient,reservation,status) => {
    // Implement updateReservations logic if needed
    console.log("updateReservations called");
    if (!workerClient) return;
    workerClient.fetchReservations((error, reservations) => {
      if (error) {
        console.error('Error fetching reservations:', error);
        return;
      }
      dispatch(setReservations(reservations.data));
      if(status == 'accepted'){

      }
      if(reservation&& reservation.task.attributes && reservation.task.attributes.type == "outbound" && status=="created"){
          acceptReservation(reservation.sid,workerClient);
      }
    });
  };

  const toggleWorkerAvailability = () => {
    if (workerClient) {
      const newStatus = {
        ActivitySid: workerInfo && workerInfo.available
          ? workerActivities.offline
          : workerActivities.available,
      };
      workerClient.update(newStatus, (error, updatedWorkerInfo) => {
        if (error) {
          console.error('Error updating worker availability:', error);
        } else {
          dispatch(setWorkerInfo(updatedWorkerInfo));
        }
      });
    } else {
      console.warn('Worker client not initialized.');
    }
  };

  const acceptReservation = (reservationSid,tempworkerClient) => {
    if (workerClient) {
      workerClient.fetchReservations((error, reservations) => {
        if (error) {
          console.error('Error fetching reservations:', error);
        } else {
          const reservation = reservations.data.find(res => res.sid === reservationSid);
          if (reservation) {
            if (reservation.task.attributes.conference) {
              console.log('Joining conference ' + reservation.task.attributes.conference.room_name);
              reservation.conference();
              return true;
            } else {
              console.log('Accepting reservation...');
              reservation.conference();
              return true;
            }
          } else {
            console.warn('Reservation not found:', reservationSid);
          }
        }
      });
    } else if(tempworkerClient){
      tempworkerClient.fetchReservations((error, reservations) => {
        if (error) {
          console.error('Error fetching reservations:', error);
        } else {
          const reservation = reservations.data.find(res => res.sid === reservationSid);
          if (reservation) {
            if (reservation.task.attributes.conference) {
              console.log('Joining conference ' + reservation.task.attributes.conference.room_name);
              reservation.conference();
              return true;
            } else {
              console.log('Accepting reservation...');
              reservation.conference();
              return true;
            }
          } else {
            console.warn('Reservation not found:', reservationSid);
          }
        }
      });
    }else{
      console.warn('Worker client not initialized.');
    }
    return false;
  };

  const completeTask = (taskSid) => {
    fetch(`${API_URL}/complete-task?taskSid=${taskSid}`)
      .then(() => {
        updateReservations(workerClient);
        return true;
      })
      .catch(error => {
        console.error('Error completing task:', error);
        return false;
      });
  };

  const transferCall = (taskSid, workspaceSid) => {
    Swal.fire({
      text: 'Who do you want to transfer the call to?',
      input: 'text',
    }).then((result) => {
      if (result.value) {
        fetch(`${API_URL}/transfer?task_sid=${taskSid}&workspace=${workspaceSid}&workerName=${result.value}`)
          .then(() => {
            updateReservations(workerClient);
          })
          .catch(error => {
            console.error('Error transferring call:', error);
          });
      }
    });
  };

  return {toggleWorkerAvailability,acceptReservation,completeTask,transferCall}; // No rendering logic in custom hooks
};

export default useWorker;
