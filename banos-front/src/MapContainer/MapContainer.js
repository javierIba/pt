import { useLoadScript } from '@react-google-maps/api';
import './MapContainer.css'
import Map from "./../Map/Map";

const MapContainer = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "",
    })
    

    if(!isLoaded) return <div>Loading...</div>;
    return <Map />
}


export default MapContainer;
