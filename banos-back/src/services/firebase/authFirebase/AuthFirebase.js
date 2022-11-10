
const { readDocument } = require('./../firebaseStorage/firebaseStorage');

async function userDuplicateVerification(collection,docName) {
    let duplicateVerification = await readDocument(collection, docName);
    if (typeof duplicateVerification === "undefined") return true
    return false
}

module.exports = {
    userDuplicateVerification
}