export const setWorkerClient = (workerClient) => ({
    type: 'SET_WORKER_CLIENT',
    payload: workerClient,
  });
  
  export const setWorkerInfo = (workerInfo) => ({
    type: 'SET_WORKER_INFO',
    payload: workerInfo,
  });
  
  export const setWorkerActivities = (workerActivities) => ({
    type: 'SET_WORKER_ACTIVITIES',
    payload: workerActivities,
  });
  
  export const setReservations = (reservations) => ({
    type: 'SET_RESERVATIONS',
    payload: reservations,
  });

  export const setDevice = (device) => ({
    type: 'SET_DEVICE',
    payload: device,
  });
  