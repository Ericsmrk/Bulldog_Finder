import express from 'express'
import * as query from '../query.js'
import NPoint from 'npoint'
import * as fs from 'fs';
import multer from 'multer'

//Configure server to allow photo uploading
var storage = multer.diskStorage({
    //Store images in /uploads folder
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    //Store as orginal file name
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

var router = express.Router()

//Edit Housing Listing Page
router.get("/:id", async (req,res)=> {

    let id = req.params.id

    //Get Listing info 
    let list_data = await query.getPost(id)
    let list = list_data.list_id
    let title = list_data.title
    let price = list_data.price
    let distance = list_data.distance
    let desc = list_data.description

    //Listing Form Template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a'
    let my_id = 'd38655919fd5ba8d0766'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Update json with listing data
    json.content[1].items[0].value = title
    json.content[1].items[1].value = desc
    json.content[1].items[2].value = price.toString()
    json.content[1].items[3].value = distance.toString()

    json.content[1].relativePath = "../../editListing/" + list


    //Send completed JSON
    res.send(json)
})

//Edit Housing Listing POST
router.post("/:id", upload.single('photo'), async (req,res)=> {

    //Get listing info from POST Request
    let id = req.params.id
    let title = req.body.title
    let desc = req.body.description
    let distance = req.body.distance
    let price = req.body.distance
    let image = req.file.filename

    //Update listing with new data
    await query.updatePost(id,title,desc,price,distance,image)

    //Redirect to listing page
    res.send({
        "metadata": {
            "version": "1",
            "redirectLink": {
                "relativePath": "../../listDetails/" + id
            }
        }
    });

})

export default router