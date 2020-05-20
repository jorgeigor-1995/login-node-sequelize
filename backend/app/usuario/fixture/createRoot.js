const Model = require('./../model');
const to = require('./../../../core/to');

require('../../../database/connection');

(async function start(){
    console.log('cadastrar user root');
    const email = 'root@backmodel.com.br';
    let rootExists = await Model.findOne({where: {email: email}});
    if( rootExists) {
        console.log('user root ja existe');
    } else {
        var model = new Model({
            email: email,
            active: true,
            password: 'mudar123',
            fullName: 'Root',
        });

        const [err, data] = await to(model.create());

        if (!err && data) {
            console.log('user root cadastrado com sucesso')
        } else {
            console.log('ocorreu um erro ao cadastrar o root');
        }
    }
})();
