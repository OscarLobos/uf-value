const express = require("express");
const app = express();

const PORT = process.env.PORT || 5001;

app.get("api", (req, res) => {
  res.json({
    message: "Hola desde el servidor, aún no puedes guardar información",
  });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
