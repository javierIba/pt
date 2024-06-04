import MapContainer from './pages/MapContainer/MapContainer';
import Login from './pages/Auth/Login/Login';
import SignUp from './pages/Auth/Signup/SignUp';


import Admin from './pages/Admin/Admin/Admin'
import ToiletRecomendation from './pages/Admin/ToiletRecomendation/ToiletRecomendation';
import ToiletAdmin from './pages/Admin/ToiletAdmin/ToiletAdmin';
import Recovery from './pages/Auth/recovery/Recovery'
import SendEmail from "./pages/Auth/recovery/SendEmail";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import ToiletView from './pages/Admin/toiletView/ToiletView';

export default function Rooutes() {


    return (
        <>
            <Router>

                <div>
                    <Routes>
                        {(admin) &&
                            <>
                                <Route path='/admin' element={<Admin />} />
                                <Route path="/toiletrecomendation" element={<ToiletRecomendation />} />
                                <Route path="/toiletadmin" element={<ToiletAdmin />} />
                                <Route path='/toiletview' element={<ToiletView/>}/>
                            </>}

                        <Route path='/' element={<MapContainer />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path="/recuperar/:email" element={<Recovery />} />
                        <Route path="/recsendemail" element={<SendEmail />} />

                    </Routes>
                </div>
            </Router></>
    );
}
