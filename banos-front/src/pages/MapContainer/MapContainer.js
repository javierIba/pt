import './MapContainer.css'
import Map from './../../components/Map/Map';
import LoadSpinner from '../../components/LoadSpinner/LoadSpinner';
import { useJsApiLoader } from '@react-google-maps/api';

export default function MapContainer() {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_API_KEY_GOOGLE_MAPS,
        libraries: ["places"],
    })
    
    if (!isLoaded) return <LoadSpinner/>
    return <><Map /></>
   
}
