
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
}
async function writeDocumentWithoutId(doc, collection) {
    await firestore.collection(collection).add(doc);
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
async function readAllDocumentsOfCollection(collectionName) {
    const collectionRef = firestore.collection(collectionName);
    const snapshot = await collectionRef.get();
    let collectionResponse = [];
    snapshot.forEach(doc => {
        collectionResponse.push(doc.data());
    });
    return collectionResponse
}
async function deleteDocument(collection, docName) {
    const document = firestore.doc(`${collection}/${docName}`);
    await document.delete();

}


module.exports = {
    writeDocument,
    readDocument,
    readAllDocumentsOfCollection,
    writeDocumentWithoutId,
    deleteDocument
}