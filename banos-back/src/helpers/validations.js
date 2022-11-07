
function emailValidation(email){
    const emailRegx = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
    if(email != null && !(email === undefined) && emailRegx.test(email)){
        return true
    }
    return false
    
}

function nameValidation(name){
    const nameRegx = /^[a-zA-Z]+$/;
    if(name != null && !(name === undefined) && nameRegx.test(name)){
        return true
    }
    return false
}

function passwordValidation(password){
    if(password != null && !(password === undefined) && password.length >= 6 ){
        return true
    }
    return false
   
}

module.exports  = {
    emailValidation,
    nameValidation,
    passwordValidation
}