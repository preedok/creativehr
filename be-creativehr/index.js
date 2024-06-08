const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // node_modules
const helmet = require("helmet");
const xssClean = require("xss-clean");
const cors = require("cors");

const fileUpload = require("express-fileupload");

app.use(helmet());

app.use(xssClean());

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded());
// parse application/json
app.use(bodyParser.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const profileRoutes = require("./routes/profile.routes");
const bukuRoutes = require("./routes/buku.routes");
const authUser = require("./routes/auth.routes");
const materiRoutes = require("./routes/materi.routes");
const beritaRoutes = require("./routes/berita.routes");
const kegiatanRoutes = require("./routes/kegiatan.routes");

app.use(profileRoutes);
app.use(bukuRoutes);
app.use(authUser);
app.use(materiRoutes);
app.use(beritaRoutes);
app.use(kegiatanRoutes);

const port = process.env.PORT || 3000;
app.get("/", function (req, res) {
  res.send("Api is running Well!");
});
app.listen(port, "0.0.0.0", function () {
  console.log("Listening on Port " + port);
});
