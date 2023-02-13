const b_users = require('../models/b_users');

class hospitalHelper {

    async findall(req,res){
        try{
                const users = await b_users.find()
               return users;
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }

    async getmonth(req,res){
        try{
                const users = await b_users.find({"month.January": 1})
                console.log(users);
               return users;
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }

    // async findall(body){
    //     try {
    //         let sql = `SELECT * FROM books`;
    //         console.log(sql);
    //         const book = await query(sql,[body])
    //         if (book.length == 0){
    //             throw 'BOOK_NOT_FOUND'
    //         }else{
    //             return book;// return book[0] if want to get only one data from movies table
    //         } 
    //     }catch (err){
    //         console.log(`there was an error ${err}`) 
    //     }
    // }

    // Retrieve and return all users from the database.
// exports.findAll = (req, res) => {
//     User.find()
//       .then(users => {
//       res.send(users);
//     }).catch(err => {
//       res.status(500).send({
//       message: err.message || "Something went wrong while getting list of users."
//     });
//     });
//     };



}

module.exports = new hospitalHelper()