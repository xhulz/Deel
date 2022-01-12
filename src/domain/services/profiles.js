const { profiles, jobs } = require("../../repository");

const getById = async (id) => {
  try {
    return await profiles.getById(id);
  } catch (error) {
    throw error;
  }
};

const getBestProfession = async (start, end) => {
  try {
    return await profiles.getBestProfession(start, end);
  } catch (error) {
    throw error;
  }
};

const getBestClients = async (start, end, limit) => {
  try {
    return await profiles.getBestClients(start, end, limit);
  } catch (error) {
    throw error;
  }
};

const doDeposit = async (clientId, deposit) => {
  try {
    // Get jobs from client
    const job = await jobs.getByClient(clientId);

    // Check if there is some job
    if (job.length === 0) return { status: 204, msg: "no content" };

    // Get the total value from jobs
    const jobTotal = job
      .map((item) => item.price)
      .reduce((prev, next) => prev + next);
    const percent =
      parseFloat(jobTotal) * parseFloat(process.env.DEPOSIT_PERCENTAGE);

    // Check if the deposit value is bigger then percent value of total jobs to pay
    if (parseFloat(deposit) > parseFloat(percent))
      return {
        status: 412,
        msg: "a client can't deposit more than 25% his total of jobs to pay",
      };

    // Update balance
    const balance =
      parseFloat(job[0].Contract.Client.balance) + parseFloat(deposit);

    await profiles.doDeposit(clientId, balance);
    return { status: 200 };
  } catch (error) {
    throw error;
  }
};

module.exports = { getById, doDeposit, getBestProfession, getBestClients };
