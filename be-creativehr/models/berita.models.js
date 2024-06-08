const db = require("../connection");

const getAllBerita = async () => {
    try {
        const query = db`SELECT * FROM public."berita"`;
        return query;
    } catch (error) {
        return error;
    }
};

const getById = async (id) => {
    try {
        const query = await db`SELECT * FROM public."berita" WHERE id = ${id}`;
        return query;
    } catch (error) {
        return error;
    }
};

const getBeritaByUserId = async (user_id) => {
    try {
        const query = await db`SELECT * FROM public."berita" WHERE user_id = ${user_id}`;
        return query;
    } catch (error) {
        return error;
    }
};

const insertBeritaData = async (payload) => {
    const query = await db`INSERT INTO public."berita" (user_id, judul, penulis, berita, photo) VALUES (${payload.user_id}, ${payload.judul}, ${payload.penulis}, ${payload.berita}, ${payload.photo})`;
    return query;
};
const editBeritaData = async (payload, id) => {
    try {
        const query = await db`UPDATE public."berita" set ${db(
            payload,
            "judul",
            "penulis",
            "berita",
            "photo"
        )} WHERE id = ${id} returning *`;
        return query;
    } catch (error) {
        return error;
    }
};

const deleteBerita = async (id) => {
    try {
        const query = await db`DELETE FROM public."berita" WHERE id = ${id} returning *`;
        return query;
    } catch (error) {
        return error;
    }
};

const editPhotoBerita = async (payload, id) => {
    try {
        const query = await db`UPDATE public."berita" set ${db(
            payload,
            "photo"
        )} WHERE id = ${id} returning *`;
        return query;
    } catch (error) {
        return error;
    }
};


module.exports = {
    getAllBerita,
    getById,
    insertBeritaData,
    editBeritaData,
    deleteBerita,
    editPhotoBerita,
    getBeritaByUserId
};
