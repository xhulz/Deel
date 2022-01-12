const { Joi } = require("celebrate");

const doDeposit = Joi.object().keys({
  deposit: Joi.number().required(),
});

const getBestProfession = Joi.object().keys({
  start: Joi.date().required(),
  end: Joi.date().min(Joi.ref("start")).required(),
});

const getBestClients = Joi.object().keys({
  start: Joi.date().required(),
  end: Joi.date().min(Joi.ref("start")).required(),
  limit: Joi.number(),
});

module.exports = { doDeposit, getBestProfession, getBestClients };
