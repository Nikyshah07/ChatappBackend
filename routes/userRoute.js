const express=require('express');
const { isLogin } = require('../middleware/isLogin.js');
const {getUserBySearch,getChatters }=require('../routControlers/userHandleController.js')
const router=express.Router()


router.get('/searchess', isLogin, getUserBySearch)
router.get('/current',isLogin,getChatters)

module.exports=router