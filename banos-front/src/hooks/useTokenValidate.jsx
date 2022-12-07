import { useState, useEffect } from 'react';
import validateToken from './../helpers/auth';

export function useTokenValidate(tokenName){
    const [isToken, setIsToken] = useState(false);

    useEffect(() => {
        async function tokenValidate() {
            
            let token = localStorage.getItem(tokenName);
            let isValidate = await validateToken(token);
            setIsToken(isValidate);
          }
          tokenValidate();
    },[]);

    return isToken
}