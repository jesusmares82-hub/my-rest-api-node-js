const { Router } = require('express')
const { getAll, getId, create, update, deleteActors, verifyToken, verify } = require('../controllers/user.controllers')

const router = Router()

router.get('/users', verifyToken, getAll)
router.get('/users/:id', verifyToken, getId)
router.post('/users', create)
router.get("/verify/:hash", verify); 
router.put('/users/:id', verifyToken, update)
router.delete('/users/:id', verifyToken, deleteActors)


module.exports = router;