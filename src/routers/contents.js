const { Router } = require('express')
const { getAll, getId, create, update, deleteContents } = require('../controllers/contents.controllers');
const verifyToken = require('../middlewares/auth.middlewares');

const router = Router()

router.get('/contents', verifyToken, getAll);
router.get('/contents/:id', verifyToken, getId);
router.post('/contents', verifyToken, create);
router.put('/contents/:id', verifyToken, update);
router.delete('/contents/:id', verifyToken, deleteContents)



module.exports = router;