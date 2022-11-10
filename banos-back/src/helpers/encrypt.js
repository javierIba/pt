const bcrypt = require('bcryptjs');

async function encrypt(str){
    const hash = await bcrypt.hash(str,10);
    return hash
}
async function compare(str,hash){
    return await bcrypt.compare(str,hash);
}










// function encrypt(str) {
//     const key = process.env.encrypt_key;
//     const iv = Buffer.alloc(16, 0);
//     let cipher = crypto.createCipheriv('aes-256-ccm', key, iv);
//     let encryptStr = cipher.update(str, 'utf-8', 'hex');
//     encryptStr += cipher.final('hex');
//     return encryptStr
// }

// function descrypt(str) {
//     const key = process.env.encrypt_key;
//     let decipher = crypto.createDecipheriv('aes-256-ccm', key, "16");
//     let descryptStr = decipher.update(str, 'hex', 'utf-8');
//     descryptStr += decipher.final('utf-8');
//     return descryptStr
// }
module.exports = {
    encrypt,
    compare
}