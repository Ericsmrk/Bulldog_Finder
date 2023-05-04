import express from 'express'
import * as query from '../query.js'
import multer from 'multer'
//import loginUser from '../server.js'
import NPoint from 'npoint'


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

//Roomies Form Page
router.get("/new", async (req,res)=> {
    //JSON Template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a'
    let my_id = '05cd116747b7777db74d'
    let np = new NPoint(key).Document(my_id)
    let JSON = await np.get()
    //Send JSON
    res.send(JSON);
})

//Add new roommate post
router.post("/new", upload.single('photo'), async (req,res)=> {
    //Grab form data
    let data = req.body
    let pfp = req.file
    let user_id = global.loginUser
    let title = req.body.title
    let description = req.body.description
    let budget = req.body.budget
    let image = req.file.filename 

    //Create new roomies post
    let result = await query.insertRM(user_id,title,description,budget,image)
    console.log(result)
    //Redirct to home page
    res.send({
        "metadata": {
            "version": "1",
            "redirectLink": {
                "relativePath": ".\/home"
            }
        }
    });
})

router
    .route("/:id")
    .get(async (req, res) => {
        let id = req.params.id
        let result = await query.getRM(id)
        //console.log(result)
        res.send(result)
    })
    .put(async (req, res) => {
        res.send("Update User")
    })
    .delete(async (req, res) => {
        let id = req.params.id
        let result = await query.deleteRM(id)
        //console.log(result)
        //res.send(result)
       res.send("Roomate has been deleted")
    })
export default router
