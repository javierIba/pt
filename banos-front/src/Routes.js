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
import Admin from './admin/Admin';
import { useState } from 'react';
import ToiletRecomendation from "./admin/ToiletRecomendation/ToiletRecomendation";
import ToiletAdmin from "./admin/ToiletAdmin/ToiletAdmin";
import Recuperar from "./Auth/Recuperar/Recuperar";
import SendEmail from "./Auth/Recuperar/SendEmail";
export default function Rooutes() {

    let admin = localStorage.getItem('A');

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
                            </>}

                        <Route path='/' element={<MapContainer />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path="/recuperar/:email" element={<Recuperar />} />
                        <Route path="/recsendemail" element={<SendEmail />} />

                    </Routes>
                </div>
            </Router></>
    );
}