export default async function validateToken(token) {
    let data = {
        AuthorizationToken: token
    }
    let response = await fetch('http://localhost:8080/users/validateToken', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let dataReponse = await response.json();
    return dataReponse.validate
}
