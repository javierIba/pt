import { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, DistanceMatrixService, DirectionsService, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import './Map.css'
import BathCluster from './BathCluster/BathCluster';
import icons from '../../icons/IconsPath'
import { ButtonGroup, Card, InputGroup,Form, Button } from 'react-bootstrap';
import BathInformation from './BathInformation/BathInformation';
/*global google*/
export default function Map({calculateRoute}) {
    const [gpsData, setGpsData] = useState(
        {
            lat: -33.044726,
            lng: -71.6148218
        }
    );

    const [prub,setPrub] = useState(null)
    
  /* const [directionsResponse, setDirectionResponse] = useState(null)
    const destinationRef = useRef()

    async function calculateRoute(){
  
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: gpsData,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.WALKING
        }) 
        
        setDirectionResponse(results)
        console.log(directionsResponse);
    }

    function clearRoute(){
        setDirectionResponse(null)
        destinationRef.current.value = ''
    } */

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