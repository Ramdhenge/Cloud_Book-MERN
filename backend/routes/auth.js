const express = require('express')
const router = express.Router()
const User = require('../models/UserSch')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "thiscouldbeanything"

// Rout 1
// create a user using : POST "/api/auth/createuser". *No login required
router.post('/createuser', [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', "Enter valid email").isEmail(),
    body('password', 'password should be minimum 3 char').isLength({ min: 3 })
], async (req, res) => {
    let success = false
    //If there are any errors then returns Bad request
    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(400).json({success, err: err.array() })
    }
    try {
        // check email already exist or not
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({success, err: "Email already exist" })
        }
        // create the user if email does not exist
        else {
            const salt = await bcrypt.genSalt(10)
            const secpassword = await bcrypt.hash(req.body.password, salt)

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secpassword
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)
            success = true
            res.json({success, authtoken });
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send(success,'Internal server error')
    }
})

// Rout 2
// User Login using : POST "/api/auth/login". *No login required
router.post('/login', [
    body('email', "Enter valid email").isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const err = validationResult(req)
    let success = false
    if (!err.isEmpty()) {
        return res.status(400).json({ err: err.array() })
    }

    const { email, password } = req.body
    try {
        // Check email is correct or not
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        // compare password and check 
        const passwordbcrypt = await bcrypt.compare(password, user.password)
        if (!passwordbcrypt) {
            success = false
            return res.status(400).json({ success, error: "Invalid credentials" })
        }

        // if everything is correct then send user id and token
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.send({ success, authtoken });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal server error')
    }
})

// Rout 3
// Get data of loggedin user using : POST "/api/auth/getdata". *login required
router.post('/getdata', fetchuser, async (req, res) => {
    try {
        // get access of all fields of user, except password
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal server error')
    }
})

module.exports = router