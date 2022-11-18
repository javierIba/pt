import { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, DistanceMatrixService, DirectionsService, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import BathCluster from './BathCluster/BathCluster';
import icons from '../../icons/IconsPath';
import './Map.css'

import { ButtonGroup, Card, InputGroup,Form, Button } from 'react-bootstrap';
import BathInformation from './BathInformation/BathInformation';
/*global google*/
export default function Map() {
    const [gpsData, setGpsData] = useState(
        {
            lat: -33.044570036934864,
            lng: -71.61246320233796
        }
    );

    const [prub,setPrub] = useState(null)
    
 

  
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
            <BathCluster mapa={setPrub}/>
            
            <DistanceMatrixService
                options={{
                    destinations: [gpsData],
                    origins: [{
                        lat: -34.044726,
                        lng: -71.6148218
                    }],
                    travelMode: "WALKING",
                }}
                
            />
            
        
            {prub && <DirectionsRenderer directions= {prub} />}
        </GoogleMap>
               

    </>
    )
}

//{directionsResponse && <DirectionsRenderer directions= {directionsResponse} />}