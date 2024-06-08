const model = require("../models/kegiatan.models");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

function getToken(req) {
    const token = req?.headers?.authorization?.slice(
        7,
        req?.headers?.authorization?.length
    );
    return token;
}
async function getKegiatan(req, res) {
    try {
        const data = await model.getAllKegiatan();
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
async function getKegiatanByUser(req, res) {
    try {
        const user = jwt.verify(getToken(req), process.env.PRIVATE_KEY);
        const data = await model.getKegiatanByUserId(user.id);
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
async function getKegiatanById(req, res) {
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
async function insertKegiatanData(req, res) {
    try {
        jwt.verify(getToken(req), process.env.PRIVATE_KEY, async (err, { id }) => {
            if (err) {
                return res.status(401).json({
                    status: false,
                    message: "Unauthorized",
                });
            }
            const { nama_kegiatan, penyelenggara, startdate, endate, alamat, bank, nama_rek, nama_qr, deskripsi } = req.body;
            const { cover } = req.files;
            const { kode_qr } = req.files;
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_KEY,
                api_secret: process.env.CLOUDINARY_SECRET,
            });

            try {
                const coverUpload = await cloudinary.uploader.upload(cover.tempFilePath, {
                    folder: 'img/recipes',
                    public_id: new Date().toISOString(),
                });
                const coverUploadQr = await cloudinary.uploader.upload(kode_qr.tempFilePath, {
                    folder: 'img/recipes',
                    public_id: new Date().toISOString(),
                });
                const payload = {
                    user_id: id,
                    nama_kegiatan,
                    penyelenggara,
                    startdate,
                    endate,
                    alamat,
                    bank,
                    nama_rek,
                    nama_qr,
                    deskripsi,
                    cover: coverUpload.secure_url,
                    kode_qr: coverUploadQr.secure_url
                };
                const query = await model.insertKegiatanDatas(payload);
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
async function editKegiatanData(req, res) {
    try {
        const {
            params: { id },
            body: { nama_kegiatan, penyelenggara, startdate, endate, alamat, bank, nama_rek, nama_qr, deskripsi, cover, kode_qr },
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
            nama_kegiatan: nama_kegiatan ?? checkData[0].nama_kegiatan,
            penyelenggara: penyelenggara ?? checkData[0].penyelenggara,
            startdate: startdate ?? checkData[0].startdate,
            endate: endate ?? checkData[0].endate,
            alamat: alamat ?? checkData[0].alamat,
            bank: bank ?? checkData[0].bank,
            nama_rek: nama_rek ?? checkData[0].nama_rek,
            nama_qr: nama_qr ?? checkData[0].nama_qr,
            deskripsi: deskripsi ?? checkData[0].deskripsi,
            cover: cover ?? checkData[0].cover,
            kode_qr: kode_qr ?? checkData[0].kode_qr,
        };

        const query = await model.editKegiatanData(payload, id);

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
async function deleteKegiatanData(req, res) {
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

        const query = await model.deleteKegiatan(id);

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
async function editCoverKegiatan(req, res) {
    try {
        const { id } = req.params;
        const checkData = await model.getById(id);
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
        if (cover.size > 2000000) {
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
                cover: data?.secure_url,
            };

            model.editPhotoKegiatan(payload, id);

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
async function editGambarQrKegiatan(req, res) {
    try {
        const { id } = req.params;
        const checkData = await model.getById(id);
        const { kode_qr } = req?.files ?? {};

        if (!cover) {
            res.status(400).send({
                status: false,
                message: "Cover is required",
            });
        }

        let mimeType = kode_qr.mimetype.split("/")[1];
        let allowFile = ["jpeg", "jpg", "png", "webp"];

        if (!allowFile?.find((item) => item === mimeType)) {
            res.status(400).send({
                status: false,
                message: "Only accept jpeg, jpg, png, webp",
            });
        }

        // validate size image
        if (kode_qr.size > 2000000) {
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

        const upload = cloudinary.uploader.upload(kode_qr.tempFilePath, {
            public_id: new Date().toISOString(),
        });

        upload.then(async (data) => {
            const payload = {
                kode_qr: data?.secure_url,
            };

            model.editGambarQrKegiatan(payload, id);

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
    getKegiatan,
    getKegiatanByUser,
    getKegiatanById,
    insertKegiatanData,
    editKegiatanData,
    deleteKegiatanData,
    editCoverKegiatan,
    editGambarQrKegiatan
};
