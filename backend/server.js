const express = require("express"); //création de const express qui permet d'accéder à express
const cors = require("cors"); //permet aux différents serveurs d'échanger des données entre eux.
const mysql = require("mysql");

const app = express(); // permet d'utiliser les méthodes de l'objet express dans la variable "app"

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8081"],
  optionsSuccessStatus: 200, //some  legacy browsers (IE11, various  SmartTVs) choke on 204
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  headers: "Content-Type, Authorization",
  credentials: true, // allow cookies to be sent with requests
};

app.use(express.json());
app.use(cors(corsOptions));

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crudnode",
});

app.get("/", (req, res) => {
  // créé un endpoint a l'adresse "/" et ensuite il attend une requete et une reponse
  //req.json(Salut a toi depuis le backend"); // en reponse on renvoie le message
  const sql = "SELECT * FROM etudiant"; // créé la requete SQL pour recup toutes les infos du tableau
  database.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
app.post("/create", (req, res) => {
  // créé un endpoint a l'adresse "/" et ensuite il attend une requete et une reponse
  //req.json(Salut a toi depuis le backend"); // en reponse on renvoie le message
  const sql = "INSERT INTO etudiant (name,email) VALUES (?)"; // créé la requete SQL pour recup toutes les infos du tableau
  const values = [req.body.name, req.body.email];

  database.query(sql, [values], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
app.put("/update/:id", (req, res) => {
  // créé un endpoint a l'adresse "/" et ensuite il attend une requete et une reponse
  //req.json(Salut a toi depuis le backend"); // en reponse on renvoie le message
  const sql = "update etudiant set `name`=?, `email`=? where id=?"; // créé la requete SQL pour recup toutes les infos du tableau
  const values = [req.body.name, req.body.email];
  const id = req.params.id;
  database.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
app.delete("/student/:id", (req, res) => {
  // créé un endpoint a l'adresse "/" et ensuite il attend une requete et une reponse
  //req.json(Salut a toi depuis le backend"); // en reponse on renvoie le message
  const sql = "DELETE FROM etudiant WHERE id=?"; // créé la requete SQL pour recup toutes les infos du tableau
  const id = req.params.id;
  database.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
app.listen(8081, () => {
  //attribue le port 8081 au serveur et éxécute une fonction anonyme listen
  console.log("Server is running on port 8081");
});
