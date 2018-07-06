require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");

module.exports = {
    init(app, express){
        app.set("views", viewsFolder);
        app.set("view engine", "ejs");
<<<<<<< HEAD
        app.use(bodyParser.urlencoded({extended: true }));
=======
        app.use(bodyParser.urlencoded({ extended: true }));
>>>>>>> checkpoint-6-version2
        app.use(express.static(path.join(__dirname, "..", "assets")));
    }
};