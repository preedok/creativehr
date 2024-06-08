const router = require("express").Router();
const kegiatanController = require("../controller/kegiatan.controller");
const middleware = require("../middleware/jwt.middleware");

// get all data
router.get("/kegiatan", kegiatanController.getKegiatan);
// get by id buku
router.get("/kegiatan/:id", kegiatanController.getKegiatanById);
// get buku by user
router.get("/kegiatanbyuser", middleware, kegiatanController.getKegiatanByUser);
router.post("/kegiatan", middleware, kegiatanController.insertKegiatanData);
router.put("/kegiatan/:id", middleware, kegiatanController.editKegiatanData);
router.delete("/kegiatan/:id", middleware, kegiatanController.deleteKegiatanData);
router.put("/kegiatan/cover/:id", middleware, kegiatanController.editCoverKegiatan);
router.put("/kegiatan/kodeqr/:id", middleware, kegiatanController.editGambarQrKegiatan);

module.exports = router;
