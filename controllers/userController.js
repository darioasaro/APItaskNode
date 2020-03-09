const db = require('../config/connection')
const table = 'users' //ERROR toma comillas.
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

exports.login = (req, res) => {
    
    console.log("body",req.body);
  
    //-----------------------
    var username = req.body.user;
    var password = req.body.pass;
    if(username&&password){

    db.connection.query(`SELECT pass from users WHERE name = ?`,[username],
    (err,row)=>{
        if(err){
            res.status(500).json({'result':false,'message':'errorDb'})
        }
        else{
            if(row.length>0){
                bcrypt.compare(password, row[0].pass)
                .then((samePass)=>{
                    if(!samePass){
                        res.status(403).json({'result':false,'message':'unAutorizhed'})
                    }
                    res.json({'result':true,'message':'ok'})

                })

            }
            else{
                res.status(403).json({'result':false,'message':'user not found'})
            }
        }
    })
   
}   
     


    //-----------------------
    
    
    
    
    
    
    
    
    // if (user && pass) {
    //   db.connection.query(
    //     `SELECT * FROM users WHERE name=? AND pass=?`,
    //     [user, pass],
    //     (err, rows) => {
    //       if (err) {
    //         res.status(500).json({ error: "dbError" });
    //         throw err;
    //       }
         
    //       if (rows.length > 0) {
    //         res.json({ result: true, user: rows[0] });
    //       } else {
    //         res.status(404).json({ result: "unautorizhed" });
    //       }
    //     }
    //   );
    // } 
    
    else {
      res.status(403).json({'result':false,'message':"bad data"});
    }
};


  //----Crea el usuario en la base de datos con la contraseña encriptada
  exports.register = (req,res)=>{
     
    var username = req.body.user;
    var password = req.body.pass;
  
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
      .then(function(hashedPassword) {
         
        db.connection.query(`INSERT INTO users (name,pass) VALUES(?,?)`,[username,hashedPassword],
        (err,row)=>{
            if(err){
                return res.status(500).json({'result':false,'Message':'DB error'})
            }
            else{
                return res.json({'result':true,'row':row[0]})
                
            }
        })
      
    
        })
      .catch(function(error){
          console.log("Error saving user: ");
          console.log(error);
          next();
      });

  }