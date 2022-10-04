import { useLoadScript } from '@react-google-maps/api';
import './MapContainer.css'
import Spinner from 'react-bootstrap/Spinner';

import Map from "./Map/Map";

const MapContainer = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY_GOOGLE_MAPS,
        libraries: ["geometry"]
    })


    if (!isLoaded) return <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>;
    return <Map />
}


export default MapContainer;
