import express from 'express'
import * as query from '../query.js'
import NPoint from 'npoint'
import * as fs from 'fs';

var router = express.Router()

//Housing Listing Page
router.get("/:id", async (req,res)=> {
    //Grab listing info from database
    let list_data = await query.getPost(req.params.id)
    let user = list_data.user_id.toString()
    let title = list_data.title
    let desc = list_data.description
    let price = list_data.price.toString()
    let distance = list_data.distance.toString()
    let image = list_data.image
    let url = "http://44.214.240.254:3000/picture/" + image

    //Grab listing details JSON template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a' // Bearer Token
    let my_id = '2755d0833d3479c0bc7b'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Insert data into JSON
    let html =  "Distance from campus: " + distance + " miles " + "<br> <br>" + desc
    json.content[3].content[0].html = html
    json.content[1].label = "$"+price+"/month"
    json.content[1].title = title
    json.content[3].heading.buttons[0].link.relativePath = "../userPage/" + user
    json.content[0].items[0].items[0].image.url = url
    json.content[4].buttons[0].link.relativePath = "../home"

    //Send completed JSON
    res.send(json)
})


export default router