import { useState, useEffect } from 'react';
import { GoogleMap, Marker, DistanceMatrixService, DirectionsService } from '@react-google-maps/api';
import BathCluster from './BathCluster/BathCluster';
import icons from '../../icons/IconsPath';
import './Map.css'

export default function Map() {
    const [gpsData, setGpsData] = useState(
        {
            lat: -33.044726,
            lng: -71.6148218
        }
    );
  
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGpsData({ lat: position.coords.latitude, lng: position.coords.longitude });
            });
        } else {
            console.log("Gps no aceptado");
        }
    }, []);



    return (<>

        <GoogleMap zoom={16} center={gpsData} mapContainerClassName="map">
            <Marker position={gpsData} animation={window.google.maps.Animation.DROP} icon={
                {
                    path: icons.iconPerson,
                    fillColor: "gold",
                    fillOpacity: 0.9,
                    scale: 0.1,
                    strokeColor: "blue",
                    strokeWeight: 2
                }
            }

            />
            <BathCluster />


            <DistanceMatrixService
                options={{
                    destinations: [gpsData],
                    origins: [{
                        lat: -34.044726,
                        lng: -71.6148218
                    }],
                    travelMode: "DRIVING",
                }}
                callback={(response) => { console.log(response) }}
            />

        </GoogleMap>
    </>
    )
}