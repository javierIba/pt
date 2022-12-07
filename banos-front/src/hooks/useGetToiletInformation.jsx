import { useState, useEffect } from 'react';

export function useGetToiletInformation(id){
    const [toiletInformation, setToiletInformation] = useState(null);
    useEffect(() => {
        async function getToiletInformation() {
          const data = {
            id: id
          }
          let response = await fetch("http://localhost:8080/toilets/getToilet", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
    
          });
    
          let information = await response.json();
          setToiletInformation(information.doc);
        }
        getToiletInformation()
      }, []);

      return toiletInformation
}