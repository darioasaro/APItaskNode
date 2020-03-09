
const userController =  require ('../controllers/userController')
const express = require( 'express' )
const router = express.Router()


router.post('/:user',userController.login)


module.exports = router