
const userController =  require ('../controllers/userController')
const express = require( 'express' )
const router = express.Router()


router.post('/:user',userController.login)
router.post('/register/:user',userController.register)


module.exports = router