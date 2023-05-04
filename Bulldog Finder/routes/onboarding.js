import express from 'express'
import * as query from '../query.js'
import NPoint from 'npoint'

var router = express.Router()

//Onboarding Page
router.get("", async (req,res)=> {
    //Grab onboarding page template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a' // Bearer Token
    let my_id = 'faf2ae90fc206fd980e5'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Send JSON
    res.send(json)
})

//Sign In POST request
router.post("/signIn", async (req,res)=> {
    let data = req.body
    //Checks if email exists in database
    let result = await query.emailExists(req.body.email)

    //Logs in if password matches the one in the database
    if(result.password == req.body.password){
        console.log("Sign in success")
        global.loginUser = result.id
        console.log(global.loginUser)
        res.send({
            "metadata": {
                "version": "1",
                "redirectLink": {
                    "relativePath": "../../home"
                }
            }
        });
    }
    //Goes back to log in page
    else {
        console.log("Sign in fail")
        res.send({
            "metadata": {
                "version": "1",
                "redirectLink": {
                    "relativePath": ".\/onboarding"
                }
            }
        });
    }
})

export default router