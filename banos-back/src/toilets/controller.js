
const { readDocument, writeDocument, readAllDocumentsOfCollection } = require('./../services/firebase/firebaseStorage/firebaseStorage');
const { decodeToken } = require('./../helpers/token')


async function getAlltoiletLatLng(req, res) {
    try {
        let collectionName = 'toilets';
        let collection = await readAllDocumentsOfCollection(collectionName);

        let latLngToiletCollection = collection.reduce((toiletsLetLng, next) => {
            toiletsLetLng.push({ id: next.id, lat: next.lat, lng: next.lng, cerrado: next.cerrado, apertura:next.apertura });
            return toiletsLetLng
        }, []);

        res.status(200).json({ code: 200, message: "exito", latLngToiletCollection });
    } catch (err) {
        res.status(500).json({ code: 500, message: "Internal server error" })
    }
}

async function getAllToilets(req, res) {
    try {
        let collectionName = 'toilets';
        let collection = await readAllDocumentsOfCollection(collectionName);
        res.status(200).json({ code: 200, message: "exito", collection });
    } catch (err) {
        res.status(500).json({ code: 500, message: "Internal server error" });
    }
}


async function getToiletByid(req, res) {
    const { id } = req.body;

    try {
        let collectionName = 'toilets';
        let docName = id;
        let doc = await readDocument(collectionName, docName);
        res.status(200).json({ code: 200, message: "exito", doc });
    } catch (err) {
        res.status(500).json({ code: 500, message: "internal server error" });
    }
}
async function postReview(req, res) {
    const {
        id,
        calification,
        cleaning_calification,
        privacy_calification,
        free,
        disability_access,
        diaper_changing,
        token
    } = req.body;

    try {
        let collectionName = 'toilets';
        let docName = id;

        let data = {
            calification,
            cleaning_calification,
            privacy_calification,
            free,
            disability_access,
            diaper_changing
        }
        let doc = await readDocument(collectionName, docName);

        doc.reviews.push(data);
        await writeDocument(doc,collectionName, docName);
        res.status(200).json({code:200,message:"Enviado"});
    } catch (error) {
        console.log(error)
        res.status(500).json({code:500,message:"internal server error"});
    }



}

async function addToilet(req,res){
    const {
        calification,
        cleaning_calification,
        privacy_calification,
        free,
        disability_access,
        diaper_changing,
        address,
        apertura,
        cerrado,
        id,
        lng,
        lat
    } = req.body;

    try {
        data = {
            calification,
            cleaning_calification,
            privacy_calification,
            free,
            disability_access,
            diaper_changing,
            address,
            apertura,
            cerrado,
            id,
            lng:parseFloat(lng),
            lat:parseFloat(lat),
            reviews: [{
                calification
                ,
                cleaning_calification
                ,
                diaper_changing
                ,
                disability_access
                ,
                free
                ,
                privacy_calification

            }]
        }
        let collectionName = 'toilets'
        await writeDocument(data,collectionName,id);
        res.status(200).json({code:200});
    } catch (error) {
        res.status(500).json({code:500})
    }
}

async function e(req, res) {
    const toiletExample = [{
        id: 1,
        lng: -71.617666,
        lat: -33.046555,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "09:00 a 20:00",
        address: "Pedro Montt 1845, Valparaíso",

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
        horario: "09:00 a 18:00",
        address: "2685, Pedro Montt 2113, Valparaíso",

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
    },
    {
        id: 3,
        lng: -71.620142,
        lat: -33.046239,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "09:00 a 18:00",
        address: "Molina 468, Valparaíso",

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
        id: 4,
        lng: -71.605019,
        lat: -33.044000,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "09:00 a 20:30",
        address: "Av. Argentina 51, Valparaíso",

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
        id: 5,
        lng: -71.605057,
        lat: -33.043503,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "09:00 a 20:30",
        address: "Av. Argentina 51, S 2019, Valparaíso",

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
        id: 6,
        lng: -71.607492,
        lat: -33.045016,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "07:00 a 19:00",
        address: "Uruguay 125, Valparaíso",

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
        id: 7,
        lng: -71.627126,
        lat: -33.039391,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "06:00 a 03:00",
        address: "Blanco 725, Valparaíso",

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
        id: 8,
        lng: -71.606608,
        lat: -33.046894,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "06:00 a 22:00",
        address: "Pedro Montt 2860, Valparaíso",

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
        id: 9,
        lng: -71.613459,
        lat: -33.047383,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "08:00 a 20:00",
        address: "Gral. Cruz 384-434, Valparaíso",

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
        id: 10,
        lng: -71.627471,
        lat: -33.038108,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "07:00 a 20:00",
        address: "Sotomayor 7-39, Valparaíso",

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
        id: 11,
        lng: -71.627531,
        lat: -33.037357,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "09:00 a 18:00",
        address: "Muelle Prat s/n, Valparaíso",

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
        id: 12,
        lng: -71.626340,
        lat: -33.041703,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "11:00 a 20:00",
        address: "Papudo 525, 2372715 Valparaíso",

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
        id: 13,
        lng: -71.607796,
        lat: -33.041803,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "10:00 a 18:00",
        address: "Paseo Muelle Baron, s/n, Valparaíso, Valparaíso",

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
        id: 14,
        lng: -71.628412,
        lat: -33.046781,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "09:00 a 18:00",
        address: "Cerro Cárcel 471, cerro Cárcel LOMA, 2do piso Edificio de Difusión, Parque Cultural, 2380138 Valparaíso",

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
        id: 15,
        lng: -71.62235,
        lat: -33.04588,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "12:00 a 20:00",
        address: "Condell 1454, 2363127 Valparaíso",

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
        id: 16,
        lng: -71.62467,
        lat: -33.04692,
        free: false,
        disability_access: true,
        diaper_changing: true,
        horario: "15:00 a 22:00",
        address: "Pje. Ecuador 199, Valparaíso",

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
        id: 17,
        lng: -71.62425,
        lat: -33.04579,
        free: true,
        disability_access: true,
        diaper_changing: true,
        horario: "09:00 a 18:00",
        address: "Av. Ecuador 2-84, Valparaíso",

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

    }]
    try {
        let x = {
            id: 18,
            lng: -71.62497,
            lat: -33.04621,
            free: true,
            disability_access: true,
            diaper_changing: true,
            horario: "15:00 a 03:00",
            address: "Av. Ecuador 102, Valparaíso",

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

        }
        for (i = 0; i < toiletExample.length; i++) {
            let toilet = toiletExample[i];
            console.log(toilet)
            toilet.id = "baño" + i
            console.log(toilet)
            await writeDocument(toilet, "toilets", `baño${i}`);

        }
        res.status(200).json({ x: "enviado" })
    } catch (error) {
        res.status(500).json({ x: "dsa{dska" })
    }





}

module.exports = {
    getAllToilets,
    getAlltoiletLatLng,
    getToiletByid,
    e,
    postReview,
    addToilet
}