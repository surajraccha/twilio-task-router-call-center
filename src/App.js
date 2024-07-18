import CRMContainer from "./components/CRMContainer";
import Phone from "./components/Phone";
import './styles/App.css'; // Import the CSS file
import store from './redux/store';
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="app-container">
      <div className="phone-container">
      <Provider store={store}>
        <Phone />
       </Provider>
      </div>
      <div className="crm-container">
        <CRMContainer />
      </div>
    </div>
  );
}

export default App;
