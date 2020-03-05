
const taskController =  require ('../controllers/taskController')
const express = require( 'express' )


const router = express.Router()

router.get('/', taskController.index )
router.get('/:id', taskController.show)
router.get('/:isDone',taskController.filter)
router.post('/',taskController.store)
router.delete('/:id',taskController.delete)
router.patch('/:id',taskController.upgrade)


module.exports = router