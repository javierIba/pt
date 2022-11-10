import { MarkerClusterer, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import icons from '../../../icons/IconsPath'
import { Offcanvas, Button } from 'react-bootstrap';

import { Loader } from '@googlemaps/js-api-loader';

import BathInformation from './../BathInformation/BathInformation';

const BathCluster = () => {
    const [showOffCanvas, setShowOffCanvas] = useState({
        state: false,
        toilet: null
    });

    const handleClose = () => setShowOffCanvas({
        state: false,
        toilet: null
    });
    const handleShow = (toilet) => {
        setShowOffCanvas({
            state: true,
            toilet: toilet
        })
    }

    const loader = new Loader({
      apiKey: "AIzaSyBo6HyS4zH36dLxSCympnE3bOfUD1TCOuM",
      version: "weekly",
      libraries: ["places"]
    });
    

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
        lng: -71.617666,
        lat: -33.046555,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 2,
        lng: -71.60720761052225,
        lat: -33.04792590232038,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 1,
            cleaning_calification: 3,
            privacy_calification: 2,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]
    },
    {
        id: 3,
        lng: -71.620142,
        lat: -33.046239,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 4,
        lng: -71.605019,
        lat: -33.044000,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 5,
        lng: -71.605057,
        lat: -33.043503,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 6,
        lng: -71.607492,
        lat: -33.045016,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 7,
        lng: -71.627126,
        lat: -33.039391,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 8,
        lng: -71.606608,
        lat: -33.046894,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 9,
        lng: -71.613459,
        lat: -33.047383,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 10,
        lng: -71.627471,
        lat: -33.038108,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 11,
        lng: -71.627531,
        lat: -33.037357,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 12,
        lng: -71.626340,
        lat: -33.041703,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 13,
        lng: -71.607796,
        lat: -33.041803,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 14,
        lng: -71.628412,
        lat: -33.046781,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 15,
        lng: -71.62235,
        lat: -33.04588,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 16,
        lng: -71.62467,
        lat: -33.04692,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 17,
        lng: -71.62425,
        lat: -33.04579,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    },
    {
        id: 18,
        lng: -71.62497,
        lat: -33.04621,
        free: true,
        disability_access: true,
        diaper_changing: true,

        reviews: [{
            id: 1,
            username: "javier ibáñez",
            calification: 4,
            cleaning_calification: 3,
            privacy_calification: 5,
            free: true,
            disability_access: true,
            diaper_changing: true
        }]

    }


]

    function handleOffCanvas() {

        return (showOffCanvas.state) ? <BathInformation show={showOffCanvas.state} handleClose={handleClose} toiletInformation={showOffCanvas.toilet} /> : ""
    }

    // const baths = [
    //     { lat: -33.046804349799366, lng: -71.61775403926892 },
    //     { lat: -33.04792590232038, lng: -71.60720761052225 },
    //     { lat: -33.04780928608343, lng: -71.61412408328582 },
    //     { lat: -33.0442774069054, lng: -71.60438537161383 }
    // ]

    const createKey = (lat, lng) => lat + lng;

    return (
        <>
            <MarkerClusterer >
                {clusterer =>
                    toiletExample.map(toilet => (
                        <>
                            <Marker key={createKey(toilet.lat, toilet.lng)} position={{ lat: toilet.lat, lng: toilet.lng }} animation={window.google.maps.Animation.BOUNCE} clusterer={clusterer} icon={options} onClick={() => handleShow(toilet)} />
                        </>
                    )
                    )
                }
              
            </MarkerClusterer>
            {handleOffCanvas()}
        </>)

}

export default BathCluster;