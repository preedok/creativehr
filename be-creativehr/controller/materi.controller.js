const model = require("../models/materi.models");
const jwt = require("jsonwebtoken");

function getToken(req) {
  const token = req?.headers?.authorization?.slice(
    7,
    req?.headers?.authorization?.length
  );
  return token;
}

async function getMateri(req, res) {
    try {
        const data = await model.getAllMateri();
        res.send({
            status: true,
            message: "Success get data materi",
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
async function getMateriByUser(req, res) {
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
async function getMateriById(req, res) {
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

        const query = await model.getMateriById(id);

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
async function insertMateriData(req, res) {
    try {
        jwt.verify(getToken(req), process.env.PRIVATE_KEY, async (err, { id }) => { 
        const { materi, pemateri, video, deskripsi } = req.body;
        // Validasi input
        if (!(materi && pemateri && video && deskripsi)) {
            return res.status(400).json({
                status: false,
                message: 'Bad input, please complete all fields',
            });
        }
        const payload = {
            user_id: id,
            materi,
            pemateri,
            video,
            deskripsi
        };
        const query = await model.insertMateriData(payload);
        return res.json({
            status: true,
            message: 'Success insert data',
            data: query,
        });
    })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Server error',
        });
    }
}
async function editMateriData(req, res) {
    try {
        const {
            params: { id },
            body: { materi, pemateri, video, deskripsi },
        } = req;

        if (isNaN(id)) {
            res.status(400).json({
                status: false,
                message: "ID must be integer",
            });

            return;
        }

        const checkData = await model.getMateriById(id);

        if (!checkData.length) {
            res.status(404).json({
                status: false,
                message: "ID not found",
            });

            return;
        }

        const payload = {
            materi: materi ?? checkData[0].materi,
            pemateri: pemateri ?? checkData[0].pemateri,
            video: video ?? checkData[0].video,
            deskripsi: deskripsi ?? checkData[0].deskripsi
        };

        const query = await model.editMateriData(payload, id);

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
async function deleteMateriData(req, res) {
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

        const checkData = await model.getMateriById(id);

        // validasi jika id yang kita mau edit tidak ada di database
        if (!checkData.length) {
            res.status(404).json({
                status: false,
                message: "ID not found",
            });

            return;
        }

        const query = await model.deleteMateri(id);

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

module.exports = {
    getMateri,
    getMateriByUser,
    getMateriById,
    insertMateriData,
    editMateriData,
    deleteMateriData
};
