const db = require('../config/connection')
const table = 'tarea'
//const page = require('../public/index.html')

exports.index=(req,res)=>{

    let pagina='<!doctype html><html><head></head><body>express</body></html>';
    res.send(pagina);	
}