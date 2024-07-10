import CRMContainer from "./components/CRMContainer";
import Phone from "./components/Phone";
import './styles/App.css'; // Import the CSS file

function App() {
  return (
    <div className="app-container">
      <div className="phone-container">
        <Phone />
      </div>
      <div className="crm-container">
        <CRMContainer />
      </div>
    </div>
  );
}

export default App;
