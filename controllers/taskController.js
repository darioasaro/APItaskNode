const db = require("../config/connection");
const moment = require("moment");
const table = "tarea";

//------exporta las tareas del usuario logeado en la pagina
exports.index = (req, res) => {
  let user = req.params.user;
    
  if(user){
    db.connection.query(
    `SELECT id FROM users WHERE name = ?`,
    [user],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: "dbError" });
        throw err;
      }
      if (row.length > 0) {
        //Sub consulta con el id resultado de la busqueda de usuario
        db.connection.query(
          `SELECT * FROM ${table} 
                        WHERE delete_at IS NULL && 
                        id_user=? `,
          [row[0].id],
          (err, rows) => {
            if (err) throw err;

            console.log("Data received from Db:" + rows);

            res.json({ tasks: rows });
          }
        );
      }
    }
  );
  }
  else{
    res.status(404).json({'result':false,'message':'data error'})
  }

  
};

exports.show = (req, res) => {
  db.connection.query(
    "SELECT * FROM tarea WHERE id=" + req.params.id,
    (err, rows) => {
      if (err) throw err;

      res.json({ task: rows });
    }
  );
};

exports.filter = (req, res) => {
  db.connection.query(
    "SELECT * FROM ",
    +table,
    "WHERE isDone=" + req.params.isDone,
    (err, rows) => {
      if (err) throw err;
      res.json({ tasks: rows });
    }
  );
};

exports.delete = (req, res) => {
  db.connection.query(
    `UPDATE ${table} SET delete_at='${moment().format("LLL")}'WHERE id=${
      req.params.id
    }`,
    (err, rows) => {
      if (err) throw err;

      res.json({ message: "El registro se elimino" });
    }
  );
};

exports.upgrade = (req, res) => {
  console.log("parametros", req.params);
  db.connection.query(
    `UPDATE ${table} SET isDone=${req.body.isDone},update_at='${moment().format(
      "LLL"
    )}'
    WHERE id = ${req.params.id}`,
    (err, rows) => {
      if (err) {
        res.status(500).json({
          error: "El registro no pudo ser modificado,intente nuevamente"
        });
        throw err;
      }
      res.json({ post: "Registro Modificado" });
    }
  );
};

exports.store = (req, res) => {
  const { titulo, descripcion, user } = req.body;
  //console.log(req.body);

  if (titulo && descripcion && user) {
    db.connection.query(
      `SELECT id FROM users WHERE name = ?`,
      [user],
      (err, row) => {
        if (err) {
          res.status(500).json({ error: "dbError" });
          throw err;
        }
        if (row.length > 0) {

          

            //-----------------

              db.connection.query(
      `INSERT INTO ${table}(titulo,descripcion,isDone,create_at,update_at,id_user) 
        VALUES('${titulo}',
        '${descripcion}',
        ${0},
        '${moment().format("LLL")}',
        '${moment().format("LLL")}',
        ${row[0].id})`,
      (err, rows) => {
        if (err) {
          res.status(500).json({
            error: "El registro no pudo ser agregado,intente nuevamente"
          });
          throw err;
        }
        res.json({ post: "Registro agregado" });
      }
    );

            //--------------

         
        }
      }
    );


} 
  else {
    res.status(404).json({ result: false, message: "Bad data" });
  }
};

exports.edit = (req, res) => {
  const { titulo, descripcion } = req.body;

  db.connection.query(
    `UPDATE ${table} SET titulo = '${titulo}' , descripcion = '${descripcion}',update_at='${moment().format(
      "LLL"
    )}' WHERE id ='${req.params.id}' `,
    (err, rows) => {
      if (err) {
        res.status(500).json({
          error: "El registro no pudo ser agregado,intente nuevamente"
        });
        throw err;
      }
      res.json({ post: "Registro agregado" });
    }
  );
};

