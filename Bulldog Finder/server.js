import NPoint from 'npoint'
import * as query from './query.js'

import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import * as fs from 'fs';

//Form Routers
import  userRouter from './routes/users.js'
import  listingRouter from './routes/listing.js'
import  rmRouter from './routes/roommate.js'
import  fListRouter from './routes/f_listing.js'
import  fRMRouter from './routes/f_roommate.js'
//Page Routers
import  onboardRouter from './routes/onboarding.js'
import  homeRouter from './routes/home.js'
import  roomiesDetailsRouter from './routes/roomiesDetails.js'
import  listDetailsRouter from './routes/listDetails.js'
import  userPageRouter from './routes/userPage.js'
import  pictureRouter from './routes/picture.js'
import  inboxRouter from './routes/inbox.js'
import  chatRouter from './routes/chat.js'
import  quizResultRouter from './routes/quizResults.js'
import  editProfileRouter from './routes/editProfile.js'
import  editListingRouter from './routes/editListing.js'
import  editRMRouter from './routes/editRM.js'

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

//Routes for different pages
app.use('/onboarding', onboardRouter)
app.use('/home', homeRouter)
app.use('/roomiesDetails', roomiesDetailsRouter)
app.use('/listDetails', listDetailsRouter)
app.use('/userPage', userPageRouter)
app.use('/picture', pictureRouter)
app.use('/inbox', inboxRouter)
app.use('/chat', chatRouter)
app.use('/quizResult', quizResultRouter)
app.use('/editProfile', editProfileRouter)
app.use('/editListing', editListingRouter)
app.use('/editRM', editRMRouter)


//User ID of logged in user
global.loginUser = 0

//Listen for requests
app.listen(3000,(err)=>{
    if(err) {
        console.log(err)
     }
     else console.log("On Port 3000")
})

