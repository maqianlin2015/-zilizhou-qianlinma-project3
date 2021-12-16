const { response } = require('express');
const express = require('express');
const router = express.Router();
const UserModel = require('./models/User.Model')
const JobModel = require('./models/Job.Model');
const jwt = require('jsonwebtoken');
// middleware
const auth_middleware = require('./auth_middleware.js')

// Returns all known users
router.get('/findAll', function (request, response) {
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
router.get('/whoIsLoggedIn', auth_middleware, function (request, response) {
    const username = request.session.username;
    return response.send(username);
})
// ？
router.get('/whoIsLoggedInButWithoutMiddleware', function (request, response) {
    const username = request.session.username;

    return response.send(username);

})


router.get('/:username', (request, response) => {
    const username = request.params.username;
    if (!username) {
        return response.status(422).send("Missing data");
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                response.status(404).send("User not found");
            }

            response.send(userResponse)
        })
        .catch((error) => response.status(500).send("Issue getting user"))
})

// router.get('/findMyFavorites/:username', async (request, response) => {
router.get('/findMyFavorites/:username', (request, response) => {
    const username = request.params.username;
    if (!username) {
        return response.status(422).send("Missing data");
    
    }
    // let userEntry = await UserModel.findUserByUsername(username);
    // return userEntry;

    // if (!userEntry) {
    //     return response.status(404);
    // }
    // let favorites = userEntry.favorites;
    // let jobArr = [];
    // for (let jobId of favorites) {
    //     let jobEntry = await JobModel.findJobById(jobId);
    //     if (!jobEntry) {
    //         jobArr.push(jobEntry);
    //     }
    // }
    // return jobArr;
    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                response.status(404).send("User not found");
            }
            response.send(userResponse.favorites)
        })
        .catch((error) => response.status(500).send("Issue getting user"))
})
 

// router.get('/findMyFavirotes/:username', (request, response) => {
//     const username = request.params.username;
//     if (!username) {
//         return response.status(422).send("Missing data");
//     }
//     return UserModel.findFavoriteJobIdListByUsername(username)
//         .then((userResponse) => {
//             if (!userResponse) {
//                 response.status(404).send("User not found");
//             }
//             response.send(userResponse)
//         })
//         .catch((error) => response.status(500).send("Issue getting user"))
// })



    router.post('/authenticate', function (request, response) {
        let { username, password } = request.body;
        // password = JSON.stringify(password);
        console.log(username, password);
        if (!username || !password) {
            return response.status(422).send('Must include both password and username');
        }
        // 可能request出错了：
        return UserModel.findUserByUsername(username)
            .then((userResponse) => {
                if (!userResponse) {
                    console.log("1");
                    return response.status(404).send("No user found");
                }
                console.log(userResponse);
                if (userResponse.password == password) {
                    console.log("2");
                    request.session.username = username;
                    return response.status(200).send({ username } + "is logged in!");
                } else {
                    console.log("3");
                    console.log(typeof userResponse.password);
                    console.log(typeof password);
                    
                    return response.status(404).send("Wrong password");
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
    })


router.post('/', function (req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    }

    UserModel.findUserByUsername(username)
        .then((userResponse) => {
            console.log(userResponse) 
            if (userResponse === null){//not found 
                return UserModel.insertUser({ username: username, password: password })
                .then((userResponse) => {
                    // 用session记下现在的username，这样register之后
                    req.session.username = username;
                    //return response.cookie('huntersCookie', token, {httpOnly: true})
                    return res.status(200).send({ username });
                })
                .catch(error => res.status(422).send(error))
            } else {
                return res.status(422).send("Existing username, please choose another one!")
            } 
        }); 

})

router.post('/logout', function (req, res) {
    // no longer session tracking, im not fully destory the cookie, but destory the session
    req.session.destroy()
    return res.send("Ok");
})

module.exports = router;