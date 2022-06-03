
  const express = require("express");
  const Razorpay = require("razorpay")

  const app = express();
  const port = 3000;

  const bodyparser = require("body-parser")

  app.use(require("body-parser").json());

  var instance = new Razorpay({
    key_id: 'rzp_test_16yFfaWUQscXZS',
    key_secret: 'xjdlbL19m3LurMP9jZRSq5ZR',
  })

  app.post('/create/orderID',(req,res)=>{
      console.log("create orderID request",req.body);
      var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "rcp1"
      };
      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.send({orderID:order.id});
      });
  })

  app.post("/api/payment/verify",(req,res)=>{

    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
   
     var crypto = require("crypto");
     var expectedSignature = crypto.createHmac('sha256', 'xjdlbL19m3LurMP9jZRSq5ZR')
                                     .update(body.toString())
                                     .digest('hex');
                                     console.log("sig received " ,req.body.response.razorpay_signature);
                                     console.log("sig generated " ,expectedSignature);
     var response = {"signatureIsValid":"false"}
     if(expectedSignature === req.body.response.razorpay_signature)
      response={"signatureIsValid":"true"}
         res.send(response);
     });
   
   app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`)
   })

  