const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const config = require('../../../config');
const Usuario = require('../model');

/*Usuario Routes*/
exports.login = async (req, res) => {
  const user = await Usuario.findOne({ email: req.body.email });

  if (!user) {
    res.json({
      success: false,
      message: 'Usuário não encontrado',
      email: req.body.email
    });
  } else {
    bcrypt.compare(req.body.password, user.password, function(err, ok) {
      if (ok) {
        console.log('Email de usuário: ' + user.fullName + ' : ' + user.email);

        var beAToken = {};
        beAToken.email = user.email;
        beAToken._id = user._id;
        beAToken.fullName = user.fullName;
        beAToken.active = user.active;

        var token = jwt.sign(beAToken, config.secret, {
          expiresIn: '1d' // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Login efetuado com sucesso!',
          token: token
        });
      } else {
        res.json({ success: false, message: 'Usuário não encontrado' });
      }
    });
  }
};
