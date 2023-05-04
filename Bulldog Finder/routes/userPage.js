import express from 'express'
import * as query from '../query.js'
import NPoint from 'npoint'
import * as fs from 'fs';

var router = express.Router()

//User Details Page
router.get("/:id", async (req,res)=> {
    //Grab User details template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a' // Bearer Token
    let my_id = 'fc1d02e314f459d69657'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Get user information from database
    let user = req.params.id
    let user_data = await query.getUser(req.params.id)

    let name = user_data.name
    let age = user_data.age.toString()
    let major = user_data.major
    let class_level = user_data.class_level
    let personality = user_data.personality
    let about_me = user_data.about_me
    let image = user_data.image
    let url = "http://44.214.240.254:3000/picture/" + image

    //Update page with user information
    json.content[0].url = url
    json.content[2].title = name
    json.content[2].description = "Age: " + age + "<br>" + "Major: " + major + "<br>" + "Class: " + class_level + "<br>" + "Personality: " + personality + "<br>"
    json.content[4].content[0].html = about_me

    //Checks if logined in user is looking at their own page
    if (user_data.id == global.loginUser) {
        //Allow user to edit own page
        json.content[6].buttons[0].link.relativePath = "../../editProfile/" + user_data.id
        json.content[6].buttons[0].title = "Edit"
    }
    else json.content[6].buttons[0].link.relativePath = "../../chat/" + user_data.id
    
    //Send completed JSON
    res.send(json)
})


export default router