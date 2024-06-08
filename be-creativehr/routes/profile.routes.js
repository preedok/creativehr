const router = require("express").Router();
const profileController = require("../controller/profile.controller");
const middleware = require("../middleware/jwt.middleware");

router.get("/profile", profileController.getProfile);

router.get("/profile", middleware, profileController.getProfileById);

router.get("/profile/:id", profileController.getProfileById);

router.post("/profile/add-user", profileController.addUsers);

router.put("/profile/:id", profileController.editUsers);

//edit photo
router.put("/profile/photo/:id", middleware, profileController.editPhoto);

router.delete("/profile/:id", middleware, profileController.deleteUsers);

module.exports = router;
