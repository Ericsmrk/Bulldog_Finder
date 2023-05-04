import express from 'express'
import * as query from '../query.js'
import NPoint from 'npoint'
import * as fs from 'fs';
import multer from 'multer'


var router = express.Router()

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

//Edit Roomies Page
router.get("/:id", async (req,res)=> {

    let id = req.params.id

    //Get Roomies info 
    let rm_data = await query.getRM(id)
    let rm = rm_data.rm_id
    let title = rm_data.title
    let desc = rm_data.description
    let budget = rm_data.budget.toString()

    console.log(rm_data)
    //Roomies Form Template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a'
    let my_id = 'a6ccfbf9ae4da617eea5'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Update JSON with roomies data
   // console.log(json.content)
    json.content[1].items[0].value = title
    json.content[1].items[1].value = desc
    json.content[1].items[2].value = budget

    json.content[1].relativePath = "../../editRM/" + rm

    res.send(json)
})

//Edit Roomies POST
router.post("/:id", upload.single('photo'), async (req,res)=> {
    let id = req.params.id
    let title = req.body.title
    let desc = req.body.description
    let budget = req.body.budget
    let image = req.file.filename
    console.log(id)
    await query.updateRM(id,title,desc,budget,image)
    res.send({
        "metadata": {
            "version": "1",
            "redirectLink": {
                "relativePath": "../../roomiesDetails/" + id
            }
        }
    });
})

export default router