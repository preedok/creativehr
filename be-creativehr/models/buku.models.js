const db = require("../connection");

const getAllBuku = async () => {
  try {
    const query = db`SELECT * FROM public."buku"`;
    return query;
  } catch (error) {
    return error;
  }
};

const getBukuById = async (id) => {
  try {
    const query = await db`SELECT * FROM public."buku" WHERE id = ${id}`;
    return query;
  } catch (error) {
    return error;
  }
};

const getBukuByUserId = async (user_id) => {
  try {
    const query = await db`SELECT * FROM public."buku" WHERE user_id = ${user_id}`;
    return query;
  } catch (error) {
    return error;
  }
};

const insertBukuData = async (payload) => {
  const query = await db`INSERT INTO public."buku"
 (user_id, judul, penulis, jumlah, cover, file)
VALUES(${payload.user_id}, ${payload.judul}, ${payload.penulis},  ${payload.jumlah}, ${payload.cover}, ${payload.file})`;
  return query;
};

const editBukuData = async (payload, id) => {
  try {
    const query = await db`UPDATE public."buku" set ${db(
      payload,
      "judul",
      "penulis",
      "jumlah",
      "cover",
      "file"
    )} WHERE id = ${id} returning *`;
    return query;
  } catch (error) {
    return error;
  }
};

const deleteBuku = async (id) => {
  try {
    const query = await db`DELETE FROM public."buku" WHERE id = ${id} returning *`;
    return query;
  } catch (error) {
    return error;
  }
};

const editPhotoBuku = async (payload, id) => {
  try {
    const query = await db`UPDATE public."buku" set ${db(
      payload,
      "cover"
    )} WHERE id = ${id} returning *`;
    return query;
  } catch (error) {
    return error;
  }
};


module.exports = {
  getAllBuku,
  getBukuById,
  insertBukuData,
  editBukuData,
  deleteBuku,
  editPhotoBuku,
  getBukuByUserId
};
