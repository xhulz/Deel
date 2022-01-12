const { contracts } = require("../../domain/services");

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await contracts.getById(id);

    const status = contract == null ? 204 : 200;
    res.status(status).json(contract);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAll = async (req, res) => {
  try {
    const { profile } = req;
    const contract = await contracts.getAll(profile.id);

    const status = contract.length === 0 ? 204 : 200;
    res.status(status).json(contract);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getById, getAll };
