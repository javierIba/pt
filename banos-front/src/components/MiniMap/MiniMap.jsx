import { Button } from 'react-bootstrap';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState } from 'react';
import { useGps } from './../../hooks/useGps'
import './MiniMap.css'



export default function MiniMap(props) {
    const [position, setPosition] = useState(null)
    const gpsData = useGps({
        lat: -33.044570036934864,
        lng: -71.61246320233796
    });
    function handleClick(e) {
        setPosition(e.latLng)
    }

    return (<>
            <GoogleMap
                mapContainerClassName="MiniMapContainer"
                clickableIcons={false}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                }}
                zoom={16}
                center={gpsData}
                onClick={(e) => handleClick(e)}
            >
                <Marker position={position} />

            </GoogleMap>
            <br/>
            <Button className='btn-primary' onClick={()=>props.setLatLng(position)}>Confirmar posición</Button>
    </>)
}