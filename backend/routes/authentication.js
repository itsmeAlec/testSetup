const express = require("express");
const router = express.Router();

router.get("/:name", (request, response) => {
  response.send("login");
});

module.exports = router;
