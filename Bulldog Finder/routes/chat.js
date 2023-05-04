import express from 'express'
import * as query from '../query.js'
import NPoint from 'npoint'
import * as fs from 'fs';
import { checkPrimeSync } from 'crypto';

var router = express.Router()
//Chat Page
router.get("/:id", async (req,res)=> {
    //Get chat page template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a'
    let my_id = '84fa2ad5bb1d562f437c'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Grabs user and reciever id's
    let reciever = req.params.id
    let sender = global.loginUser

    //Searches messages between the two users
    let messages = await query.getChat(reciever,sender)

    //Grabs User info of reciever
    let reciever_data = await query.getUser(reciever)
    let image = reciever_data.image
    let url = "http://44.214.240.254:3000/picture/" + image
    let name = reciever_data.name

    //Add reciever data to JSON
    json.content[1].content[0].name = name
    json.content[1].content[0].image.url = url

    //HTML tags for the chat
    let start = "<div style=\"font-size: 1.05rem; display: flex; flex-direction: column;\">"
    let middle = ""
    let end = "</div>"

    //Create the message bubbles bewtween two users
    for (let i = 0; i < messages.length; i++) {
        //Checks who sent the message
        if (messages[i].sender_id == sender) {
            //Text from User: Blue message
            let p = "<p style=\"align-self: flex-end; background-color: #248bf5; color: #fff; border-bottom-left-radius: 0.8rem 0.7rem; transform: translate(0, -0.1rem); border-bottom-left-radius: 0.5rem; text-align: right; padding: 0 0.3rem\">"
            let message = p + messages[i].chat_msg + " </p> "
            middle += message
        }
        else {
            //Text from other: Grey message
            let p = "<p style=\"align-self: flex-start; background-color: #e5e5ea; color: #000; border-bottom-right-radius: 0.8rem 0.7rem; padding: 0 0.3rem\"> "
            let message = p + messages[i].chat_msg + " </p> "
            middle += message
        }

    }
    //Add all parts of the chat together and add it to the json
    let html = start + middle + end
    json.content[3].content[0].html = html

    //Change relative path to reciever
    json.content[4].relativePath = "../../chat/addMSG/" + reciever
    res.send(json);
})

//Add message to chat POST Request
router.post("/addMSG/:id", async (req,res)=> {
    //Grab reciever and sender IDs
    let reciever = req.params.id
    let sender = global.loginUser

    //Add message between sender/reciever to database
    let msg = req.body.message
    await query.insertChat(msg,sender,reciever)
    
    //Refresh chat page
    res.send({
        "metadata": {
            "version": "1",
            "redirectLink": {
                "relativePath": "..\/chat/" + reciever
            }
        }
    });
    
})


export default router