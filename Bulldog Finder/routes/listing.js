import express from 'express'
import * as query from '../query.js'
import multer from 'multer'
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

//Listing Form Page
router.get("/new", async (req,res)=> {
    let key = 'tKunrUREgDCDiNhV6LiRBD34a'
    let my_id = 'c33dcd07b511230a2ad8'
    let np = new NPoint(key).Document(my_id)
    let JSON = await np.get()
    res.send(JSON);
})

//Add new listing post
router.post("/new", upload.single('photo'), async (req,res)=> {

    //Grab data from form
    let user_id = global.loginUser
    let title = req.body.title
    let description = req.body.description
    let price = req.body.price
    let distance = req.body.distance
    let image = req.file.filename 

    //Create new listing in database
    let result = await query.insertPost(user_id,title,description,price,distance,image)
    //Redirect to home page
    console.log(result)
    res.send({
        "metadata": {
            "version": "1",
            "redirectLink": {
                "relativePath": "..\/home"
            }
        }
    });
})

router
    .route("/:id")
    .get(async (req, res) => {
        let id = req.params.id
        let result = await query.getPost(id)
        //console.log(result)
        res.send(result)
    })
    .put(async (req, res) => {
        res.send("Update Post")
    })
    .delete(async (req, res) => {
        let id = req.params.id
        let result = await query.deletePost(id)
        //console.log(result)
        //res.send(result)
       res.send("Post has been deleted")
    })
export default router