const router = require("express").Router();
const materiController = require("../controller/materi.controller");
const middleware = require("../middleware/jwt.middleware");

// get all data
router.get("/materi", materiController.getMateri);

// get materi by user
router.get("/materibyuser", middleware, materiController.getMateriByUser);

// get by id materi
router.get("/materi/:id", materiController.getMateriById);
router.post("/materi", middleware, materiController.insertMateriData);
router.put("/materi/:id", middleware, materiController.editMateriData);
router.delete("/materi/:id", middleware, materiController.deleteMateriData);

module.exports = router;