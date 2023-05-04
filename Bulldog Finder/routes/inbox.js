import express from 'express'
import * as query from '../query.js'
import NPoint from 'npoint'
import * as fs from 'fs';

var router = express.Router()

//Inbox Page
router.get("", async (req,res)=> {
    //Currently logged in user
    let sender = global.loginUser

    //Inbox JSON template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a'
    let my_id = 'd6ec6389b07b45571535'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Get all of the different users that have messages with the sender
    let result = await query.getInbox(sender)

    //Create links to each chat
    for (let i = 0; i < result.length; i++) {
        //Skips if sender and reciever are the same
        if (result[i].id == sender) continue

        //Reciever ID
        let reciever = result[i].id

        //Inbox template
        let rawdata = fs.readFileSync('./templates/inbox.json');
        let post = JSON.parse(rawdata);

        //Gets reciever information
        let user_data = await query.getUser(reciever)
        let id = user_data.id
        let name = user_data.name 
        let image = user_data.image
        let url = "http://44.214.240.254:3000/picture/" + image

        //Last message between sender and reciever
        let message = await query.getChat(reciever,sender)
        let last_msg = message[message.length-1].chat_msg

        //Add user data to inbox template
        post.name = name
        post.description = last_msg
        post.image.url = url
        post.accessoryButton.link.relativePath = "../../chat/" + id
        
        //Add inbox into JSON
        json.content[1].content.push(post)
    }

    //Send completed json
    res.send(json);
})

export default router