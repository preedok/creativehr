const router = require("express").Router();
const bukuController = require("../controller/buku.controller");
const middleware = require("../middleware/jwt.middleware");

// get all data
router.get("/buku", bukuController.getBuku);
// get by id buku
router.get("/buku/:id", bukuController.getBukuById);
// get buku by user
router.get("/bukubyuser", middleware, bukuController.getBukuByUser);
router.post("/buku", middleware, bukuController.insertBukuData);
router.put("/buku/:id", middleware, bukuController.editBukuData);
router.delete("/buku/:id", middleware, bukuController.deleteBukuData);
router.put("/buku/photo/:id", middleware, bukuController.editCover);

module.exports = router;
