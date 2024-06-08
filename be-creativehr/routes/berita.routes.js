const router = require("express").Router();
const beritaController = require("../controller/berita.controller");
const middleware = require("../middleware/jwt.middleware");

// get all data
router.get("/berita", beritaController.getBerita);
// get by id buku
router.get("/berita/:id", beritaController.getBeritaById);
// get buku by user
router.get("/beritabyuser", middleware, beritaController.getBeritaByUser);
router.post("/berita", middleware, beritaController.insertBeritaData);
router.put("/berita/:id", middleware, beritaController.editBeritaData);
router.delete("/berita/:id", middleware, beritaController.deleteBeritaData);
router.put("/berita/photo/:id", middleware, beritaController.editCoverBerita);

module.exports = router;
