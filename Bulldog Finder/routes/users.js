import express from 'express'
import * as query from '../query.js'
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

//Calculaltes the user's personality color based on answers
async function calcPersonality(data) {
    //Score totals for personality quiz
    let score = {Blue: 0, Red: 0, Gold: 0, Green:0}
    //Add scores to corresponding colors
    for (const key in data) {
        //Skips over POST data if it's not a answer to the personality test questions
        if(key[0]!= 'q') continue
        //Question wasn't answered
        if(data[key] == '') return false
        //Grabs color of answer
        let color = data[key].split(' ')[0]
        //if (color == "Submit") continue
        //Grabs value of answer
        let value = parseInt(data[key].split(' ')[1])
        //Adds to score total
        score[color] += value
      }
    //Final personality color
    let personality = Object.keys(score).reduce(function(a, b){ return score[a] > score[b] ? a : b });
    console.log(score)
    console.log(personality)
    return personality
}

//Add a new user
router.post("/new", upload.single('photo'), async (req,res)=> {
    //Grab body content
    let data = req.body
    let pfp = req.file

    //Calculate personality color
    let color = await calcPersonality(data)

    //Grab email and password from form
    let email = req.body.email
    let password = req.body.password

    //Check password for uppercase, number, and special character
    let uppercase = Boolean(password.match(/[A-Z]/))
    let number = /\d/.test(password)
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    let special = specialChars.test(password);

    //POST request fails if email/password fails to meet conditions or color fails to calculate
    if (!color || email.split("@")[1] != "mail.fresnostate.edu" || !uppercase || !number || !special) {
        //res.sendStatus(404)
        console.log("Bad color, email, or password")
        res.send({
            "metadata": {
                "version": "1",
                /*"redirectLink": {
                    "relativePath": "..\/onboarding"
                }*/
            }
        });
    }
    //Grabs data from POST request and add to database
    else {
      //  let email = req.body.email
        let password = req.body.password
        let name = req.body.firstName + " " + req.body.lastName
        let age = req.body.age
        let major = req.body.major
        let about_me = req.body.about_me
        let class_level = req.body.class_level
        let personality = color
        let image = req.file.filename 
        let newID = await query.insertUser(email,password,name,age,major,about_me,class_level,personality,image)
        //Send some JSON for successful POST
       // res.send({"metadata": {"version": "1"}})
       res.send({
        "metadata": {
            "version": "1",
            "redirectLink": {
                "relativePath": "..\/quizResult/" + personality
            }
        }
    });
    }
})


router
    .route("/:id")
    .get(async (req, res) => {
        let id = req.params.id
        let result = await query.getUser(id)
        //console.log(result)
        res.send(result)
    })
    .put(async (req, res) => {
        res.send("Update User")
    })
    .delete(async (req, res) => {
        let id = req.params.id
        let result = await query.deleteUser(id)
        //console.log(result)
        //res.send(result)
       res.send("User has been deleted")
    })

export default router