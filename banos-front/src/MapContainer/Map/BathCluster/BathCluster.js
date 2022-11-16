import { MarkerClusterer, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import icons from '../../../icons/IconsPath'
import IconModel from "../../../icons/IconModel";
import { Offcanvas, Button } from 'react-bootstrap';
import iconOptions from "../../../icons/IconOptions";
import { Loader } from '@googlemaps/js-api-loader';

import BathInformation from './../BathInformation/BathInformation';

const BathCluster = (props) => {
    const [showOffCanvas, setShowOffCanvas] = useState({
        state: false,
        toilet: null
    });
    const [toilets, setToilets] = useState(null);



    let today = new Date()
    let actualDay = today.getDay()
    let hour = new Date('1/1/1999 ' + `${today.getHours()}:${today.getMinutes()}`);

    function comprobarHora(toilet) {
        let option = {
            path: icons.iconBath,
            fillColor: "yellow",
            fillOpacity: 0.9,
            scale: 0.1,
            strokeColor: "black",
            strokeWeight: 2
        }


        let ce = (toilet) ? toilet.cerrado.split(':') : []
        let ap = (toilet) ? toilet.apertura.split(':') : []
        if (ce[0] > today.getHours() && today.getHours() >= ap[0]) {
            option.fillColor = "green"

        } else if (today.getHours >= "00" && ce[0] < "05") {
            option.fillColor = "green"
        } else {
            option.fillColor = "red"
        }
        return option
    }


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

    }, [])

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


    const toiletCollection = (toilets) ? toilets.latLngToiletCollection : [{}];

    function handleOffCanvas() {
        return (showOffCanvas.state) ? <BathInformation show={showOffCanvas.state} handleClose={handleClose} id={showOffCanvas.toilet.id} mapa={props.mapa} /> : ""
    }



    const createKey = (lat, lng) => lat + lng;

    return (
        <>
            <MarkerClusterer >
                {clusterer =>
                    toiletCollection.map(toilet => {
                        let options = (toilets != null) ? comprobarHora(toilet) : iconOptions.iconBath;
                        return (
                            <>
                                <Marker key={createKey(toilet.lat, toilet.lng)} position={{ lat: toilet.lat, lng: toilet.lng }} clusterer={clusterer} icon={options} onClick={() => handleShow(toilet)} />
                            </>
                        )
                    }
                    )
                }

            </MarkerClusterer>
            {handleOffCanvas()}
        </>)

}

export default BathCluster;


