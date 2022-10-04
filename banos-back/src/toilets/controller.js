
const { readDocument } = require('./../services/firebase/firebase');

function getToilet() {
    return readDocument("jeje","ajiow");
}

module.exports = {
    getToilet
}