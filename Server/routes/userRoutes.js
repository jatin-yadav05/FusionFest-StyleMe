const {registeration,login, googleLogin} =require('../controllers/UserDetails') 
const {order,payment}=require("../controllers/Razorpay")
let router=require("express").Router();
router.post('/register',registeration)
router.post('/login',login);
router.post('/order',order)
router.get("/payment/:paymentId",payment)
router.get("/google",googleLogin);
module.exports=router;
