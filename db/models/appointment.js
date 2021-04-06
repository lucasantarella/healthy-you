const { Sequelize, DataTypes } = require("sequelize");
const db = require("../index");

const appointment = db.define(
  "appointment",
  {
    appointment_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    // practice_id: {
    //     type: DataTypes.UUID,
    //     allowNull: false
    // },
    // location_id: {
    //     type: DataTypes.UUID,
    //     allowNull: false
    // },
    doctor_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    // user_id: {
    //     type: DataTypes.UUID,
    //     allowNull: false
    // },
    // date: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // time: {
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     defaultValue: []
    // },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    reviewStatus: {
      type: DataTypes.STRING,
    },
  },
  { underscored: true }
);

module.exports = appointment;
