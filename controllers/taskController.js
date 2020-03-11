const db = require("../config/connection");
const moment = require("moment");
const table = "tarea";

//------exporta las tareas del usuario logeado en la pagina
exports.index = (req, res) => {
  let user = req.params.user;

  if (user) {
    db.connection.query(
      `SELECT t.id ,t.titulo,t.descripcion,t.isDone,t.id_user,u.name FROM tarea t 
    INNER JOIN users u ON t.id_user = u.id 
    WHERE u.name = ? 
    AND t.delete_at IS NULL`,
      [user],
      (err, rows) => {
        if (err) throw err;
        res.json({ 'tasks': rows });
      }
    );
  } else {
    res.status(404).json({ result: false, message: "data error" });
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
    // obtiene id de usuario
    db.connection.query(
      `SELECT id FROM users WHERE name = ?`,
      [user],
      (err, row) => {
        if (err) {
          res.status(500).json({ error: "dbError" });
          throw err;
        }
        if (row.length > 0) {
          let id_user = row[0].id;

          //-----------------

          db.connection.query(
            //con el id de usuario agrega la tarea en tabla tareas
            `INSERT INTO tarea (titulo,descripcion,isDone,create_at,update_at,id_user) 
        VALUES('${titulo}',
        '${descripcion}',
        ${0},
        '${moment().format("LLL")}',
        '${moment().format("LLL")}',
        ${id_user})`,
            (err, rows) => {
              if (err) {
                res.status(500).json({
                  error: "El registro no pudo ser agregado,intente nuevamente"
                });
                throw err;
              }

              let id_tarea = rows.insertId;
              db.connection.query(
                //con el id de usuario y el id de la tarea recien creada agrega los campos en tabla intermedia

                `INSERT INTO tarea_usuarios (pk_id_user,pk_id_tarea)
                VALUES(?,?)`,
                [id_user, id_tarea],
                (err, row) => {
                  if (err) {
                    res.status(500).json({
                      result: false,
                      error:
                        "El registro no pudo ser agregado,intente nuevamente"
                    });
                    throw err;
                  }

                  res.json({ result: true, post: "Registro agregado" });
                }
              );
            }
          );
        }
      }
    );
  } else {
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

exports.intermediate = (req,res)=>{
  var id_user = req.body.user
  var id_tarea = req.body.task
  console.log('request',req.body)
  db.connection.query(
    //con el id de usuario y el id de la tarea recien creada agrega los campos en tabla intermedia

    `INSERT INTO tarea_usuarios (pk_id_user,pk_id_tarea)
    VALUES(?,?)`,
    [id_user, id_tarea],
    (err, row) => {
      if (err) {
        res.status(500).json({
          result: false,
          error:
            "El registro no pudo ser agregado,intente nuevamente"
        });
        throw err;
      }

      res.json({ result: true, post: "Registro agregado" });
    }
  );
 
}

exports.intermediateShow = (req,res)=>{
  var id_params = req.params.id

  db.connection.query(`SELECT u.name FROM users u 
    INNER JOIN tarea_usuarios t ON t.pk_id_user = u.id 
    WHERE t.pk_id_tarea = ?`,[id_params],(err,rows)=>{
        if(err)throw err
        res.json(rows)
    } )
  
  
 
    
}
