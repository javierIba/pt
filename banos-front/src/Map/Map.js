import { useState, useMemo } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import './Map.css'

export default function Map(){
    const [gpsData,setGpsData] = useState(
        {lat:-33.044726,
        lng:-71.6148218}
    );
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            setGpsData({lat:position.coords.latitude,lng: position.coords.longitude});
          });
    } else {
        console.log("No asektad0")
    }


    return <GoogleMap  zoom={15} center={gpsData} mapContainerClassName="map">
        <Marker position={gpsData}/>
    </GoogleMap>
}