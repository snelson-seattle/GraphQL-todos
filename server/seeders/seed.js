const db = require("../config/dbConfig");
const { User } = require("../models");
const userSeeds = require("./userSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

    console.log("Finished seeding the database!");
    process.exit(0);
  } catch (error) {
    throw error;
  }
});
