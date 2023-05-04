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

//Edit Profile Page
router.get("/:id", async (req,res)=> {
    let id = req.params.id
    //Get user info 
    let user_data = await query.getUser(id)
    let email = user_data.email
    let password = user_data.password
    let name = user_data.name.split(" ")
    let first = name[0]
    let last = name[1]
    let age = user_data.age
    let about_me = user_data.about_me
    let personality = user_data.personality

    //Get JSON template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a'
    let my_id = 'd581e84c09088afdf2fd'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Update json with user data
    json.content[1].items[0].value = email
    json.content[1].items[1].value = password
    json.content[1].items[2].value = first
    json.content[1].items[3].value = last
    json.content[1].items[4].value = age.toString()
    json.content[1].items[7].value = about_me
    json.content[1].items[9].value = personality

    //Change POST Request destination
    json.content[1].relativePath = "../../editProfile/" + id

    res.send(json)
})

//Edit Profile Post Request
router.post("/:id", upload.single('photo'), async (req,res)=> {
    //Grab data of POST request
    let id = req.params.id
    let password = req.body.password
    let name = req.body.firstName + " " + req.body.lastName
    let age = req.body.age
    let major = req.body.major
    let about_me = req.body.about_me
    let class_level = req.body.class_level
    let image = req.file.filename 

    //Update user with new data
    await query.updateUser(id,password,name,age,major,about_me,class_level,image)

    //Redirect user to their profile
    res.send({
        "metadata": {
            "version": "1",
            "redirectLink": {
                "relativePath": "../../userPage/" + id
            }
        }
    });

})

export default router