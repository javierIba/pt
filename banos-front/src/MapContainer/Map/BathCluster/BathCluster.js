import { MarkerClusterer, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import icons from '../../../icons/IconsPath'
import { Offcanvas, Button } from 'react-bootstrap';
import iconOptions from "../../../icons/IconOptions";
import { Loader } from '@googlemaps/js-api-loader';

import BathInformation from './../BathInformation/BathInformation';

const BathCluster = () => {
    const [showOffCanvas, setShowOffCanvas] = useState({
        state: false,
        toilet: null
    });
    const [toilets, setToilets] = useState(null);

    useEffect(() => {
        async function drawToilets() {
            try {
                let response = await fetch("http://localhost:8080/toilets/getAllToiletsLatLng");
                let resonseData = await response.json();
                setToilets(resonseData)
            } catch (error) {
                console.error("Se ha producido un error en la solicitud");
            }
        }
        drawToilets()

    },[])

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



    const options = iconOptions.iconBath;

    const toiletCollection = (toilets) ? toilets.latLngToiletCollection : [{}];

    function handleOffCanvas() {

        return (showOffCanvas.state) ? <BathInformation show={showOffCanvas.state} handleClose={handleClose} toiletInformation={showOffCanvas.toilet} /> : ""
    }



    const createKey = (lat, lng) => lat + lng;

    return (
        <>
            <MarkerClusterer >
                {clusterer =>
                    toiletCollection.map(toilet => (
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



    // /* Aqui va el fetch a la api para consultar los baños*/

    // const toiletExample = [{
    //     id: 1,
    //     lng: -71.61775403926892,
    //     lat: -33.046804349799366,
    //     free: true,
    //     disability_access: true,
    //     diaper_changing: true,

    //     reviews: [{
    //         id: 1,
    //         username: "javier ibáñez",
    //         calification: 4,
    //         cleaning_calification: 3,
    //         privacy_calification: 5,
    //         free: true,
    //         disability_access: true,
    //         diaper_changing: true
    //     }]

    // },
    // {
    //     id: 2,
    //     lng: -71.60720761052225,
    //     lat: -33.04792590232038,
    //     free: true,
    //     disability_access: true,
    //     diaper_changing: true,

    //     reviews: [{
    //         id: 1,
    //         username: "javier ibáñez",
    //         calification: 1,
    //         cleaning_calification: 3,
    //         privacy_calification: 2,
    //         free: true,
    //         disability_access: true,
    //         diaper_changing: true
    //     }]
    // }]

       // const baths = [
    //     { lat: -33.046804349799366, lng: -71.61775403926892 },
    //     { lat: -33.04792590232038, lng: -71.60720761052225 },
    //     { lat: -33.04780928608343, lng: -71.61412408328582 },
    //     { lat: -33.0442774069054, lng: -71.60438537161383 }
    // ]