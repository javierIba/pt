
const { readDocument, writeDocument, writeDocumentWithoutId } = require('./../services/firebase/firebaseStorage/firebaseStorage');

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
        cierre
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
        cierre
    }
    try {
        let collectionName = 'toiletsRecomendation';
        await writeDocumentWithoutId(data, collectionName);
        res.status(200).json({ code: 200, message: "exito" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ code: 500, message: "Internal server error" });

    }

}

module.exports = {
    toiletAdd
}