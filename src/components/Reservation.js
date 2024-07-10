import React from "react";
import ReservationItem from "./ReservationItem";

const Reservations = ({
  reservations,
  acceptReservation,
  transferCall,
  completeTask,
}) => {
  return (
    <div id="reservations" className="mt-3">
      <h3>Reservations</h3>
      <ul className="list-group" id="reservations-group">
        {reservations.map((reservation) => (
          <ReservationItem
            key={reservation.sid}
            reservation={reservation}
            acceptReservation={acceptReservation}
            transferCall={transferCall}
            completeTask={completeTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
