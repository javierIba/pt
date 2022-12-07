
const { readDocument, writeDocument, readAllDocumentsOfCollection } = require('./../services/firebase/firebaseStorage/firebaseStorage');
const { decodeToken } = require('./../helpers/token')


async function getAlltoiletLatLng(req, res) {
    try {
        let collectionName = 'toilets';
        let collection = await readAllDocumentsOfCollection(collectionName);

        let latLngToiletCollection = collection.reduce((toiletsLetLng, next) => {
            toiletsLetLng.push({ id: next.id, lat: next.lat, lng: next.lng, cerrado: next.cerrado, apertura: next.apertura });
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
async function hourEdit(req, res) {
    const { id, apertura, cerrado } = req.body;

    try {
        let collectionName = 'toilets';
        let docName = id;
        let doc = await readDocument(collectionName, docName);
        doc["apertura"] = apertura;
        doc["cerrado"] = cerrado;
   
        await writeDocument(doc,collectionName, docName);

            res.status(200).json({ code: 200, message: "exito", doc });
    } catch (err) {
        console.log(err)
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
        await writeDocument(doc, collectionName, docName);
        res.status(200).json({ code: 200, message: "Enviado" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ code: 500, message: "internal server error" });
    }



}

async function addToilet(req, res) {
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
            lng: parseFloat(lng),
            lat: parseFloat(lat),
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
        await writeDocument(data, collectionName, id);
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(500).json({ code: 500 })
    }
}


module.exports = {
    getAllToilets,
    getAlltoiletLatLng,
    getToiletByid,
    hourEdit,
    postReview,
    addToilet
}