const { registerController } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerController);
