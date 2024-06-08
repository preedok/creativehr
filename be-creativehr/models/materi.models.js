const { query } = require("express");
const db = require("../connection");

const getAllMateri = async () => {
    try {
        const query = db`SELECT * FROM public."materi"`;
        return query;
    } catch (error) {
        return error;
    }
};

const getMateriById = async (id) => {
    try {
        const query = await db`SELECT * FROM public."materi" WHERE id = ${id}`;
        return query;
    } catch (error) {
        return error;
    }
};

const getBukuByUserId = async (user_id) => {
    try {
        const query = await db`SELECT * FROM public."materi" WHERE user_id = ${user_id}`;
        return query;
    } catch (error) {
        return error;
    }
};
const insertMateriData = async (payload) => {
    const query = await db`INSERT INTO public."materi"
 (user_id, materi, pemateri, video, deskripsi)
VALUES(${payload.user_id}, ${payload.materi}, ${payload.pemateri},  ${payload.video}, ${payload.deskripsi})`;
    return query;
};

const editMateriData = async (payload, id) => {
    try {
        const query = await db`UPDATE public."materi" set ${db(
            payload,
            "materi",
            "pemateri",
            "video",
            "deskripsi"
        )} WHERE id = ${id} returning *`;
        return query;
    } catch (error) {
        return error;
    }
};

const deleteMateri = async (id) => {
    try {
        const query = await db`DELETE FROM public."materi" WHERE id = ${id} returning *`;
        return query;
    } catch (error) {
        return error;
    }
};


module.exports = {
    getAllMateri,
    getBukuByUserId,
    getMateriById,
    insertMateriData,
    editMateriData,
    deleteMateri
};
