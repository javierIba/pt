
const { readDocument, writeDocument, writeDocumentWithoutId, readAllDocumentsOfCollection, deleteDocument } = require('./../services/firebase/firebaseStorage/firebaseStorage');

async function getAllOfCollection(req, res) {
    try {
        let collectionName = 'toiletsRecomendation';
        let collection = await readAllDocumentsOfCollection(collectionName);
        res.status(200).json({ code: 200, collection });
    } catch (error) {
        res.status(500).json({ code: 500, message: "error" });
    }
}

async function deleteDoc(req, res) {
    const { id } = req.body;

    try {
        let collectionName = 'toiletsRecomendation';
        await deleteDocument(collectionName, id);
        res.status(200).json({ code: 200, message: "Borrado" });
    } catch (error) {
        res.status(500).json({ code: 500, message: "error" });
    }
}

async function addToiletRecomendationToToilets(req, res) {
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
        let collectionNameToiletRecomendation = 'toiletsRecomendation';
        let collectionNameToilet = 'toilets'
        await writeDocument(data, collectionNameToilet, id);
        await deleteDocument(collectionNameToiletRecomendation, id);
        res.status(200).json({ code: 200, message: "Borrado" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ code: 500, message: "error" });
    }
}

async function toiletAdd(req, res) {
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
        id
    } = req.body;
    
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
        id
    }
    try {
        let collectionName = 'toiletsRecomendation';
        await writeDocument(data, collectionName, id);
        res.status(200).json({ code: 200, message: "exito" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ code: 500, message: "Internal server error" });

    }

}

module.exports = {
    toiletAdd,
    getAllOfCollection,
    deleteDoc,
    addToiletRecomendationToToilets
}