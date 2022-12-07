import { useState, useEffect } from 'react';

export function useGps(defaultGpsData) {
    const [gpsData, setGpsData] = useState(defaultGpsData);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGpsData({ lat: position.coords.latitude, lng: position.coords.longitude });
            });
        } else {
            console.log("Gps no aceptado");
        }
    }, []);
    
    return gpsData
}