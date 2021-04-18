const express = require("express");

const router = express.Router();
const { Op } = require("sequelize");
const doctor = require("../db/models/doctor");
const practice = require("../db/models/practice");

router.use(express.json());

router.post("/search", async (req, res) => {
  try {
    const whereClausePractice = {};
    const whereClauseDoctors = {};
    if (req.body.doctor_name !== "") {
      whereClauseDoctors.doctor_name = {
        [Op.substring]: req.body.doctor_name,
      };
    }
    if (req.body.rating !== "") {
      whereClauseDoctors.rating = { [Op.gte]: req.body.rating };
    }
    if (req.body.specialty !== "") {
      const spec = [];
      spec.push(req.body.specialty);
      whereClauseDoctors.specialty = { [Op.overlap]: spec };
    }
    if (req.body.practice !== "") {
      whereClausePractice.name = { [Op.substring]: req.body.practice };
    }
    if (req.body.location !== "") {
      whereClausePractice.location = { [Op.substring]: req.body.location };
    }
    const doctorResult = await practice.findAll({
      include: [{ model: doctor, where: whereClauseDoctors }],
      where: whereClausePractice,
    });
    // console.log(doctorResult.dataValues);
    res.status(200).json({
      status: "success",
      data: doctorResult,
    });
  } catch (err) {
    // console.log(err);
  }
});

module.exports = router;
