import { useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useGps } from '../../hooks/useGps';
import BathCluster from './../../components/BathCluster/BathCluster';
import iconOptions from '../../icons/IconOptions';
import './Map.css'
/*global google*/
export default function Map() {

    const [prub, setPrub] = useState(null);
    const gpsData = useGps({
        lat: -33.044570036934864,
        lng: -71.61246320233796
    });

    return (
        <GoogleMap zoom={16} center={gpsData} mapContainerClassName="map">
            <Marker position={gpsData} animation={window.google.maps.Animation.DROP} icon={iconOptions.iconArrow} />
            <BathCluster mapa={setPrub} />

            {prub && <DirectionsRenderer directions={prub} />}
        </GoogleMap>
    )
}



