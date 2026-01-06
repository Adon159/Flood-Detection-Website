const express = require("express");
const router = express.Router();
const {
  addResource,
  getAllResources,
  updateResource,
  deleteResource,
} = require("../controllers/reliefResourceController");


router.post("/admin/resources", addResource);
router.get("/admin/resources", getAllResources);
router.put("/admin/resources/:id", updateResource);
router.delete("/admin/resources/:id", deleteResource);

module.exports = router;