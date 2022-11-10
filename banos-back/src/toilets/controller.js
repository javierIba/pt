
const { readDocument,writeDocument,readAllDocumentsOfCollection } = require('./../services/firebase/firebaseStorage/firebaseStorage');



async function getAlltoiletLatLng(req,res){
    try {
        let collectionName = 'toilets';
        let collection  = await readAllDocumentsOfCollection(collectionName);
        let latLngToiletCollection = collection.reduce((toiletsLatLng,next)=>toiletsLatLng.push({id,lat,lng}),[]);

        res.status(200).json({code:200,message:"exito",latLngToiletCollection});
    } catch (err) {
        res.status(500).json({code:500,message:"Internal server error"})
    }
}

async function getAllToilets(req,res){
    try {
        let collectionName = 'toilets';
        let collection  = await readAllDocumentsOfCollection(collectionName);
        res.status(200).json({code:200,message:"exito",collection});
    } catch (err) {
        res.status(500).json({code:500,message:"Internal server error"})
    }
}






module.exports = {
    getAllToilets,
    getAlltoiletLatLng
}