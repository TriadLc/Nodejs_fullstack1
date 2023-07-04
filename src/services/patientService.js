import { reject } from "lodash";
import db from "../models/index";
require("dotenv").config();

let postBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("tao da chay den day 0:", data);
    try {
      if (!data.email || !data.doctorId || !data.timeType || !data.date) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters!`,
        });
        console.log("tao da chay den day 1:", data);
      } else {
        console.log("tao da chay den day 2: ", data);
        //Upsert patient

        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });

        console.log("Check user: ", user[0]);

        //Create a booking record
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: `Save patient's information succeed~`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointmentService: postBookAppointmentService,
};
