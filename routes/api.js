const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

router.get("/status", (req, res) => {
  res.json({
    status: "online",
    developer: "zenqor"
  });
});

router.get("/secure-data", auth, (req, res) => {
  res.json({
    message: "Secure data access granted"
  });
});

router.get("/projects", (req, res) => {
  res.json([
    {
      name: "zenqor-api",
      type: "backend",
      status: "active"
    }
  ]);
});

module.exports = router;
