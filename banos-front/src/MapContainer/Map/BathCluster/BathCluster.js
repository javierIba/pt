import { MarkerClusterer, Marker } from "@react-google-maps/api";
import { useEffect } from "react";
import icons from '../../../icons/Icons'
const BathCluster = () => {

    /* Aqui va el fetch a la api para consultar los baños*/
    const baths = [
        { lat: -33.046804349799366, lng: -71.61775403926892 },
        { lat: -33.04792590232038, lng: -71.60720761052225 },
        { lat: -33.04780928608343, lng: -71.61412408328582 },
        { lat: -33.0442774069054, lng: -71.60438537161383 }
    ]

    const options = {

        path: icons.iconBath,
        fillColor: "yellow",
        fillOpacity: 0.9,
        scale: 0.1,
        strokeColor: "green",
        strokeWeight: 2

    }
    function createKey(location) {
        return location.lat + location.lng
    }
    return (<MarkerClusterer >
        {(clusterer) =>
            baths.map((location) => (
                <Marker key={createKey(location)} position={location} animation={window.google.maps.Animation.BOUNCE} clusterer={clusterer} icon={options} />
            ))
        }
    </MarkerClusterer>)

}

export default BathCluster;