const { response } = require("express");
const express = require("express");
const router = express.Router();
const UserModel = require("./models/User.Model");
const JobModel = require("./models/Job.Model");
const jwt = require("jsonwebtoken");
const auth_middleware = require("./auth_middleware.js");

router.get("/findAll", function (request, response) {
  UserModel.getAllUsers()
    .then((userResponse) => {
      response.status(200).send(userResponse);
    })
    .catch((error) => response.status(400).send(error));
});

router.get("/whoIsLoggedIn", auth_middleware, function (request, response) {
  const username = request.session.username;
  return response.send(username);
});
// ？
router.get("/whoIsLoggedInButWithoutMiddleware", function (request, response) {
  const username = request.session.username;

  return response.send(username);
});

router.get("/:username", (request, response) => {
  const username = request.params.username;
  if (!username) {
    return response.status(422).send("Missing data");
  }

  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
      if (!userResponse) {
        response.status(404).send("User not found");
      }

      response.send(userResponse);
    })
    .catch((error) => response.status(500).send("Issue getting user"));
});

router.get("/findMyFavorites/:username", (request, response) => {
  const username = request.params.username;
  if (!username) {
    return response.status(422).send("Missing data");
  }

  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
      if (!userResponse) {
        response.status(404).send("User not found");
      }
      response.send(userResponse.favorites);
    })
    .catch((error) => response.status(500).send("Issue getting user"));
});

router.post("/authenticate", function (request, response) {
  let { username, password } = request.body;

  console.log(username, password);
  if (!username || !password) {
    return response
      .status(422)
      .send({ error: "Must include both password and username" });
  }

  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
      if (!userResponse) {
        console.log("1");
        return response.status(404).send({ error: "No user found" });
      }
      console.log(userResponse);
      if (userResponse.password == password) {
        console.log("2");
        request.session.username = username;
        return response.status(200).send({ name: username });
      } else {
        console.log("3");
        console.log(typeof userResponse.password);
        console.log(typeof password);

        return response.status(404).send({ error: "Wrong password" });
      }
    })

    .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.post("/", function (req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(422)
      .send("Missing username: " + username + "or password:" + password);
  }

  UserModel.findUserByUsername(username).then((userResponse) => {
    console.log(userResponse);
    if (userResponse === null) {
      return UserModel.insertUser({ username: username, password: password })
        .then((userResponse) => {
          req.session.username = username;

          return res.status(200).send({ username });
        })
        .catch((error) => res.status(422).send(error));
    } else {
      return res
        .status(422)
        .send("Existing username, please choose another one!");
    }
  });
});

router.post("/logout", function (req, res) {
  req.session.destroy();
  return res.send("Ok");
});

module.exports = router;
