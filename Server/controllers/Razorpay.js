
const Razorpay=require("razorpay");
module.exports.order=async(req,res)=>{
const razorpay=new Razorpay({
    key_id:process.env.Razorpay_API_ID,
    key_secret:process.env.Razorpay_API_SECRET
})
const options={
    amount:req.body.amount,
    currency:req.body.currency,
    receipt:"receipt#1",
    payment_capture:1
}
try{

    const response=await razorpay.orders.create(options)
    res.json({
        order_id:response.id,
        amount:response.amount,
        currency:response.currency
    })
}catch(e){
    //error
}
}
module.exports.payment=async (req,res)=>{
    const {passwordId}=req.params;
    const razorpay=new Razorpay({
        key_id:process.env.Razorpay_API_ID,
        key_secret:process.env.Razorpay_API_SECRET
    }) 
    try{
        const payment=await razorpay.payments.fetch(passwordId)
        if(!payment){
            res.status(500).json("Error at razorpay loading")
        }
        res.json({
            status:payment.status,
            amount:payment.amount,
            method:payment.method,
            currency:payment.currency
        })
    }catch(e){
        console.log(e);
    }

}