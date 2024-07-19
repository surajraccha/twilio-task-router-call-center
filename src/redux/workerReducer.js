const initialState = {
    workerClient: null,
    workerInfo: null,
    workerActivities: {},
    reservations: [],
    device :null,
    connection : null
  };
  
  const workerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_WORKER_CLIENT':
        console.log("workerclient dispatch called>>"+action.payload);
        return {
          ...state,
          workerClient: action.payload,
        };
      case 'SET_WORKER_INFO':
        return {
          ...state,
          workerInfo: action.payload,
        };
      case 'SET_WORKER_ACTIVITIES':
        return {
          ...state,
          workerActivities: action.payload,
        };
      case 'SET_RESERVATIONS':
        console.log("SET_RESERVATIONS dispatch called>>"+action.payload);
        return {
          ...state,
          reservations: action.payload,
        };
      case 'SET_DEVICE':
          console.log("device>>"+action.payload);
          return {
            ...state,
            device: action.payload,
          };
      case 'SET_CONNECTION':
            console.log("connection>>"+action.payload);
            return {
              ...state,
              connection: action.payload,
            };
      default:
        return state;
    }
  };
  
  export default workerReducer;
  