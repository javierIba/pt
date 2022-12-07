import { useEffect, useState } from "react";

export function useFetchToilets() {
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

    }, []);

    return toilets
}