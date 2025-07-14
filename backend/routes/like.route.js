const express =require('express')
const router =express.Router()
const {toggleLike,getLikes}= require('../controllers/like.controller')
const {authUser} = require("../middleware/user.auth")


router.post ('/like',authUser,toggleLike)
router.get('/likes/:videoId',getLikes)

module.exports = router;