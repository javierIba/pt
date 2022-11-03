
const { Firestore } = require('@google-cloud/firestore');



const firestore = new Firestore();

function isJson(object) {
    try {
        JSON.parse(object);

    } catch (e) {

        return false;

    }
    return true;
}




async function writeDocument(doc, collection, docName, subCollecion, subDoc) {
    const document = (typeof subCollecion !== "undefined" && typeof subDoc !== "undefined")
        ? firestore.collection(collection).doc(docName).collection(subCollecion).doc(subDoc)
        : firestore.collection(collection).doc(docName);
    
    await document.set(doc);
    console.log("listo")
}
async function setDocument(collection, docName, doc) {
    const document = firestore.doc(`${collection}/${docName}`);
    if (isJson(doc)) {
        await document.update(doc);
    } else {
        return "error"
    }
}
async function readDocument(collection, docName, subCollecion, subDoc) {
    const document = (typeof subCollecion !== "undefined" && typeof subDoc !== "undefined")
        ? firestore.collection(collection).doc(docName).collection(subCollecion).doc(subDoc)
        : firestore.collection(collection).doc(docName);

    const doc = await document.get();

    return doc.data();

}

async function deleteDocument(collection, docName, doc) {
    const document = firestore.doc(`${collection}/${docName}`);
    if (isJson(doc)) {
        await document.delete();
    } else {
        return "error"
    }
}
module.exports = {
    writeDocument,
    readDocument
}