const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST ||'localhost',
  user     : process.env.DB_USER || 'dario',
  password :process.env.DB_PASSWORD || '1234',
  database : process.env.DB_NAME || 'tasks'

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

exports.delete =(req,res)=>{
  console.log('parametro',req.params.id)
  connection.query('DELETE FROM tarea WHERE id='+req.params.id,(err,rows)=>{ 
        
        if(err) throw err;
        
        res.json({message:'El registro se elimino'})
    })

}

exports.upgrade = (req,res)=>{
  
  res.json({message:'El registro se elimino'})
}

exports.store = (req,res)=>{
   res.json({'post':'posteo post'})
}



