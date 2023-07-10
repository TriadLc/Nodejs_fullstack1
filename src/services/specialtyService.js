const { reject } = require("lodash");
const db = require("../models");

let createNewSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: `Missing parameters!`,
        });
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });

        resolve({
          errCode: 0,
          errMessage: `Everything is OK~`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllSpecialtyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: `Everything is OK~`,
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewSpecialtyService: createNewSpecialtyService,
  getAllSpecialtyService: getAllSpecialtyService,
};
