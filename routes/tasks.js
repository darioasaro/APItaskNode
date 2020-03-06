
const taskController =  require ('../controllers/taskController')
const express = require( 'express' )


const router = express.Router()

router.get('/', taskController.index )
router.get('/:id', taskController.show)
router.get('/:isDone',taskController.filter)
router.post('/',taskController.store)
router.post('/:user',taskController.login)
router.delete('/:id',taskController.delete)
router.patch('/:id',taskController.upgrade)
router.put('/:id',taskController.edit)



module.exports = router