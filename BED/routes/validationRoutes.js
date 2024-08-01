const express = require("express");
const authRoute = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const postModel = require("../models/postModels");

authRoute.get('/validateToken', async (req, res) => {
    let authHeaders = req.headers.authorization;

    let token = authHeaders && authHeaders.split(" ")[1];

    try {
        let result = jwt.verify(token, process.env.ACCESS_SECURITY_KEY)
        // console.log(result);

        let postData = await postModel.find();

        res.json({ payload: result, data: postData, status: true })
    } 
    catch (error) {
        res.json({msg:"Session Expired", status: false})
    }

})

authRoute.get("/validate",(req,res)=>{
    let authHeaders = req.headers.authorization;
    let token = authHeaders && authHeaders.split(" ")[1];

    try {
        let result = jwt.verify(token, process.env.ACCESS_SECURITY_KEY);
        res.json({msg:"Session Valid", status:true, data:result.user_name})
    } catch (error) {
        res.json({msg:"Session Expired", status:false})
    }
})

module.exports = authRoute;