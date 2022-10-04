import { MarkerClusterer, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import icons from '../../../icons/IconsPath'
import { Offcanvas, Button } from 'react-bootstrap';

import BathInformation from './../BathInformation/BathInformation';

const BathCluster = () => {
    const [showOffCanvas, setShowOffCanvas] = useState(false);

    const handleClose = () => setShowOffCanvas(false);
    const handleShow = () => setShowOffCanvas(true);

    const options = {

        path: icons.iconBath,
        fillColor: "yellow",
        fillOpacity: 0.9,
        scale: 0.1,
        strokeColor: "green",
        strokeWeight: 2

    }


    /* Aqui va el fetch a la api para consultar los baños*/

    const toiletExample = [{
        id: 1,
        lng: -71.61775403926892,
        lat: -33.046804349799366,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews:[{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]
        
    }]


    const baths = [
        { lat: -33.046804349799366, lng: -71.61775403926892 },
        { lat: -33.04792590232038, lng: -71.60720761052225 },
        { lat: -33.04780928608343, lng: -71.61412408328582 },
        { lat: -33.0442774069054, lng: -71.60438537161383 }
    ]

    const createKey = (lat,lng) => lat + lng;

    return (
        <>
            <MarkerClusterer >
                {clusterer =>
                    toiletExample.map( toilet => (
                        <>
                            <Marker key={createKey(toilet.lat,toilet.lng)} position={{lat:toilet.lat,lng:toilet.lng}} animation={window.google.maps.Animation.BOUNCE} clusterer={clusterer} icon={options} onClick={handleShow} />
                            <BathInformation show={showOffCanvas} handleClose={handleClose} toiletInformation={toiletExample} />
                        </>
                    )
                    )
                }
            </MarkerClusterer>
        </>)

}

export default BathCluster;