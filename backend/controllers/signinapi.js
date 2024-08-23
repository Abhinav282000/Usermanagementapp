const Needer = require("../models/Useragain.js");
const bcrypt = require("bcrypt");

const authenticate_data = async (req, res) => {
  if (req.url === "/authenticate-data-for-login") {
    const { name, password } = req.body;

    try {
      const profile = await Needer.findOne({ name });
console.log(profile);
      if (!profile) {
        return res.status(404).json({ success: false, message: "User not exist" });
      }

      const isMatch = await bcrypt.compare(password, profile.password);

      if (isMatch) {
        // Here you should return the token and any other necessary 
        console.log(async()=>{await profile.generateToken()});
        res.status(200).json({ success: true, token: await profile.generateToken(), userId: profile._id.toString() });
      } else {
       return res.status(400).json({ success: false, message: "Password incorrect" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "An error occurred during authentication" });
    }
  }
};

module.exports = authenticate_data;
