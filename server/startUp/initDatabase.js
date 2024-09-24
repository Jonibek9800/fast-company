const Profession = require("../models/Profession");
const Qualities = require("../models/Qualities");

const professionsMock = require("../mock/professions.json");
const qualitiesMock = require("../mock/qualities.json");

module.exports = async () => {
  const professions = await Profession.find();
  if (professions.length !== professionsMock.length) {
    await createInitialEntity(Profession, professionsMock);
  }
  const qualities = await Qualities.find();
  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntity(Qualities, qualitiesMock);
  }
};

async function createInitialEntity(Model, mockData) {
  await Model.collection.drop();
  return Promise.all(
    mockData.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
