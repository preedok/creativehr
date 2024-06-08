const db = require("../connection");
const model = require("../models/profile.models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  try {
    const {
      body: { email, password },
    } = req;

    if (!(email && password)) {
      res.status(400).json({
        status: false,
        message: "Bad input",
      });
      return;
    }

    const checkEmail = await model.getProfileByEmail(email);
    if (!checkEmail?.length) {
      res.status(400).json({
        status: false,
        message: "Email Salah",
      });
      return;
    }

    // Load hash from your password DB.
    bcrypt.compare(password, checkEmail[0]?.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          { ...checkEmail[0], password: null },
          process.env.PRIVATE_KEY
        );

        res.json({
          status: true,
          message: "Get data success",
          data: checkEmail,
          token,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Password Salah",
        });
        return;
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Error not found",
    });
  }
}

async function insertUsers(req, res) {
  try {
    const { email, password, nama, nohp, username } = req.body;
    // validasi input
    if (!(email && password && nama && nohp)) {
      res.status(400).json({
        status: false,
        message: "Bad input, please complete all of fields",
      });
      return;
    }
    // check if email already exists in the database
    const emailExists = await model.getProfileByEmail(email);
    if (emailExists.length > 0) {
      res.status(400).json({
        status: false,
        message: "Email already exists",
      });
      return;
    }
    const payload = {
      email,
      username,
      password,
      nama,
      nohp,
    };
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    payload.password = hash;
    const query = await model.insertProfile({ ...payload });

    res.json({
      status: true,
      message: "Success insert data",
      data: payload,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error,
    });
  }
}

module.exports = {
  loginUser,
  insertUsers
};
