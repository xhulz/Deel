const { Op } = require("sequelize");

const { sequelize } = require("./models");

const { Contract, Job, Profile } = sequelize.models;

const getById = async (id) => {
  try {
    return await Job.findOne({
      where: { id },
      include: [
        {
          model: Contract,
          include: [
            {
              association: "Contractor",
            },
            {
              association: "Client",
            },
          ],
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

const getUnpaid = async (profileId) => {
  try {
    return await Job.findAll({
      where: {
        paid: { [Op.eq]: null },
      },
      include: [
        {
          model: Contract,
          where: {
            status: { [Op.ne]: "terminated" },
            [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
          },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

const getByClient = async (clientId) => {
  try {
    return await Job.findAll({
      where: {
        paid: { [Op.eq]: null },
      },
      include: [
        {
          model: Contract,
          where: { ClientId: clientId },
          include: [
            {
              association: "Contractor",
            },
            {
              association: "Client",
            },
          ],
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

const doPayment = async (job) => {
  try {
    await sequelize.transaction(async () => {
      // Update client balance
      const clientBalance =
        parseFloat(job.Contract.Client.balance) - parseFloat(job.price);

      await Profile.update(
        { balance: clientBalance },
        { where: { id: job.Contract.ClientId } }
      );

      // Update contractor balance
      const contractorBalance =
        parseFloat(job.Contract.Contractor.balance) + parseFloat(job.price);

      await Profile.update(
        { balance: contractorBalance },
        { where: { id: job.Contract.ContractorId } }
      );

      // Update job status
      await Job.update(
        { paid: 1, paymentDate: new Date() },
        { where: { id: job.id } }
      );
    });

    return;
  } catch (error) {
    throw error;
  }
};

module.exports = { getById, getUnpaid, getByClient, doPayment };
