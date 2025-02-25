const express=require('express');
const { isLogin } = require('../middleware/isLogin.js');
const {hh}=require('../routControlers/hello.js')
const router=express.Router()


router.get('/sea', hh)


module.exports=router