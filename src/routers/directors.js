const { Router } = require('express')
const multer = require('multer');
const mimetypes = require('mime-types')
const { getAll, getId, create, update, deleteActors, verifyToken, updatePhoto } = require('../controllers/directors.controllers')
const { gallery } = require('../controllers/gallery.controller')


const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './src/uploads/directors')
    },
    filename: (req, file, cd) => {
        const ext = mimetypes.extension(file.mimetype)
        cd(null, file.fieldname + '-' + Date.now() + '.' + ext)
    }
})

const router = Router()
const upload = multer({storage: storage})

router.get('/directors', verifyToken, getAll)
router.get('/directors/:id', verifyToken, getId)
router.post('/directors', verifyToken, create)
router.put('/directors/:id/profile', verifyToken, upload.single('profile_photo'), updatePhoto)
router.put('/directors/:id', verifyToken, update)
router.delete('/directors/:id', verifyToken, deleteActors)


module.exports = router;