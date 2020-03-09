
const userController =  require ('../controllers/userController')
const express = require( 'express' )
const router = express.Router()


router.post('/',(req,res)=>{
    res.status(404).json({'result':false,'message':'recurso invalido'})
})
router.post('/:user',userController.login)
router.post('/register/:user',userController.register)


module.exports = router