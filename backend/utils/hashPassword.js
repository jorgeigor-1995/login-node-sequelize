const bcrypt = require('bcrypt')

async function hashPassword(senha){ // no mode é module.exports
    //console.log(senha)
    const hashedPassword = await bcrypt.hash(senha, 10);
    return hashedPassword
}
   
module.exports = hashPassword