const { Op } = require("sequelize");

const { sequelize } = require("./models");

const { Contract } = sequelize.models;

const getById = async (id) => {
  try {
    return await Contract.findOne({ where: { id } });
  } catch (error) {
    throw error;
  }
};

const getByProfile = async (id, profileId) => {
  try {
    return await Contract.findOne({
      where: {
        id,
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      },
    });
  } catch (error) {
    throw error;
  }
};

const getAll = async (profileId) => {
  try {
    return await Contract.findAll({
      where: {
        status: { [Op.ne]: "terminated" },
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { getById, getByProfile, getAll };
