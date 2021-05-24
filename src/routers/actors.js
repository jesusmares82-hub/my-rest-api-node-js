const { Router } = require('express')
const multer = require('multer');
const mimetypes = require('mime-types')
const { gallery } = require('../controllers/gallery.controller')
const { getAll, getId, createf, update, deleteActors, verifyToken, updatePhoto } = require('../controllers/actors.controllers')

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './src/uploads/actors')
    },
    filename: (req, file, cd) => {
        const ext = mimetypes.extension(file.mimetype)
        cd(null, file.fieldname + '-' + Date.now() + '.' + ext)
    }
})

const router = Router()
const upload = multer({storage: storage})

router.get('/actors', verifyToken, getAll)
router.get('/actors/:id', verifyToken, getId)
router.post('/actors', verifyToken, createf)
router.put('/actors/:id/profile', verifyToken, upload.single('profile_photo'), updatePhoto)
router.put('/actors/:id',  verifyToken, update)
router.delete('/actors/:id', verifyToken, deleteActors)



module.exports = router;