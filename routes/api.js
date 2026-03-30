const express = require("express");
const router = express.Router();

router.get("/status", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

router.get("/projects", (req, res) => {
  res.json([
    { name: "Project A", status: "active", type: "web" },
    { name: "Project B", status: "inactive", type: "api" }
  ]);
});

router.get("/secure-data", (req, res) => {
  const key = req.headers["x-api-key"];
  if (key === "zenqor123") {
    res.json({ secret: "Zenqor secure data" });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = router;
