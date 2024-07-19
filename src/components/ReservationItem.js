import React, { useState } from "react";

const ReservationItem = ({
  reservation,
  acceptReservation,
  transferCall,
  completeTask,
  key
}) => {
  const [reservationAccepted,setReservationAccepted] = useState(false);
  const [completeTaskFlag,setCompleteTaskFlag] = useState(false);

  const renderReservationButtons = () => {


    let result = [];
    switch (reservation.reservationStatus) {
      case "pending":
        result.push(
          <button
            type="button"
            className="btn btn-primary float-right"
            disabled={reservationAccepted}
            onClick={() => {
              var result = acceptReservation(reservation.sid);
              if(result){
                setReservationAccepted(true);
              }
            }}
          >
            {!reservationAccepted ? "Accept" :"Accepting..."}
          </button>
        );
        break;
      case "accepted":
        break;
      case "canceled":
        break;
    }
    switch (reservation.task.assignmentStatus) {
       case "assigned":
      //   result.push(
      //     <button
      //       type="button"
      //       className="btn btn-info float-right ml-2"
      //       onClick={() =>
      //         transferCall(reservation.task.sid, reservation.task.workspaceSid)
      //       }
      //     >
      //       Transfer Call
      //     </button>
      //   );
      case "wrapping":
        result.push(
          <button
            type="button"
            className="btn btn-info float-right"
            disabled={completeTaskFlag}
            onClick={() =>{
              var result = completeTask(reservation.task.sid);
                if(result){
                  setCompleteTaskFlag(true);
                }
            } }
          >
            Complete task
          </button>
        );
        break;
      case "completed":
        result = [];
        break;
    }
    return result;
  };

  return (
    <li key={key} className="list-group-item">
      Reservation SID: {reservation.sid}
      <br />
      Reservation Status: {reservation.reservationStatus}
      <br />
      Task Status: {reservation.task.assignmentStatus}
      <br />
      Call From : {reservation.task.attributes.type=="outbound" ? reservation.task.attributes.called :reservation.task.attributes.from}
      <br />
      {renderReservationButtons()}
    </li>
  );
};

export default ReservationItem;
