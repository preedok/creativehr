const db = require("../connection");

const getAllUser = async () => {
  try {
    const query = db`SELECT * FROM public."user"`;
    return query;
  } catch (error) {
    return error;
  }
};

const getProfileById = async (id) => {
  try {
    const query = await db`SELECT * FROM public."user" WHERE id = ${id}`;
    return query;
  } catch (error) {
    return error;
  }
};

const getProfileByEmail = async (email) => {
  try {
    const query =
      await db`SELECT * FROM public."user" WHERE LOWER(email) = LOWER(${email})`;
    return query;
  } catch (error) {
    return error;
  }
};

const addUser = async (payload) => {
  const query = await db`INSERT INTO public."user"
(email, "password", nama, nohp, role)
VALUES(${payload.email}, ${payload.password},  ${payload.nama}, ${payload.nohp}, ${payload.role})`;
  return query;
};

const editProfile = async (payload, id) => {
  try {
    const query = await db`UPDATE public."user" SET ${db(
      payload,
      "email",
      "password",
      "nama",
      "nohp",
      "badko",
      "cabang",
      "komisariat",
      "lk1",
      "lk2",
      "lk3",
      "sc",
      "lklembaga",
      "lkkohati",
      "username",
      "role",
    )} WHERE id = ${id} returning *`;
    return query;
  } catch (error) {
    return error;
  }
};

const deleteProfile = async (id) => {
  try {
    const query = await db`DELETE FROM public."user" WHERE id = ${id} returning *`;
    return query;
  } catch (error) {
    return error;
  }
};

const editPhotoUser = async (payload, id) => {
  try {
    const query = await db`UPDATE public."user" set ${db(
      payload,
      "photo"
    )} WHERE id = ${id} returning *`;
    return query;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUser,
  getProfileById,
  getProfileByEmail,
  editProfile,
  deleteProfile,
  editPhotoUser,
  addUser
};
