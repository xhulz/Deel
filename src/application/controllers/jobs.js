const { jobs } = require("../../domain/services");

const getUnpaid = async (req, res) => {
  try {
    const profileId = req.profile.id;
    const job = await jobs.getUnpaid(profileId);

    const status = job == null ? 204 : 200;
    res.status(status).json(job);
  } catch (error) {
    res.status(500).json(error);
  }
};

const doPayment = async (req, res) => {
  try {
    const { job_id } = req.params;
    const { profile } = req;

    const job = await jobs.doPayment(job_id, profile);

    if (job.msg) res.status(job.status).json(job);
    else res.status(job.status).json();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { doPayment, getUnpaid };
