const model = require("../models/berita.models");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

function getToken(req) {
    const token = req?.headers?.authorization?.slice(
        7,
        req?.headers?.authorization?.length
    );
    return token;
}
async function getBerita(req, res) {
    try {
        const data = await model.getAllBerita();
        res.send({
            status: true,
            message: "Success get data berita",
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
async function getBeritaByUser(req, res) {
    try {
        const user = jwt.verify(getToken(req), process.env.PRIVATE_KEY);
        const data = await model.getBeritaByUserId(user.id);
        res.send({
            status: true,
            message: "Success get data berita",
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
async function getBeritaById(req, res) {
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

        const query = await model.getById(id);

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
async function insertBeritaData(req, res) {
    try {
        jwt.verify(getToken(req), process.env.PRIVATE_KEY, async (err, { id }) => {
            if (err) {
                return res.status(401).json({
                    status: false,
                    message: "Unauthorized",
                });
            }
            const { judul, penulis, berita } = req.body;
            const { photo } = req.files;
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_KEY,
                api_secret: process.env.CLOUDINARY_SECRET,
            });

            try {
                const coverUpload = await cloudinary.uploader.upload(photo.tempFilePath, {
                    folder: 'img/recipes',
                    public_id: new Date().toISOString(),
                });
                const payload = {
                    user_id: id,
                    judul,
                    penulis,
                    berita,
                    photo: coverUpload.secure_url,
                };
                const query = await model.insertBeritaData(payload);
                return res.json({
                    status: true,
                    message: 'Success insert data',
                    data: query,
                });
            } catch (uploadError) {
                console.error('Error uploading cover image:', uploadError);
                res.status(500).json({
                    status: false,
                    message: 'Error uploading cover image',
                });
            }
        });
    } catch (error) {
        console.error('Error in insertBeritaData:', error);
        res.status(500).json({
            status: false,
            message: 'Server error',
        });
    }
}
async function editBeritaData(req, res) {
    try {
        const {
            params: { id },
            body: { judul, penulis, berita, photo },
        } = req;

        if (isNaN(id)) {
            res.status(400).json({
                status: false,
                message: "ID must be integer",
            });

            return;
        }

        const checkData = await model.getById(id);

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
            berita: berita ?? checkData[0].berita,
            photo: photo ?? checkData[0].photo,
        };

        const query = await model.editBeritaData(payload, id);

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
async function deleteBeritaData(req, res) {
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

        const checkData = await model.getById(id);

        // validasi jika id yang kita mau edit tidak ada di database
        if (!checkData.length) {
            res.status(404).json({
                status: false,
                message: "ID not found",
            });

            return;
        }

        const query = await model.deleteBerita(id);

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
async function editCoverBerita(req, res) {
    try {
        const { id } = req.params;
        const checkData = await model.getById(id);
        const { photo } = req?.files ?? {};

        if (!photo) {
            res.status(400).send({
                status: false,
                message: "Cover is required",
            });
        }

        let mimeType = photo.mimetype.split("/")[1];
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

        const upload = cloudinary.uploader.upload(photo.tempFilePath, {
            public_id: new Date().toISOString(),
        });

        upload.then(async (data) => {
            const payload = {
                photo: data?.secure_url,
            };

            model.editPhotoBerita(payload, id);

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
    getBerita,
    getBeritaByUser,
    getBeritaById,
    insertBeritaData,
    editBeritaData,
    deleteBeritaData,
    editCoverBerita,
};
