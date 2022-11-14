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
        return (showOffCanvas.state) ? <BathInformation show={showOffCanvas.state} handleClose={handleClose} id={showOffCanvas.toilet.id} /> : ""
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


