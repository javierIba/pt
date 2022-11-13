
const { readDocument, writeDocument, readAllDocumentsOfCollection } = require('./../services/firebase/firebaseStorage/firebaseStorage');



async function getAlltoiletLatLng(req, res) {
    try {
        let collectionName = 'toilets';
        let collection = await readAllDocumentsOfCollection(collectionName);

        let latLngToiletCollection = collection.reduce((toiletsLetLng, next) => {
            toiletsLetLng.push({ id: next.id, lat: next.lat, lng: next.lng });
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
        res.status(200).json({code:200,message:"exito",doc});
    } catch (err) {
        res.status(500).json({code:500,message:"internal server error"});
    }
}




module.exports = {
    getAllToilets,
    getAlltoiletLatLng,
    getToiletByid
}