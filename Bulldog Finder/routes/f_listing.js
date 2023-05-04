import express from 'express'
import * as query from '../query.js'

var router = express.Router()

//Add a new user
router.post("/new", async (req,res)=> {
    //Grab body content
    let list_id = req.body.list_id
    let user_id = req.body.user_id
    await query.insertfList(list_id,user_id)
    res.send("New favorite listing has been added")
})

router.delete("/", async (req,res)=>{
    let user_id = req.body.user_id
    let list_id = req.body.list_id
    let result = await query.deletefList(list_id,user_id)
    //console.log(result)
    //res.send(result)
   res.send("User has been deleted")
})

router
    .route("/:id")
    .get(async (req, res) => {
        let id = req.params.id
        let result = await query.getfList(id)
        //console.log(result)
        res.send(result)
    })
    .put(async (req, res) => {
        res.send("Update User")
    })
    .delete(async (req, res) => {
       res.send("no")
    })

export default router