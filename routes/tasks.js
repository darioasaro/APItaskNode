
const taskController =  require ('../controllers/taskController')
const express = require( 'express' )


const router = express.Router()

router.get('/', taskController.index )
router.get('/:id', taskController.show)
router.post('/create',taskController.store)
//router.post('/:id', ( req, res) => res.json({ message: "tasks" }) )

module.exports = router