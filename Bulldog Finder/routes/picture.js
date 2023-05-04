import express from 'express'
import * as query from '../query.js'
import NPoint from 'npoint'
import * as fs from 'fs';

var router = express.Router()

//Images Link
router.get("/:image", async (req,res)=> {
    //Grab image name
    let image = req.params.image
    //Sends image from upload folder
    res.sendFile("/home/ec2-user/Bulldog Finder/uploads/"+image)
})


export default router