
const db = require('../config/connection')
const table = 'tareas'
  
  exports.index = ( req, res) => {
      
      
    db.connection.query('SELECT * FROM '+table, (err,rows) => {
        if(err) throw err;
      
        console.log('Data received from Db:'+ rows);
           
        res.json({'tasks':rows})
      });

}

exports.show = (req,res)=>{ 
    
    db.connection.query('SELECT * FROM tarea WHERE id='+req.params.id,(err,rows)=>{ 
        
        if(err) throw err;
        
        res.json({'task':rows})
    })

}

exports.filter = (req,res)=>{
  db.connection.query('SELECT * FROM ',+table,'WHERE isDone=' + req.params.isDone,(err,rows)=>{
    if(err) throw err;
    res.json({'tasks':rows})
  })
}

exports.delete =(req,res)=>{
  
  db.connection.query('DELETE FROM ',+table,'WHERE id='+req.params.id,(err,rows)=>{ 
        
        if(err) throw err;
        
        res.json({message:'El registro se elimino'})
    })

}

exports.upgrade = (req,res)=>{
    console.log('parametros',req.params)
    db.connection.query(`UPDATE ${table} SET isDone=${req.body.isDone} 
    WHERE id = ${req.params.id}`,
    (err,rows)=>{
      if(err){
        res.status(500).json({'error':'El registro no pudo ser modificado,intente nuevamente'})
        throw err 
      }
      res.json({'post':'Registro Modificado'})
      
})
}

exports.store = (req,res)=>{
  console.log('body',req.body.titulo);
  
  
  const {titulo,descripcion} = req.body;
  
  db.connection.query(
    `INSERT INTO ${table}(titulo,descripcion,isDone) 
    VALUES('${titulo}','${descripcion}',${0})`,
    (err,rows)=>{
      if(err){ 
        res.status(500).json({'error':'El registro no pudo ser agregado,intente nuevamente'})
        throw err
      }
      res.json({'post':'Registro agregado'})
    
    })
    
  
  
}

exports.edit = (req,res)=>{
  const {titulo,descripcion} = req.body; 

  db.connection.query(
    `UPDATE ${table} SET titulo = '${titulo}' , descripcion = '${descripcion}' WHERE id ='${req.params.id}' `,
    (err,rows)=>{
      if(err){ 
        res.status(500).json({'error':'El registro no pudo ser agregado,intente nuevamente'})
        throw err
      }
      res.json({'post':'Registro agregado'})
    
    })
}



