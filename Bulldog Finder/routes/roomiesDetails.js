import express from 'express'
import * as query from '../query.js'
import NPoint from 'npoint'
import * as fs from 'fs';

var router = express.Router()

//Roomies Details Page
router.get("/:id", async (req,res)=> {
    //Grab roomies info from database
    let rm_data = await query.getRM(req.params.id)
    let user = rm_data.user_id.toString()
    let title = rm_data.title
    let desc = rm_data.description
    let budget = rm_data.budget
    let image = rm_data.image
    let url = "http://44.214.240.254:3000/picture/" + image

    //Grab roomies details JSON template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a' // Bearer Token
    let my_id = 'bbf156e0f812808dda70'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Insert data into JSON
    let html =  "Budget: $" + budget + "<br> <br>" + desc
    json.content[3].content[0].html = html
    json.content[1].label = ""
    json.content[1].title = title
    json.content[4].buttons[0].link.relativePath = "../home"
    json.content[0].items[0].items[0].image.url = url
    json.content[3].heading.buttons[0].link.relativePath = "../userPage/" + user

    //Send completed JSON
    res.send(json)
})

export default router