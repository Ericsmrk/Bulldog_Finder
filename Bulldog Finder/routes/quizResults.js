import express from 'express'
import * as query from '../query.js'
import NPoint from 'npoint'
import * as fs from 'fs';

var router = express.Router()

//Personality Quiz Result Page
router.get("/:personality", async (req,res)=> {
    console.log("hello")
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

export default router