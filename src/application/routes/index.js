const { celebrate, Segments } = require("celebrate");
const express = require("express");

const router = express.Router();
const { contracts, jobs, profiles } = require("../controllers");
const { getProfile, getContractByProfile } = require("../middleware/auth");
const { profilesValidation } = require("../middleware/validations/index");

/// CONTRACT ROUTES ///

router.get(
  "/contracts/:id",
  [getProfile, getContractByProfile],
  contracts.getById
);
router.get("/contracts", getProfile, contracts.getAll);

/// JOB ROUTES ///

router.get("/jobs/unpaid", getProfile, jobs.getUnpaid);
router.post("/jobs/:job_id/pay", getProfile, jobs.doPayment);

/// PROFILE ROUTES ///

router.get(
  "/admin/best-profession",
  [
    getProfile,
    celebrate({ [Segments.QUERY]: profilesValidation.getBestProfession }),
  ],
  profiles.getBestProfession
);
router.get(
  "/admin/best-clients",
  [
    getProfile,
    celebrate({ [Segments.QUERY]: profilesValidation.getBestClients }),
  ],
  profiles.getBestClients
);
router.post(
  "/balances/deposit/:userId",
  [getProfile, celebrate({ [Segments.BODY]: profilesValidation.doDeposit })],
  profiles.doDeposit
);

module.exports = router;
