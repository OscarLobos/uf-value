const express = require("express");
const app = express();
const mysql = require("mysql2");
const sequelize = require("./db-connection/sequelize.database");
const { Op } = require("sequelize");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const UFValueRoutes = require("./routes/ufvalues");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

dotenv.config();

const createDatabase = async () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  connection.query(`CREATE DATABASE IF NOT EXISTS uf_db`, (error, result) => {
    if (result) console.log(result);
    if (error) console.error(error);
  });

  connection.end();
};

const PORT = 3001;

app.use(cors({ origin: `http://localhost:${PORT}` }));
app.options("*", cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

require("./models/Assosiations");

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const url = "/api/v1";
app.use(`${url}/users`, userRoutes);
app.use(`${url}/ufvalues`, UFValueRoutes);

// app.use(express.static(path.join(__dirname, "../client/public")));

// app.get("/*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "../client/public/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

const sequelizeSync = async () => {
  await sequelize
    .sync()
    .then(async (response) => {
      const users = await User.count({
        where: { username: { [Op.in]: ["user", "admin"] } },
      });

      if (users <= 0) {
        const password = await bcrypt.hash("123456", 8);
        await User.bulkCreate(
          [
            { username: "user", password },
            { username: "admin", password },
          ],
          { validate: true }
        );
        console.log(`Database Created, Tables Sync, Users Created`);
      }
    })
    .catch((error) => console.error(error));
};

app.listen(PORT, async () => {
  await createDatabase();

  setTimeout(sequelizeSync, 2000);

  console.log(`server listening on port ${PORT}`);
});
