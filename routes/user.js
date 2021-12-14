const { response } = require('express');
const express = require('express');
const router = express.Router();
const UserModel = require('./models/User.Model');
// jwt 用处是当login/register，我要set cookie
const jwt = require('jsonwebtoken');
// middleware
const auth_middleware = require('./auth_middleware.js')

// Returns all known users
router.get('/findAll', function(request, response) {
    UserModel.getAllUsers()
        .then((userResponse) => {
            response.status(200).send(userResponse)
        })  
        .catch(error => response.status(400).send(error))
})

// 这里用到了auth_middleware。
// whenever I make a request to this route, 
// first that request goes through off the middleware so we can look.
// 这里可以看一眼auth_middleware
// 注意：当你包含了auth_middleware，你得到的request obj就包含了username Im currently login 
router.get('/whoIsLoggedIn', auth_middleware, function(request, response) {
    const username = request.session.username;

    return response.send(username);

})
// ？
router.get('/whoIsLoggedInButWithoutMiddleware', function(request, response) {
    const username = request.session.username;

    return response.send(username);

})


router.get('/:username', (request, response) => {
  const username = request.params.username;
  if(!username) {
    return response.status(422).send("Missing data");
  }
  
  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
        if(!userResponse) {
            response.status(404).send("User not found");
        }

        response.send(userResponse)
    })
    .catch((error) => response.status(500).send("Issue getting user"))

  // pokemons.push({
  //   name: name,
  //   health: health,
  // })

  // response.send("Success!")

})
/
// /authenticate 实在user。js中create的！，注意是post method！ 
router.post('/authenticate', function(request, response) {
    let { username, password } = request.body;
    password = JSON.stringify(password);
    console.log(password);
    if (!username || !password) {
        return response.status(422).send('Must include both password and username');
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                return response.status(404).send("No user found with that username");
            }
            if (userResponse.password === password) {
                // payload就是我建立的一个obj
                // const payload = {username: username};
                // token是piece of data send with request
                // sign做的事儿就是encrype that payload based on super_secret
                // const token = jwt.sign(payload, "SUPER_DUPER_SECRET", {
                //     expiresIn: '14d',
                // });


                // 
                request.session.username = username;

                //return response.cookie('huntersCookie', token, {httpOnly: true})
                return response.status(200).send({username});

                // return response.status(200).send("User is logged in!")
            } else {
                return response.status(404).send("No user found with that password");
            }
        })


        //     // user.comparePassword(password, (error, match) => {
        //         if (match) {
        //             const payload = {username};
        //             // JWT is encrypting our payload (which is whatever data we want
        //             // to carry across sessions: in this case, just the username)
        //             // into the cookie based on our SECRET
        //             const token = jwt.sign(payload, process.env.SUPER_SECRET, {
        //                 expiresIn: '14d' // optional cookie expiration date
        //             });
        //             // Here we are setting the cookie on our response obect.  
        //             // Note that we are returning the username, but that isn't as necessary anymore
        //             // unless we want to reference that on the frontend
                       // cookie（）中，‘token’是我随意自定义的cookie name，
        //             return res.cookie('token', token, {httpOnly: true})
        //                 .status(200).send({username});
        //         }
        //         return res.status(400).send("The password does not match");
        //     });
        // })
        .catch((error) => console.error(`Something went wrong: ${error}`));


    // return UserModel.findUserByUsername(username)
    //     .then((userResponse) => {
    //         if (!userResponse) {
    //             return response.status(404).send("No user found with that username");
    //         }
    //         if (userResponse.password === password) {
    //             return response.status(200).send("User is logged in!")
    //         } else {
    //             return response.status(404).send("No user found with that password");
    //         }
    //     })
    //     .catch(error => res.status(400).send(error))


})


router.post('/', function(req, res) {
    const { username, password } = req.body;
    // const username = req.body.username
    // const password = req.body.password
    console.log(req.body);

    if (!username || !password) {
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    }
    // 如果insertuser成功的，req.session.username = username;这一句是我把username又send back了
    // 细节是，当你modify session obj，session library will make sure that value is updated 
    // to match the current session so if I were to change your name.
    return UserModel.insertUser({username: username, password: password})
        .then((userResponse) => {
            req.session.username = username;

            //return response.cookie('huntersCookie', token, {httpOnly: true})
            return res.status(200).send({username});
        })
        .catch(error => res.status(422).send(error))

});

router.post('/logout', function(req, res) {
    // no longer session tracking, im not fully destory the cookie, but destory the session
    req.session.destroy()
    return res.send("Ok");
})

module.exports = router;