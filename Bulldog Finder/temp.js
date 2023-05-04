import NPoint from 'npoint'
import * as query from './query.js'

import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'

import  userRouter from './routes/users.js'
import  listingRouter from './routes/listing.js'
import  rmRouter from './routes/roommate.js'
import  fListRouter from './routes/f_listing.js'
import  fRMRouter from './routes/f_roommate.js'

import {fs} from 'fs';

//import { log } from 'console'

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

var app = express()
app.use(express.json())

app.use(bodyParser.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

//Routes for POST requests
app.use('/users', userRouter)
app.use('/listing', listingRouter)
app.use('/roommate', rmRouter)
app.use('/fListing', fListRouter)
app.use('/fRoommate', fRMRouter)

//User ID of logged in user
global.loginUser = 0

//Home Page
app.get("/home", async (req,res)=> {
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

//Roomies Details Page
app.get("/roomiesDetails/:id", async (req,res)=> {
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

//Housing Listing Page
app.get("/listDetails/:id", async (req,res)=> {
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

//User Details Page
app.get("/userPage/:id", async (req,res)=> {
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

//Onboarding Page
app.get("/onboarding", async (req,res)=> {
    //Grab onboarding page template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a' // Bearer Token
    let my_id = 'faf2ae90fc206fd980e5'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Send JSON
    res.send(json)
})

//Images Link
app.get("/picture/:image", async (req,res)=> {
    //Grab image name
    let image = req.params.image
    //Sends image from upload folder
    res.sendFile("/home/ec2-user/Bulldog Finder/uploads/"+image)
})

/*
//Sign In Page
app.get("/signIn", async (req,res)=> {
    //console.log(req.body)
    let key = 'tKunrUREgDCDiNhV6LiRBD34a'
    let my_id = 'f84d7b5a534052dd9e59'
    let np = new NPoint(key).Document(my_id)
    let JSON = await np.get()
    res.send(JSON);
})
*/

//Sign In POST request
app.post("/signIn", async (req,res)=> {
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
                    "relativePath": ".\/home"
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

//Chat Page
app.get("/chat/:id", async (req,res)=> {
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
    json.content[4].relativePath = "../../addMSG/" + reciever
    res.send(json);
})

//Add message to chat POST Request
app.post("/addMSG/:id", async (req,res)=> {
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

//Inbox Page
app.get("/inbox", async (req,res)=> {

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

//Personality Quiz Result Page
app.get("/quizResult/:personality", async (req,res)=> {
    //Grab personaility of created user    
    let personality = req.params.personality
    
    //Variables to display
    let color = ""
    let desc = ""
    let byline = ""
    let url = "http://44.214.240.254:3000/picture/"

    //Blue Personality info
    if (personality == "Blue") {
        color = personality
        byline = "Calm and caring"
        url += "blue.jpg"
        desc = "A blue personality type values harmony, connection and empathy. In a living space, blues may appreciate a roommate who is considerate and supportive, and who shares their values of communication and cooperation."
    }
    //Red Personality info
    else if (personality == "Red") {
        color = personality
        byline = "Ambitious and Energetic"
        url += "red.jpg"
        desc = "A red personality type values power, achievement and control. They may be highly competitive and enjoy taking risks. In a living space, reds may appreciate a roommate who is equally motivated and goal-oriented, and who can help push them to achieve their own objectives."
    }
    //Green Personality info
    else if (personality == "Green") {
        color = personality
        byline = "Logical and Analytical"
        url += "green.jpg"
        desc = "A green personality type values knowledge, logic and analytical skills. Rational and objective. In a living space, greens may appreciate a roommate who is intellectually stimulating and who shares their interest in exploring new ideas and concepts"
    }
    //Gold Personality info
    else  {
        color = personality
        byline = "Creative and optimistic"
        url += "gold.jpg"
        desc = "A gold personality type values stability, tradition and order. Golds tend to be reliable and responsible. In a living space, golds may appreciate a roommate who is dependable and trustworthy, and who can help them maintain a sense of structure and stability in their daily lives."
    }

    //JSON template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a'
    let my_id = 'c1ef1ad8a915a096914f'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()
    
    //Update json with personality color information
    json.content[1].description = color
    json.content[1].byline = byline
    json.content[1].body = desc
    json.content[1].thumbnail.url = url
    res.send(json)
})

//Edit Profile Page
app.get("/editProfile/:id", async (req,res)=> {
    let id = req.params.id
    //Get user info 
    let user_data = await query.getUser(id)
    let email = user_data.email
    let password = user_data.password
    let name = user_data.name.split(" ")
    let first = name[0]
    let last = name[1]
    let age = user_data.age
    let about_me = user_data.about_me
    let personality = user_data.personality

    //Get JSON template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a'
    let my_id = 'd581e84c09088afdf2fd'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Update json with user data
    json.content[1].items[0].value = email
    json.content[1].items[1].value = password
    json.content[1].items[2].value = first
    json.content[1].items[3].value = last
    json.content[1].items[4].value = age.toString()
    json.content[1].items[7].value = about_me
    json.content[1].items[9].value = personality

    //Change POST Request destination
    json.content[1].relativePath = "../../editProfile/" + id

    res.send(json)
})

//Edit Profile Post Request
app.post("/editProfile/:id", upload.single('photo'), async (req,res)=> {

    //Grab data of POST request
    let id = req.params.id

    let password = req.body.password
    let name = req.body.firstName + " " + req.body.lastName
    let age = req.body.age
    let major = req.body.major
    let about_me = req.body.about_me
    let class_level = req.body.class_level
    let image = req.file.filename 

    //Update user with new data
    await query.updateUser(id,password,name,age,major,about_me,class_level,image)

    //Redirect user to their profile
    res.send({
        "metadata": {
            "version": "1",
            "redirectLink": {
                "relativePath": "../../userPage/" + id
            }
        }
    });

})

//Edit Housing Listing Page
app.get("/editListing/:id", async (req,res)=> {

    let id = req.params.id

    //Get Listing info 
    let list_data = await query.getPost(id)
    let list = list_data.list_id
    let title = list_data.title
    let price = list_data.price
    let distance = list_data.distance
    let desc = list_data.description

    //Listing Form Template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a'
    let my_id = 'd38655919fd5ba8d0766'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Update json with listing data
    json.content[1].items[0].value = title
    json.content[1].items[1].value = desc
    json.content[1].items[2].value = price.toString()
    json.content[1].items[3].value = distance.toString()

    json.content[1].relativePath = "../../editListing/" + list


    //Send completed JSON
    res.send(json)
})

//Edit Housing Listing POST
app.post("/editListing/:id", upload.single('photo'), async (req,res)=> {

    //Get listing info from POST Request
    let id = req.params.id
    let title = req.body.title
    let desc = req.body.description
    let distance = req.body.distance
    let price = req.body.distance
    let image = req.file.filename

    //Update listing with new data
    await query.updatePost(id,title,desc,price,distance,image)

    //Redirect to listing page
    res.send({
        "metadata": {
            "version": "1",
            "redirectLink": {
                "relativePath": "../../listDetails/" + id
            }
        }
    });

})

//Edit Roomies Page
app.get("/editRM/:id", async (req,res)=> {

    let id = req.params.id

    //Get Roomies info 
    let rm_data = await query.getRM(id)
    let rm = rm_data.rm_id
    let title = rm_data.title
    let desc = rm_data.description
    let budget = rm_data.budget.toString()

    console.log(rm_data)
    //Roomies Form Template
    let key = 'tKunrUREgDCDiNhV6LiRBD34a'
    let my_id = 'a6ccfbf9ae4da617eea5'
    let np = new NPoint(key).Document(my_id)
    let json = await np.get()

    //Update JSON with roomies data
   // console.log(json.content)
    json.content[1].items[0].value = title
    json.content[1].items[1].value = desc
    json.content[1].items[2].value = budget

    json.content[1].relativePath = "../../editRM/" + rm

    res.send(json)
})

//Edit Roomies POST
app.post("/editRM/:id", upload.single('photo'), async (req,res)=> {
    let id = req.params.id
    let title = req.body.title
    let desc = req.body.description
    let budget = req.body.budget
    let image = req.file.filename
    console.log(id)
    await query.updateRM(id,title,desc,budget,image)
    res.send({
        "metadata": {
            "version": "1",
            "redirectLink": {
                "relativePath": "../../roomiesDetails/" + id
            }
        }
    });
})

//Listen for requests
app.listen(3000,(err)=>{
    if(err) {
        console.log(err)
     }
     else console.log("On Port 3000")
})

export default { loginUser };
