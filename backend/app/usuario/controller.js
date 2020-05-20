/* Model*/
const Model = require('./model');
const bcrypt = require('bcrypt-nodejs');
const to = require('../../core/to');


const hashPassword = require('../../utils/hashPassword')
/* Routes*/
exports.index = async (req, res) => {
  const [err, data] = await to(
    Model.findAll()
  );

  const total = await (await Model.findAll()).length;

  res.json({ total, data });
};

exports.get = async (req, res) => {
  const data = await Model.findOne({ _id: req.params.id });
  res.json(data);
};

exports.new = async (req, res) => {
  const usuario = await Model.findOne({ where: { email: req.body.email } });
  const password = req.body.password;
  if (!usuario) {
    password = await hashPassword(password);
  } else {
    return res.json({ error: 'usuario existente' })
  }

  const [err, data] = await to(Model.create({
    fullName: req.body.fullname,
    email: req.body.email,
    password: password,
    active: true,
  }));

  if (!err && data) {
    res.json({ success: true, data, err, form: req.body });
  } else {
    res.json({ succsess: false, data, err, form: req.body });
  }
};

exports.delete = async (req, res) => {
  /*const data = await Model.remove({ _id: req.params._id });
  res.json(data);*/
};

exports.edit = async (req, res) => {
  /*const model = await Model.findOne({ _id: req.body._id });

  for (const chave in req.body) {
    if (req.body.hasOwnProperty(chave)) {
      model[chave] = req.body[chave];
    }
  }

  const data = await model.save();

  if (data) {
    res.json({ success: true, data, form: req.body });
  } else {
    res.json({ success: false, data, err: "Erro ao salvar, tente novamente.", form: req.body });
  }*/
};