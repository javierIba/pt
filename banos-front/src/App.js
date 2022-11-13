import 'bootstrap/dist/css/bootstrap.min.css';
import MapContainer from "./MapContainer/MapContainer";
import Login from './Auth/Login/Login';
import SignUp from './Auth/SignUp/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import StarsReview from './icons/starsReview/StarsReview';

function App() {
  
  return (
      <Router>
      
        <div>
          <Routes>
            <Route path='/' element={<MapContainer />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<SignUp />}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
