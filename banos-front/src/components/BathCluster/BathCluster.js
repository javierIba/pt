import { MarkerClusterer, Marker } from "@react-google-maps/api";
import { useState } from "react";
import iconOptions from "../../icons/IconOptions";
import BathInformation from './../BathInformation/BathInformation';
import { useFetchToilets } from "../../hooks/useFetchToilets";
import { comprobarHora } from "../../helpers/comprobarHora";
const BathCluster = (props) => {
    const [showOffCanvas, setShowOffCanvas] = useState({
        state: false,
        toilet: null
    });
    const toilets = useFetchToilets();
    const toiletCollection = (toilets) ? toilets.latLngToiletCollection : [{}];

    function createKey(lat, lng) {
        return lat + lng
    }
    function handleClose() {
        setShowOffCanvas({
            state: false,
            toilet: null
        });
    }
    function handleShow(toilet) {
        setShowOffCanvas({
            state: true,
            toilet: toilet
        })
    }

    function handleOffCanvas() {
        return ((showOffCanvas.state) ? <BathInformation show={showOffCanvas.state} handleClose={handleClose} id={showOffCanvas.toilet.id} mapa={props.mapa} /> : "")
    }

    return (
        <>
            <MarkerClusterer >
                {clusterer =>
                    toiletCollection.map(toilet => {
                        let options = (toilets) ? comprobarHora(toilet) : iconOptions.iconBath;
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


