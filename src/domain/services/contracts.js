const { contracts } = require("../../repository");

const getById = async (id) => {
  try {
    return await contracts.getById(id);
  } catch (error) {
    throw error;
  }
};

const getByProfile = async (id, profileId) => {
  try {
    return await contracts.getByProfile(id, profileId);
  } catch (error) {
    throw error;
  }
};

const getAll = async (profileId) => {
  try {
    return await contracts.getAll(profileId);
  } catch (error) {
    throw error;
  }
};

module.exports = { getById, getByProfile, getAll };
