const { profiles } = require("../../domain/services");

const getBestProfession = async (req, res) => {
  try {
    const { start, end } = req.query;
    const profile = await profiles.getBestProfession(start, end);

    const status = profile == null ? 204 : 200;
    res.status(status).json(profile);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBestClients = async (req, res) => {
  try {
    const { start, end, limit } = req.query;
    const profile = await profiles.getBestClients(start, end, limit);

    const status = profile == null ? 204 : 200;
    res.status(status).json(profile);
  } catch (error) {
    res.status(500).json(error);
  }
};

const doDeposit = async (req, res) => {
  try {
    const clientId = req.params.userId;
    const { deposit } = req.body;
    const profile = await profiles.doDeposit(clientId, deposit);

    if (profile.msg) res.status(profile.status).json(profile);
    else res.status(profile.status).json();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { doDeposit, getBestProfession, getBestClients };
