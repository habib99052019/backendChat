const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  all
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.get("/all", all);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
