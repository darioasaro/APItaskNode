const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dario',
  password :'1234',
  database : 'tasks'

});

connection.connect((err) => {
    if(err){
      console.log('Error connecting to Db'+ err);
      return;
    }
    console.log('Connection established');
  });

  
  exports.index = ( req, res) => {
      
      
     connection.query('SELECT * FROM tarea', (err,rows) => {
        if(err) throw err;
      
        console.log('Data received from Db:'+ rows);
           
        res.json({'tasks':rows})
      });

}

exports.show = (req,res)=>{
    console.log('id reques',req.param.id); 
    
    connection.query('SELECT * FROM tarea WHERE id='+req.params.id,(err,rows)=>{ 
        
        if(err) throw err;
        
        res.json({'task':rows})
    })

}

exports.store = (req,res)=>{
   res.json({'post':'posteo post'})
}

