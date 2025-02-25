const express=require('express');
const router=express.Router();
const {sendMessage,getMessages}=require('../routControlers/messageoutContoller.js')
const {isLogin}=require('../middleware/isLogin.js');
// const { route } = require('./authUser.js');
router.post('/send/:id',isLogin ,sendMessage)
router.get('/:id',isLogin,getMessages)
module.exports=router