const { contracts, profiles } = require("../../domain/services");

const getProfile = async (req, res, next) => {
  const profileId = req.get("profile_id") || 0;

  // eslint-disable-next-line radix
  const profile = await profiles.getById(profileId);
  if (!profile) return res.status(401).end();
  req.profile = profile;
  next();
};

const getContractByProfile = async (req, res, next) => {
  const { id } = req.params;
  const profileId = req.get("profile_id") || 0;

  // eslint-disable-next-line radix
  const contract = await contracts.getByProfile(id, parseInt(profileId));
  if (!contract) return res.status(401).end();
  next();
};

module.exports = { getProfile, getContractByProfile };
