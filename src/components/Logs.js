import React from 'react';

function Logs({ messages }) {
  return (
    <section className="center-column">
      <h2>Event Log</h2>
      <div id="log">
        {messages.map((message, index) => (
          <p key={index} className="log-entry">&gt;&nbsp; {message}</p>
        ))}
      </div>
    </section>
  );
}

export default Logs;
