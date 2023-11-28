const express = require("express");
const router = express.Router();

router.get("/:name", (request, response) => {
  response.send("lobby");
});

module.exports = router;
