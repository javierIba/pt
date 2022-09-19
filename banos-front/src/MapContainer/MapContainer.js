import { useLoadScript } from '@react-google-maps/api';
import './MapContainer.css'
import Map from "./../Map/Map";

const MapContainer = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBo6HyS4zH36dLxSCympnE3bOfUD1TCOuM",
    })
    

    if(!isLoaded) return <div>Loading...</div>;
    return <Map />
}


export default MapContainer;