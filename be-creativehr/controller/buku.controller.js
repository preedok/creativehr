const model = require("../models/buku.models");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

function getToken(req) {
  const token = req?.headers?.authorization?.slice(
    7,
    req?.headers?.authorization?.length
  );
  return token;
}

async function getBuku(req, res) {
  try {
    const data = await model.getAllBuku();
    res.send({
      status: true,
      message: "Success get data buku",
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

async function getBukuByUser(req, res) {
  try {
    const user = jwt.verify(getToken(req), process.env.PRIVATE_KEY);
    const data = await model.getBukuByUserId(user.id);
    res.send({
      status: true,
      message: "Success get data buku",
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

async function getBukuById(req, res) {
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

    const query = await model.getBukuById(id);

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
async function insertBukuData(req, res) {
  try {
    jwt.verify(getToken(req), process.env.PRIVATE_KEY, async (err, { id }) => {
      if (err) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized",
        });
      }
      const { judul, penulis, jumlah } = req.body;
      const { cover, file } = req.files;
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      });

      const coverUpload = cloudinary.uploader.upload(cover.tempFilePath, {
        folder: 'img/recipes',
        public_id: new Date().toISOString(),
      });
      const fileUpload = cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'pdf/files',
        public_id: new Date().toISOString(),
      });
      const [coverData, fileData] = await Promise.all([coverUpload, fileUpload]);
      const payload = {
        user_id: id,
        judul,
        penulis,
        jumlah,
        cover: coverData.secure_url,
        file: fileData.secure_url,
      };
      const query = await model.insertBukuData(payload);
      return res.json({
        status: true,
        message: 'Success insert data',
        data: query,
      });
    });
  } catch (error) {
    console.error('Error in insertBukuData:', error);
    res.status(500).json({
      status: false,
      message: 'Server error',
    });
  }
}
async function editBukuData(req, res) {
  try {
    const {
      params: { id },
      body: { judul, penulis, jumlah, file },
    } = req;

    if (isNaN(id)) {
      res.status(400).json({
        status: false,
        message: "ID must be integer",
      });

      return;
    }

    const checkData = await model.getBukuById(id);

    if (!checkData.length) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });

      return;
    }

    const payload = {
      judul: judul ?? checkData[0].judul,
      penulis: penulis ?? checkData[0].penulis,
      jumlah: jumlah ?? checkData[0].jumlah,
      tanggal: tanggal ?? checkData[0].tanggal,
      file: file ?? checkData[0].file,
    };

    const query = await model.editBukuData(payload, id);

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
}
async function deleteBukuData(req, res) {
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

    const checkData = await model.getBukuById(id);

    // validasi jika id yang kita mau edit tidak ada di database
    if (!checkData.length) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });

      return;
    }

    const query = await model.deleteBuku(id);

    res.send({
      status: true,
      message: "Success delete data",
      data: query,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
async function editCover(req, res) {
  try {
    const { id } = req.params;
    const checkData = await model.getBukuById(id);
    const { cover } = req?.files ?? {};

    if (!cover) {
      res.status(400).send({
        status: false,
        message: "Cover is required",
      });
    }

    let mimeType = cover.mimetype.split("/")[1];
    let allowFile = ["jpeg", "jpg", "png", "webp"];

    if (!allowFile?.find((item) => item === mimeType)) {
      res.status(400).send({
        status: false,
        message: "Only accept jpeg, jpg, png, webp",
      });
    }

    // validate size image
    if (photo.size > 2000000) {
      res.status(400).send({
        status: false,
        message: "File to big, max size 2MB",
      });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLODUNARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const upload = cloudinary.uploader.upload(cover.tempFilePath, {
      public_id: new Date().toISOString(),
    });

    upload.then(async (data) => {
      const payload = {
        photo: data?.secure_url,
      };

      model.editPhotoBuku(payload, id);

      res.status(500).send({
        status: true,
        message: "Success upload",
        data: payload,
      });
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error on server",
    });
  }
}

module.exports = {
  getBuku,
  getBukuByUser,
  getBukuById,
  insertBukuData,
  editBukuData,
  deleteBukuData,
  editCover,
};
