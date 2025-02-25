const { User } = require("../models/userModel.js");

const hh = async (req, res) => {
    return res.status(200).json({message:"error"})
};

module.exports = { hh };
