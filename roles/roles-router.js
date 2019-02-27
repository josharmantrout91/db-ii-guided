const router = require("express").Router();
const knex = require("knex");

const knexConig = require("../knexfile.js");
const db = knex(knexConig.development);

router.get("/", (req, res) => {
  // get the roles from the database
  db("roles")
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", async (req, res) => {
  // retrieve a role by id
  db("roles")
    .where({ id })
    .then(role => {
      res.status(200).json(role);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  // add a role to the database
  db("roles")
    .insert(req.body)
    .then(ids => {
      const id = [ids];

      db("roles")
        .where({ id })
        .first()
        .then(role => {
          res.status(200).json(role);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  // update roles
  db("roles")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db("roles")
          .where({ id: req.params.id })
          .first()
          .then(role => {
            res.status(200).json(role);
          });
      } else {
        res.status(404).json({ message: "role not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  // remove roles (inactivate the role)
  const id = req.params.id;
  db("roles")
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).json({ message: "role successfully deleted" });
      } else {
        res.status(404).json("unable to locate desired role");
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
