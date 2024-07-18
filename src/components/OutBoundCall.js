import React, { useState } from 'react';
import '../styles/OutBoundCall.css'; // Import the CSS file for styling

const OutBoundCall = ({workerClient,workerInfo}) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const [maxLength, setMaxLength] = useState(10);
    if (!workerInfo) return null;

    console.log(workerInfo);
    const handleNumberChange = (e) => {
        const value = e.target.value;
        // Allow only numbers and the "+" sign
        if (/^[0-9]*$/.test(value)) {
            setPhoneNumber(value);
            if (value.startsWith('1')) {
              setMaxLength(11);
            } else if (value.startsWith('91')) {
              setMaxLength(12);
            } else {
              setMaxLength(10);
            }
            if (value.length < 10) {
                setErrorMessage('Phone number must be at least 10 digits.');
            } else {
                setErrorMessage('');
            }
        }
    };

    const handleCall = () => {
        if (phoneNumber.length >= 10 && phoneNumber.length <= maxLength) {
            const fullPhoneNumber = `+${phoneNumber}`;
            // Add logic to initiate the call
            console.log('Initiating call to:', fullPhoneNumber);
            createOutBoundCall();
        } else {
            setErrorMessage('Phone number must be 10 digits.');
        }
    };

    function createOutBoundCall(){
        var data = {
            From:"+13203616375",
            To:phoneNumber,
            workerContactUri:workerInfo.attributes.contact_uri,
            WorkerName:workerInfo.attributes.worker_name,
            workerSid:workerInfo.sid
        };
        
        //console.log('createCall data>>>',JSON.stringify(data));
        
            var url = "https://twilio-call-center-service-3327.twil.io/outbound-dialing-makeCall";
           
            console.log("redirection URL>>>>>",url);
            fetch(url, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
          
          })
            .then(response => response.json())
            .then((json) => {
                setMessage("Call Placed Successfully");
             console.log('=======================',json);
            })
            .catch((err)=>{
                console.log('err=======================',err);
            });
    }

    return (
        <div className="container mb-5">
            <h4>OutBound Call:</h4>
            <div className="input-box">
                <input
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={handleNumberChange}
                    maxLength={maxLength}
                />
                <button className="call-button" onClick={handleCall}>Call</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {message && <p className="message">{message}</p>}

        </div>
    );
};

export default OutBoundCall;
