const { startOfDay, endOfDay } = require("date-fns");
const { Op } = require("sequelize");

const { sequelize } = require("./models");

const { Job, Profile } = sequelize.models;

const getById = async (id) => {
  try {
    return await Profile.findOne({ where: { id } });
  } catch (error) {
    throw error;
  }
};

const getBestProfession = async (start, end) => {
  try {
    return await Profile.findAll({
      attributes: [
        "profession",
        [sequelize.fn("SUM", sequelize.col("price")), "total_price"],
      ],
      include: [
        {
          association: "Contractor",
          attributes: [],
          where: {
            createdAt: {
              [Op.between]: [startOfDay(start), endOfDay(end)],
            },
          },
          duplicating: false,
          include: [
            {
              model: Job,
              attributes: [],
              where: {
                paid: { [Op.not]: null },
              },
              duplicating: false,
            },
          ],
        },
      ],
      group: ["profession"],
      having: { total_price: { [Op.gt]: 0 } },
      order: [[sequelize.literal("total_price"), "DESC"]],
      limit: 1,
    });
  } catch (error) {
    throw error;
  }
};

const getBestClients = async (start, end, limit) => {
  try {
    return await Profile.findAll({
      attributes: [
        "id",
        [sequelize.fn("SUM", sequelize.col("price")), "paid"],
        [sequelize.literal("firstName || ' ' || lastName"), "fullName"],
      ],
      include: [
        {
          association: "Client",
          attributes: [],
          where: {
            createdAt: {
              [Op.between]: [startOfDay(start), endOfDay(end)],
            },
          },
          duplicating: false,
          include: [
            {
              model: Job,
              attributes: [],
              where: {
                paid: { [Op.not]: null },
              },
              duplicating: false,
            },
          ],
        },
      ],
      group: ["profession"],
      having: { paid: { [Op.gt]: 0 } },
      order: [[sequelize.literal("paid"), "DESC"]],
      limit: limit || 2,
    });
  } catch (error) {
    throw error;
  }
};

const doDeposit = async (id, deposit) => {
  try {
    await Profile.update({ balance: deposit }, { where: { id } });
  } catch (error) {
    throw error;
  }
};

module.exports = { getById, doDeposit, getBestProfession, getBestClients };
