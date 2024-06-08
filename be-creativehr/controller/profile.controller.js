const model = require("../models/profile.models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

// function getToken(req) {
//   const token = req?.headers?.authorization?.slice(
//     7,
//     req?.headers?.authorization?.length
//   );
//   return token;
// }

async function getProfile(req, res) {
  try {
    const data = await model.getAllUser();
    res.send({
      status: true,
      message: "Success get data",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function getProfileById(req, res) {
  try {
    const {
      params: { id },
    } = req;

    if (isNaN(id)) {
      res.status(400).json({
        status: false,
        message: "ID must be integer",
      });
      return;
    }

    const query = await model.getProfileById(id);

    if (!query.length) {
      res.status(404).json({
        status: false,
        message: "Data not found",
      });
      return;
    }

    res.json({
      status: true,
      message: "Get data success",
      data: query,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Error not found",
    });
  }
}

async function getProfileByEmail(req, res) {
  try {
    const {
      params: { id },
    } = req;

    if (isNaN(id)) {
      res.status(400).json({
        status: false,
        message: "ID must be integer",
      });
      return;
    }

    const query = await model.getProfileByEmail(email);

    if (!query.length) {
      res.status(404).json({
        status: false,
        message: "Data not found",
      });
      return;
    }

    res.json({
      status: true,
      message: "Get data success",
      data: query,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Error not found",
    });
  }
}

async function addUsers(req, res) {
  try {
    const { email, password, nama, nohp, role } = req.body;
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
      password,
      nama,
      nohp,
      role
    };
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    payload.password = hash;
    const query = await model.addUser({ ...payload });

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

async function editUsers(req, res) {
  try {
    const userId = req.params.id;

    if (isNaN(userId)) {
      res.status(400).json({
        status: false,
        message: "ID must be an integer",
      });
      return;
    }

    const {
      body: {
        email,
        password,
        nama,
        nohp,
        badko,
        cabang,
        komisariat,
        lk1,
        lk2,
        lk3,
        sc,
        lklembaga,
        lkkohati,
        username,
        role
      },
    } = req;

    const checkData = await model.getProfileById(userId);

    if (!checkData.length) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
      return;
    }

    const payload = {
      email: email !== undefined ? email : checkData[0].email,
      password: password !== undefined ? password : checkData[0].password,
      nama: nama !== undefined ? nama : checkData[0].nama,
      nohp: nohp !== undefined ? nohp : checkData[0].nohp,
      badko: badko !== undefined ? badko : checkData[0].badko,
      cabang: cabang !== undefined ? cabang : checkData[0].cabang,
      komisariat: komisariat !== undefined ? komisariat : checkData[0].komisariat,
      lk1: lk1 !== undefined ? lk1 : checkData[0].lk1,
      lk2: lk2 !== undefined ? lk2 : checkData[0].lk2,
      lk3: lk3 !== undefined ? lk3 : checkData[0].lk3,
      sc: sc !== undefined ? sc : checkData[0].sc,
      lklembaga: lklembaga !== undefined ? lklembaga : checkData[0].lklembaga,
      lkkohati: lkkohati !== undefined ? lkkohati : checkData[0].lkkohati,
      role: role !== undefined ? role : checkData[0].role,
      username: username !== undefined ? username : checkData[0].username,
    };

    let query;
    if (password) {
      bcrypt.genSalt(saltRounds, async function (err, salt) {
        try {
          const hash = await bcrypt.hash(password, salt);
          query = await model.editProfile({ ...payload, password: hash }, userId);
          res.send({
            status: true,
            message: "Success edit data",
            data: query,
          });
        } catch (error) {
          res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        }
      });
    } else {
      query = await model.editProfile(payload, userId);
      res.send({
        status: true,
        message: "Success edit data",
        data: query,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function deleteUsers(req, res) {
  try {
    const { id } = req.params; 

    if (isNaN(id)) {
      res.status(400).json({
        status: false,
        message: "ID must be an integer",
      });
      return;
    }

    const checkData = await model.getProfileById(id);
    if (!checkData.length) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
      return;
    }

    const query = await model.deleteProfile(id);

    res.send({
      status: true,
      message: "Success delete data",
      data: query,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function editPhoto(req, res) {
  try {
    const { id } = req.params; 
    console.log("User ID:", id);

    const { photo } = req?.files ?? {};
    if (!photo) {
      res.status(400).send({
        status: false,
        message: "Photo is required",
      });
      return;
    }

    let mimeType = photo.mimetype.split("/")[1];
    let allowFile = ["jpeg", "jpg", "png", "webp"];

    if (!allowFile?.find((item) => item === mimeType)) {
      res.status(400).send({
        status: false,
        message: "Only accept jpeg, jpg, png, webp",
      });
      return;
    }

    if (photo.size > 2000000) {
      res.status(400).send({
        status: false,
        message: "File too big, max size 2MB",
      });
      return;
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLODUNARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const upload = cloudinary.uploader.upload(photo.tempFilePath, {
      public_id: new Date().toISOString(),
    });

    upload
      .then(async (data) => {
        const payload = {
          photo: data?.secure_url,
        };

        await model.editPhotoUser(payload, parseInt(id));

        res.status(200).send({
          status: true,
          message: "Success upload",
          data: payload,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: err.message || "Error uploading photo",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error on server",
    });
  }
}


module.exports = {
  getProfile,
  getProfileById,
  getProfileByEmail,
  editUsers,
  deleteUsers,
  editPhoto,
  addUsers
};
