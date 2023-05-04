import express from 'express'
import * as query from '../query.js'

var router = express.Router()

//Add a new user
router.post("/new", async (req,res)=> {
    //Grab body content
    let rm_id = req.body.rm_id
    let user_id = req.body.user_id
    await query.insertfRM(rm_id,user_id)
    res.send("New favorite roommate has been added")
})

router.delete("/", async (req,res)=>{
    let user_id = req.body.user_id
    let rm_id = req.body.rm_id
    let result = await query.deletefRM(rm_id,user_id)
    //console.log(result)
    //res.send(result)
   res.send("Favortie roommate has been deleted")
})

router
    .route("/:id")
    .get(async (req, res) => {
        let id = req.params.id
        let result = await query.getfRM(id)
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