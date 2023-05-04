import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'frodo',
    password: 'MyNewPass1!',
    database: 'BulldogFinderDB'
}).promise()

//Get user information based on ID
export async function getUser(id) {
    const [result] = await pool.query("SELECT * FROM users WHERE id=?",[id])
    return result[0]
}

//Checks if given email is used on any account
export async function emailExists(email) {
    const [result] = await pool.query("SELECT * FROM users WHERE email=?",[email])
    if (result.length == 1) return result[0]
    return false
}
//Insert a new user into the database
//WORK ON: Setting up a way to link a new inbox_id for each new user
//WORK ON: Make a check for no duplicate emails in user table
export async function insertUser(email,password,name,age,major,about_me,class_level,personality,image) {
   const [result] = await pool.query("Insert into users (email,password,name,age,major,about_me,class_level,personality,image) values(?,?,?,?,?,?,?,?,?)",[email,password,name,age,major,about_me,class_level,personality,image])
   //const [result] = await pool.query("Insert into characters (name,details) values(?,?)",["test","hello world"]) 
   //console.log(result)
   return result.insertId
}

//Delete a user based on ID
export async function deleteUser(id) {
    const [result] = await pool.query("Delete FROM users WHERE id=?",[id])
    return "User has been deleted"
}

export async function updateUser(user,password,name,age,major,about_me,class_level,image) {
    const [result] = await pool.query("UPDATE users set password=?,name=?,age=?,major=?,about_me=?,class_level=?,image=? WHERE id=?",[password,name,age,major,about_me,class_level,image,user])
    return "User has been deleted"
}

//Get listing post information based on ID
export async function getPost(id) {
    const [result] = await pool.query("SELECT * FROM listing WHERE list_id=?",[id])
    return result[0]
}

//Get listing post information based on ID
export async function getPostList() {
    const [result] = await pool.query("SELECT * FROM listing LIMIT 10")
    return result
}

//Insert a new post into the database
export async function insertPost(user_id,title,description,price,distance,image) {
    const [result] = await pool.query("INSERT into listing (user_id,title,description,price,distance,image) values(?,?,?,?,?,?)",[user_id,title,description,price,distance,image])
    return result
}

export async function checkPost(user) {
    const [result] = await pool.query("select * from listing where user_id =?",[user])
    return result
}

//Remove a post in the database based on ID
export async function deletePost(id) {
    const [result] = await pool.query("Delete FROM listing WHERE list_id=?",[id])
    return "Post has been deleted"
}

export async function updatePost(id,title,desc,price,distance,image) {
    const [result] = await pool.query("UPDATE listing set title=?,description=?,price=?,distance=?,image=? WHERE list_id=?",[title,desc,price,distance,image,id])
   // console.log(result)
    return "Post has been updated"
}

//Get roommate post information based on ID
export async function getRM(id) {
    const [result] = await pool.query("SELECT * FROM roommate WHERE rm_id=?",[id])
    return result[0]
}

//Get roommate post information based on ID
export async function getRMlist() {
    const [result] = await pool.query("SELECT * FROM roommate LIMIT 10")
    return result
}

//Insert a new roommate post into the database
export async function insertRM(user_id,title,description,budget,image) {
    const [result] = await pool.query("INSERT into roommate (user_id,title,description,budget,image) values(?,?,?,?,?)",[user_id,title,description,budget,image])
    return "Roommate Post Added"
}

//Remove a roommate post in the database based on ID
export async function deleteRM(id) {
    const [result] = await pool.query("Delete FROM roommate WHERE rm_id=?",[id])
    return "Roommate Post has been deleted"
}

export async function checkRM(user) {
    const [result] = await pool.query("select * from roommate where user_id =?",[user])
    return result
}

export async function updateRM(id,title,desc,budget,image) {
    const [result] = await pool.query("UPDATE roommate set title=?,description=?,budget=?,image=? WHERE rm_id=?",[title,desc,budget,image,id])
    console.log(result)
    return "Post has been updated"
}

//Get the chat between two users
export async function getChat(reciever, sender) {
    const [result] = await pool.query("SELECT * FROM chat WHERE (reciever_id=? && sender_id =?) || (reciever_id=? && sender_id =?)",[reciever,sender,sender,reciever])
    let chat_size = result.length
  //  return chat_size
    return result
}

//Adds a message to the chat 
export async function insertChat(message,sender,reciever) {
    const [result] = await pool.query("INSERT into chat (chat_msg, chat_date, reciever_id, sender_id) values(?,CURRENT_TIMESTAMP(),?,?)",[message,reciever,sender])
    return "Chat added"
}

//Gets the favorite listings of a user
export async function getfList(user_id) {
    const [result] = await pool.query("SELECT * from f_listing WHERE user_id =?",[user_id])
    let f_list_size = result.length
    return result[0]
}

//Adds a favorite listing to a user
export async function insertfList(list_id, user_id) {
    const [result] = await pool.query("INSERT into f_listing (list_id, user_id) values(?,?)",[list_id,user_id])
    return "Favorite list added"
}

//Removes a favorite listing of a user
export async function deletefList(list_id, user_id) {
    const [result] = await pool.query("DELETE FROM f_listing WHERE list_id=? && user_id=?",[list_id,user_id])
    return "Favorite list deleted"
}

//Gets the favorite roommates of a user
export async function getfRM(user_id) {
    const [result] = await pool.query("SELECT * from f_roommate WHERE user_id =?",[user_id])
    let f_RM_size = result.length
    return result[0]
}

//Adds a favorite roommate to a user
export async function insertfRM(rm_id, user_id) {
    const [result] = await pool.query("INSERT into f_roommate (rm_id, user_id) values(?,?)",[rm_id,user_id])
    return "Favorite roommate added"
}

//Removes a favorite rommate of a user
export async function deletefRM(rm_id, user_id) {
    const [result] = await pool.query("DELETE FROM f_roommate WHERE rm_id=? && user_id=?",[rm_id,user_id])
    return "Favorite roommate deleted"
}

//Signing into a user's account
export async function signIn(email,password) {
    //Checks if account with given email exists
    let temp = await emailExists(email)
    //Email doesn't exists in database
    if (!temp) return false
    //Checks user's password with given password
    if (temp.password == password) return true
    return false
}

export async function getInbox(id) {
    const [result] = await pool.query("SELECT distinct reciever_id as id from chat where (reciever_id = ? || sender_id = ?) union SELECT distinct sender_id from chat where (reciever_id = ? || sender_id = ?);",[id,id,id,id])
    return result
}