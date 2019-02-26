const router = require("express").Router();
const knex = require("knex");

const knexConig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/rolex.db3"
  }
};
const db = knex(knexConig);

router.get("/", (req, res) => {
  // get the roles from the database
  db("roles")
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  res.send("Write code to retrieve all roles");
});

router.get("/:id", (req, res) => {
  // retrieve a role by id
  res.send("Write code to retrieve a role by id");
});

router.post("/", (req, res) => {
  // add a role to the database
  res.send("Write code to add a role");
});

router.put("/:id", (req, res) => {
  // update roles
  res.send("Write code to modify a role");
});

router.delete("/:id", (req, res) => {
  // remove roles (inactivate the role)
  res.send("Write code to remove a role");
});

module.exports = router;
