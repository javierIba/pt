
const { readDocument,writeDocument } = require('./../services/firebase/firebase');

const toiletExample = [{
    id: 1,
    lng: -71.61775403926892,
    lat: -33.046804349799366,
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
}]

function getToilet() {
    return readDocument("toilets","toiletExample[0].id");
    // writeDocument(toiletExample[0],"toilets","toiletExample[0].id")
}

module.exports = {
    getToilet
}