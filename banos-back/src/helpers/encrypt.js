const bcrypt = require('bcryptjs');

async function encrypt(str){
    const hash = await bcrypt.hash(str,10);
    return hash
}
async function compare(str,hash){
    return await bcrypt.compare(str,hash);
}

module.exports = {
    encrypt,
    compare
}