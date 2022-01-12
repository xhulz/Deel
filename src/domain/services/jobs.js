const { jobs } = require("../../repository");

const getUnpaid = async (profileId) => {
  try {
    return await jobs.getUnpaid(profileId);
  } catch (error) {
    throw error;
  }
};

const getByClient = async (clientId) => {
  try {
    return await jobs.getByClient(clientId);
  } catch (error) {
    throw error;
  }
};

const doPayment = async (id, profile) => {
  try {
    // Get the job details
    const job = await jobs.getById(id);

    // Check if job exists
    if (!job) return { status: 204, msg: "no content" };

    // Check if client is the job owner
    if (profile.id !== job.Contract.ClientId) return { status: 401 };

    // Check client balance
    if (job.price > parseFloat(profile.balance))
      return { status: 402, msg: "no balance" };

    // Do the payment
    await jobs.doPayment(job);

    return { status: 200 };
  } catch (error) {
    throw error;
  }
};

module.exports = { getUnpaid, getByClient, doPayment };
