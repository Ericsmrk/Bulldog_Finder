import express from 'express'
import * as query from '../query.js'
import NPoint from 'npoint'
import * as fs from 'fs';

var router = express.Router()

//Home Page
router.get("", async (req,res)=> {
    //Grab home page JSON template
   let key = 'tKunrUREgDCDiNhV6LiRBD34a' // Bearer Token
   let id = 'b85336a492dd5faf3f65' // Document ID
   let np = new NPoint(key).Document(id)
   let json = await np.get()

   //Update more tab
   json.content[1].items[0].link.relativePath = "../../userPage/" + global.loginUser
   json.content[1].items[1].link.relativePath = "../../inbox"

   //Check if signed in user has any posts
   let housing = await query.checkPost(global.loginUser)
   let roomies = await query.checkRM(global.loginUser)

    //No housing post: Send user to create new listing
    if (housing.length == 0)  json.content[1].items[2].link.relativePath = "../../listing/new"  
    //Housing Post: Edit existing post
    else {
        let id = housing[0].list_id
        json.content[1].items[2].link.relativePath = "../../editListing/" + id
    }
    //No roomies post: Sender user to create new roomies post
    if (roomies.length == 0)  json.content[1].items[3].link.relativePath = "../../roommate/new"  
    //Roomies Post: Edit existing roomies post
    else {
        let id = roomies[0].rm_id
        json.content[1].items[3].link.relativePath = "../../editRM/" + id
    }


   //Get listing post data from database
   let list_data = await query.getPostList()

   //Create listing posts and add to JSON
    for (let i = 0; i < list_data.length; i++) {
        //Listing post template
        let rawdata = fs.readFileSync('./templates/listing_post.json');
        let post = JSON.parse(rawdata);

        //Insert database data to listing post
        let image = list_data[i].image
        let listing_id = list_data[i].list_id.toString()
        let price = list_data[i].price.toString()
        post.label = "$"+price+"/month"
        post.title = list_data[i].title
        post.description = ""
        post.image.url = "http://44.214.240.254:3000/picture/" + image
        post.link.relativePath = "../../listDetails/" + listing_id

        //Insert listing post into JSON
        json.content[2].tabs[0].content[1].items.push(post)
    }

    //Get roommate post data from database
    let user_data = await query.getRMlist()

    //Create roommate posts and add to JSON
    for (let i = 0; i < user_data.length; i++) {
        //Roommate post template
        let rawdata = fs.readFileSync('./templates/roommate.json');
        let post = JSON.parse(rawdata);

        //Add database data to roommate post
        let image  = user_data[i].image
        let rm_id = user_data[i].rm_id.toString()
        post.title = user_data[i].title
        post.description = ""
        post.image.url = "http://44.214.240.254:3000/picture/" + image
        post.link.relativePath = "../../roomiesDetails/" + rm_id
        //Insert listing post into JSON
        json.content[2].tabs[1].content[1].items.push(post)
            
    }

    //Send completed JSON
    res.send(json)
})

export default router