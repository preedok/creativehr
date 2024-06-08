const db = require("../connection");

const getAllKegiatan = async () => {
    try {
        const query = db`SELECT * FROM public."kegiatan"`;
        return query;
    } catch (error) {
        return error;
    }
};

const getById = async (id) => {
    try {
        const query = await db`SELECT * FROM public."kegiatan" WHERE id = ${id}`;
        return query;
    } catch (error) {
        return error;
    }
};

const getKegiatanByUserId = async (user_id) => {
    try {
        const query = await db`SELECT * FROM public."kegiatan" WHERE user_id = ${user_id}`;
        return query;
    } catch (error) {
        return error;
    }
};

const insertKegiatanDatas = async (payload) => {
    const query = await db`
        INSERT INTO public."kegiatan" 
        (user_id, nama_kegiatan, penyelenggara, startdate, endate, alamat, cover, bank, nama_rek, nama_qr, kode_qr, deskripsi) 
        VALUES 
        (
            ${payload.user_id}, 
            ${payload.nama_kegiatan},  
            ${payload.penyelenggara},  
            ${payload.startdate}, 
            ${payload.endate}, 
            ${payload.alamat}, 
            ${payload.cover}, 
            ${payload.bank}, 
            ${payload.nama_rek}, 
            ${payload.nama_qr}, 
            ${payload.kode_qr}, 
            ${payload.deskripsi}
        )`;
    return query;
};

const editKegiatanData = async (payload, id) => {
    try {
        const query = await db`UPDATE public."kegiatan" set ${db(
            payload,
            "nama_kegiatan",
            "penyelenggara",
            "startdate",
            "endate",
            "alamat",
            "cover",
            "bank",
            "nama_rek",
            "nama_qr",
            "kode_qr",
            "deskripsi"
        )} WHERE id = ${id} returning *`;
        return query;
    } catch (error) {
        return error;
    }
};

const deleteKegiatan = async (id) => {
    try {
        const query = await db`DELETE FROM public."kegiatan" WHERE id = ${id} returning *`;
        return query;
    } catch (error) {
        return error;
    }
};

const editPhotoKegiatan = async (payload, id) => {
    try {
        const query = await db`UPDATE public."kegiatan" set ${db(
            payload,
            "cover"
        )} WHERE id = ${id} returning *`;
        return query;
    } catch (error) {
        return error;
    }
};

const editGambarQrKegiatan = async (payload, id) => {
    try {
        const query = await db`UPDATE public."kegiatan" set ${db(
            payload,
            "kode_qr"
        )} WHERE id = ${id} returning *`;
        return query;
    } catch (error) {
        return error;
    }
};


module.exports = {
    getAllKegiatan,
    getById,
    insertKegiatanDatas,
    editKegiatanData,
    deleteKegiatan,
    editPhotoKegiatan,
    getKegiatanByUserId,
    editGambarQrKegiatan
};
